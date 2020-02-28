import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ToastAndroid
} from 'react-native';
import Statusbar from '../../Public/Components/GeneralStatusBar';
import Geolocation from 'react-native-geolocation-service';
import { app, db } from '../../Config/firebase';

class App extends Component {
  watchId = null;
  state = {
    userId: app.auth().currentUser.uid,
    data: []
  };
  componentDidMount() {
    this.getData();
    this.getLocationUpdates();
  }

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
    const userId = this.state.userId;
    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        position => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          db.ref(`/users/${userId}`).update({ latitude });
          db.ref(`/users/${userId}`).update({ longitude });
        },
        error => {
          let latitude = -2.2754241;
          let longitude = 99.4230675;
          db.ref(`/users/${userId}`).update({ latitude });
          db.ref(`/users/${userId}`).update({ longitude });
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

  getData = () => {
    const userId = this.state.userId;
    try {
      db.ref(`/chatroom/${userId}`).on('value', res => {
        let data = res.val();
        if (data != null) {
          const objectToArray = Object.values(data);
          this.setState({ data: objectToArray });
        } else {
        }
      });
    } catch (error) {}
  };
  onChat = item => {
    this.props.navigation.navigate('Chat', { listChat: item });
  };
  addMessage = () => {
    this.props.navigation.navigate('Contacts');
  };
  render() {
    let userId = app.auth().currentUser.uid;
    let contactData = [];
    this.state.data.map((item, index) => {
      if (item.uid !== userId) {
        contactData.push(item);
      }
    });

    return (
      <View style={styles.wrapper}>
        <Statusbar />
        <FlatList
          data={contactData}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => this.onChat(item)}>
                <View style={styles.chat__list}>
                  <View style={styles.chat__img}>
                    <Image
                      style={styles.chat__img2}
                      resizeMode="cover"
                      source={{
                        uri: `data:image/jpeg;base64,${item.avatar}`
                      }}
                    />
                  </View>
                  <View style={styles.chat__con}>
                    <View style={styles.col}>
                      <Text style={styles.name__list}>{item.name}</Text>
                    </View>
                    <View style={styles.col}>
                      <Text style={styles.message__list}>{item.content}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity
          style={styles.set__circle}
          onPress={() => this.addMessage()}>
          <Image
            source={require('../../Public/Assets/icons/add.png')}
            style={styles.set__circle2}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  set__circle: {
    height: 50,
    width: 50,
    padding: 5,
    borderRadius: 50 / 2,
    backgroundColor: '#45c8dc',
    justifyContent: 'center',
    elevation: 8,
    marginRight: 20,
    zIndex: 100,
    position: 'absolute',
    right: 0,
    bottom: 20
  },
  set__circle2: {
    height: 28,
    width: 28,
    alignSelf: 'center'
  },
  chat__list: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fff',
    padding: 8,
    paddingLeft: 15,
    flexDirection: 'row',
    elevation: 0.2
  },
  chat__img: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#45c8dc'
  },
  chat__img2: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    borderWidth: 1.6,
    borderColor: '#fff'
  },
  chat__con: {
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },
  name__list: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    marginBottom: 2,
    color: '#1e3347'
  },
  message__list: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'gray'
  }
});
