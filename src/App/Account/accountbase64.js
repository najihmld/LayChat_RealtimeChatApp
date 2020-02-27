import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Statusbar from '../../Public/Components/GeneralStatusBar';
import ImagePicker from 'react-native-image-picker';
import PhotoUpload from 'react-native-photo-upload';
import { app, db } from '../../Config/firebase';

class App extends Component {
  state = {
    userId: app.auth().currentUser.uid,
    avatarUrl: ''
  };

  handleChangeAvatar = avatarUrl => {
    console.log(avatarUrl);
    const ref = app.storage().ref();
    const name = 'najihdhsdhsds.jpeg';
    const task = ref.child(name).putString(avatarUrl, 'base64');
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        console.log(url);
      })
      .catch(console.error);
  };

  handleLogout = () => {
    app
      .auth()
      .signOut()
      .then(function() {
        ToastAndroid.show('Logout success', ToastAndroid.SHORT);
      })
      .catch(function(error) {
        ToastAndroid.show('Logout failed', ToastAndroid.SHORT);
      });
  };
  render() {
    console.log(this.state.userId);
    return (
      <View style={styles.container}>
        <Statusbar />

        <View style={styles.bgheader}>
          <View style={styles.header}>
            <View style={styles.img}>
              <PhotoUpload
                onPhotoSelect={avatarUrl => {
                  if (avatarUrl) {
                    this.handleChangeAvatar(avatarUrl);
                  }
                }}>
                <Image
                  style={styles.setting__img}
                  resizeMode="cover"
                  source={{
                    uri:
                      'https://upload.wikimedia.org/wikipedia/id/d/d5/Aang_.jpg'
                  }}
                />
              </PhotoUpload>
            </View>
          </View>
          <TouchableOpacity style={styles.set__circle}>
            <Image
              source={require('../../Public/Assets/icons/camera.png')}
              style={styles.set__circle2}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.list__setting}>
          <Text style={styles.h2}>Account</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.subtitle__list}>
            <Text style={styles.subtitle__list__text}>Name</Text>
          </View>
          <TouchableOpacity onPress={() => this.handleToChange()}>
            <ListItem title="Najih Mld" style={styles.list__item} />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <View style={styles.items}>
          <View style={styles.subtitle__list}>
            <Text style={styles.subtitle__list__text}>Email</Text>
          </View>
          <TouchableOpacity onPress={() => this.handleToChange()}>
            <ListItem
              title="najihmaulida@gmail.com"
              style={styles.list__item}
            />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <View style={styles.items}>
          <View style={styles.subtitle__list}>
            <Text style={styles.subtitle__list__text}>Bio</Text>
          </View>
          <TouchableOpacity onPress={() => this.handleToChange()}>
            <ListItem title="Fokussssssssss" style={styles.list__item} />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <View style={styles.items}>
          <TouchableOpacity onPress={this.handleLogout}>
            <ListItem style={styles.logout} title="Logout" />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/logout.png')}
            style={styles.set__item}
          />
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgheader: {
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#45c8dc',
    minHeight: 95,
    maxHeight: 95,
    paddingTop: 8,
    alignContent: 'center'
    // borderBottomRightRadius: 90
  },
  list__setting: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    zIndex: -100
  },
  h2: {
    paddingTop: 20,
    fontSize: 16,
    color: '#45c8dc',
    fontFamily: 'Raleway-Medium'
  },
  list: {
    backgroundColor: 'orange',
    paddingLeft: 20
  },
  list__title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  img: {
    backgroundColor: '#fff',
    bottom: -70,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 150 / 2,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 500
  },
  setting__img: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2
  },
  name__header: {
    color: '#fff',
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    padding: 20,
    paddingLeft: 20
  },
  set__circle: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'absolute',
    right: 100,
    bottom: -75,
    elevation: 8,
    marginRight: 20,
    zIndex: 100
  },
  set__circle2: {
    height: 28,
    width: 28,
    alignSelf: 'center'
  },
  items: {
    marginBottom: 1
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

  logout: {
    marginTop: 10
  }
});
