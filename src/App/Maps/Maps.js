import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Dialog from 'react-native-dialog';
import { ListItem } from 'react-native-elements';

class Maps extends Component {
  state = {
    dialogProfile: false,
    name: '',
    data: []
  };
  handleProfile = () => {
    this.setState({ dialogProfile: false });
  };

  showDialogProfile = () => {
    this.setState({ dialogProfile: true });
  };

  handleMove = () => {
    const data = this.props.navigation.state.params.myData;
    // eslint-disable-next-line react/no-string-refs
    this.refs.map.animateToRegion(
      {
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      3000
    );
  };

  render() {
    const loc = this.props.navigation.state.params.mapData;
    // const myLoc = this.props.navigation.state.params;
    const myData = this.props.navigation.state.params.myData;

    return (
      <View style={styles.container}>
        <MapView
          // eslint-disable-next-line react/no-string-refs
          ref="map"
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}>
          <MapView.Marker
            onPress={() => this.showDialogProfile()}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude
            }}>
            <TouchableOpacity>
              <Image
                resizeMode="cover"
                source={{
                  uri: `data:image/jpeg;base64,${loc.avatar}`
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
            <ListItem title={loc.name} style={styles.list__item} />
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Email</Text>
            </View>
            <ListItem title={loc.email} style={styles.list__item} />
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Bio</Text>
            </View>
            <ListItem title={loc.bio} style={styles.list__item} />
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
