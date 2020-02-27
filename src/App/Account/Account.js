import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import Statusbar from '../../Public/Components/GeneralStatusBar';
import PhotoUpload from 'react-native-photo-upload';
import { app, db } from '../../Config/firebase';

class App extends Component {
  state = {
    userId: app.auth().currentUser.uid,
    data: [],
    name: '',
    bio: '',
    dialogName: false,
    dialogBio: false,
    dialogLogout: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    try {
      db.ref(`/users/${this.state.userId}`).on('value', res => {
        let data = res.val();
        this.setState({ data: data });
      });
    } catch (error) {
      // console.log(error);
    }
  };

  handleChangeAvatar = avatar => {
    const userId = this.state.userId;
    try {
      db.ref(`/users/${userId}`).update({ avatar });
      ToastAndroid.show(
        'Updated profile photo successfully',
        ToastAndroid.SHORT
      );
    } catch (error) {
      ToastAndroid.show('Failed to update profile photo', ToastAndroid.SHORT);
    }
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };
  showDialogName = () => {
    this.setState({ dialogName: true });
  };
  showDialogBio = () => {
    this.setState({ dialogBio: true });
  };
  showDialogLogout = () => {
    this.setState({ dialogLogout: true });
  };
  handleCancel = () => {
    this.setState({ dialogName: false, dialogBio: false, dialogLogout: false });
  };
  handleChangeName = () => {
    const name = this.state.name;
    const userId = this.state.userId;
    try {
      db.ref(`/users/${userId}`).update({ name });
      this.setState({ dialogName: false });
      ToastAndroid.show('Changed name successfully', ToastAndroid.SHORT);
    } catch (error) {
      this.setState({ dialogName: false });
      ToastAndroid.show('Failed to change name', ToastAndroid.SHORT);
    }
  };
  handleChangeBio = () => {
    const bio = this.state.bio;
    const userId = this.state.userId;
    try {
      db.ref(`/users/${userId}`).update({ bio });
      this.setState({ dialogBio: false });
      ToastAndroid.show('Changed bio successfully', ToastAndroid.SHORT);
    } catch (error) {
      this.setState({ dialogBio: false });
      ToastAndroid.show('Failed to change bio', ToastAndroid.SHORT);
    }
  };

  handleLogout = () => {
    app
      .auth()
      .signOut()
      .then(function() {
        ToastAndroid.show('Log out success', ToastAndroid.SHORT);
      })
      .catch(function(error) {
        ToastAndroid.show('Log out failed', ToastAndroid.SHORT);
      });
  };
  render() {
    const userData = this.state.data;

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
                    uri: `data:image/jpeg;base64,${userData.avatar}`
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
          <TouchableOpacity onPress={() => this.showDialogName()}>
            <ListItem title={userData.name} style={styles.list__item} />
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
          <TouchableOpacity onPress={() => this.showDialogBio()}>
            <ListItem title={userData.bio} style={styles.list__item} />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/edit.png')}
            style={styles.set__item}
          />
        </View>
        <View style={styles.items}>
          <TouchableOpacity onPress={() => this.showDialogLogout()}>
            <ListItem style={styles.logout} title="Log out" />
          </TouchableOpacity>
          <Image
            source={require('../../Public/Assets/icons/logout.png')}
            style={styles.set__item}
          />
        </View>
        <Dialog.Container visible={this.state.dialogName}>
          <View style={styles.input}>
            <TextInput
              onChangeText={text => this.handleInput(text, 'name')}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Enter your name..."
              placeholderTextColor="#9a9a9a"
            />
          </View>

          <Dialog.Button
            color="#45c8dc"
            label="Cancel"
            onPress={this.handleCancel}
          />
          <Dialog.Button
            color="#45c8dc"
            label="Ok"
            onPress={this.handleChangeName}
          />
        </Dialog.Container>
        <Dialog.Container visible={this.state.dialogBio}>
          <View style={styles.input}>
            <TextInput
              onChangeText={text => this.handleInput(text, 'bio')}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Enter your bio..."
              placeholderTextColor="#9a9a9a"
            />
          </View>

          <Dialog.Button
            color="#45c8dc"
            label="Cancel"
            onPress={this.handleCancel}
          />
          <Dialog.Button
            color="#45c8dc"
            label="Ok"
            onPress={this.handleChangeBio}
          />
        </Dialog.Container>
        <Dialog.Container visible={this.state.dialogLogout}>
          <Dialog.Title>Log out</Dialog.Title>
          <Dialog.Description>Are you sure want to log out?</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Ok" onPress={this.handleLogout} />
        </Dialog.Container>
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
  input: {
    marginLeft: 10,
    marginRight: 10,
    color: '#F2E8D5',
    borderBottomWidth: 1,
    borderColor: '#eaeaea'
  },

  logout: {
    marginTop: 10
  }
});
