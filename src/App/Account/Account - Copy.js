import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Statusbar from '../../Public/Components/GeneralStatusBar';
import { app } from '../../Config/firebase';

class App extends Component {
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
    return (
      <View style={styles.container}>
        <Statusbar />

        <View style={styles.header}>
          <View style={styles.img}>
            <Image
              style={styles.setting__img}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/id/d/d5/Aang_.jpg'
              }}
            />
          </View>
          <View>
            <Text style={styles.name__header}>Najih Mld</Text>
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
          <TouchableOpacity onPress={() => this.handleToChange()}>
            <ListItem title="Najih Mld" />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <View style={styles.items}>
          <TouchableOpacity onPress={() => this.handleToChange()}>
            <ListItem title="najihmaulida@gmail.com" />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <View style={styles.items}>
          <TouchableOpacity onPress={() => this.handleToChange()}>
            <ListItem title="Fokussssssssss" />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <TouchableOpacity onPress={this.handleLogout}>
          <ListItem style={styles.logout} title="Logout" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#45c8dc',
    minHeight: 95,
    maxHeight: 95,
    paddingLeft: 20,
    paddingTop: 8,
    flexDirection: 'row'
  },
  list__setting: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
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
  setting__img: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2
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
    right: 0,
    bottom: -20,
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

  logout: {
    marginTop: 10
  }
});
