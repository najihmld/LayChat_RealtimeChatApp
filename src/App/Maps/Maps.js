import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Dimensions
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Dialog from 'react-native-dialog';
import { ListItem } from 'react-native-elements';
import { app, db } from '../../Config/firebase';
import Geolocation from 'react-native-geolocation-service';

class Maps extends Component {
  state = {
    dialogProfile: false,
    myId: app.auth().currentUser.uid,
    friendId: this.props.navigation.state.params.friendId,
    myData: '',
    friendData: ''
  };

  componentDidMount() {
    this.getmyData();
    this.getfriendData();
    this.getLocationUpdates();
  }

  getmyData = () => {
    try {
      db.ref(`/users/${this.state.myId}`).on('value', res => {
        let data = res.val();
        this.setState({ myData: data });
      });
    } catch (error) {
      // console.log(error);
    }
  };
  getfriendData = () => {
    try {
      db.ref(`/users/${this.state.friendId}`).on('value', res => {
        let data = res.val();
        this.setState({ friendData: data });
      });
    } catch (error) {
      // console.log(error);
    }
  };

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG
      );
    }

    return false;
  };

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) {
      return;
    }
    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        position => {
          this.setState({
            myLatitude: position.coords.latitude,
            myLongitude: position.coords.longitude
          });
        },
        error => {
          this.setState({ myLatitude: error, myLongitude: error });
          // console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000
        }
      );
    });
  };
  handleProfile = () => {
    this.setState({ dialogProfile: false });
  };

  showDialogProfile = () => {
    this.setState({ dialogProfile: true });
  };

  handleMove = () => {
    // eslint-disable-next-line react/no-string-refs
    const myData = this.state.myData;
    this.refs.map.animateToRegion(
      {
        latitude: myData.latitude,
        longitude: myData.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      3000
    );
  };

  render() {
    const myData = this.state.myData;
    const friendData = this.state.friendData;
    return (
      <View style={styles.container}>
        <MapView
          // eslint-disable-next-line react/no-string-refs
          ref="map"
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          clustering={true}
          style={styles.map}
          initialRegion={{
            latitude: friendData.latitude,
            longitude: myData.longitude,
            latitudeDelta:
              friendData.longitude -
              myData.latitude * 2 -
              friendData.longitude -
              myData.latitude * 2,
            longitudeDelta:
              friendData.longitude -
              myData.latitude * 2 +
              friendData.longitude -
              myData.latitude * 2
          }}>
          <MapView.Marker
            onPress={() => this.showDialogProfile()}
            coordinate={{
              latitude: friendData.latitude,
              longitude: friendData.longitude
            }}>
            <TouchableOpacity>
              <Image
                resizeMode="cover"
                source={{
                  uri: `data:image/jpeg;base64,${friendData.avatar}`
                }}
                style={styles.pin__avatar}
              />
              <View style={styles.pin__avatar2} />
            </TouchableOpacity>
          </MapView.Marker>
          <MapView.Marker
            coordinate={{
              latitude: myData.latitude,
              longitude: myData.longitude
            }}>
            <TouchableOpacity>
              <Image
                resizeMode="cover"
                source={{
                  uri: `data:image/jpeg;base64,${myData.avatar}`
                }}
                style={styles.pin__avatar}
              />
              <View style={styles.pin__avatar2} />
            </TouchableOpacity>
          </MapView.Marker>
        </MapView>

        <TouchableOpacity onPress={this.handleMove} style={styles.icon__loc}>
          <Image source={require('../../Public/Assets/icons/myloc.png')} />
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogProfile}>
          <View style={styles.list__setting}>
            <Text style={styles.h2}>Info Account</Text>
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Name</Text>
            </View>
            <ListItem title={friendData.name} style={styles.list__item} />
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Email</Text>
            </View>
            <ListItem title={friendData.email} style={styles.list__item} />
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Bio</Text>
            </View>
            <ListItem title={friendData.bio} style={styles.list__item} />
          </View>

          <Dialog.Button
            color={'#45c8dc'}
            label="Hide"
            onPress={() => {
              this.handleProfile();
            }}
          />
        </Dialog.Container>
      </View>
    );
  }
}

export default Maps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  pin__avatar: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 4,
    borderColor: '#45c8dc',
    padding: 4
  },
  pin__avatar2: {
    height: 30,
    width: 4,
    backgroundColor: '#45c8dc',
    alignSelf: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  dialogProfile: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dialogProfile2: {
    height: 200,
    width: 300,
    position: 'absolute',
    top: 0,
    alignSelf: 'center'
  },
  h2: {
    fontSize: 16,
    color: '#45c8dc',
    fontFamily: 'Raleway-Medium'
  },
  set__item: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 18,
    right: 20
  },
  subtitle__list: {
    backgroundColor: 'transparent',
    paddingLeft: 15,
    bottom: 40,
    zIndex: 500,
    position: 'absolute'
  },
  subtitle__list__text: {
    color: '#a9a9a9',
    fontSize: 14
  },
  list__item: {
    paddingTop: 10,
    backgroundColor: '#fff'
  },

  dialogMargin: {
    marginTop: 200
  },
  iconContact: {
    width: 25,
    height: 25,
    marginLeft: 15
  },
  iconSet: {
    width: 25,
    height: 25,
    marginLeft: 15
  },
  icon__loc: {
    right: 30,
    bottom: 30,
    position: 'absolute'
  }
});
