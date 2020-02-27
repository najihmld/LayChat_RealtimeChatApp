import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Statusbar from '../../Public/Components/GeneralStatusBar';
import { app, db } from '../../Config/firebase';
import Contacts from 'react-native-contacts';

class App extends Component {
  state = {
    userId: app.auth().currentUser.uid,
    data: [],
    contacts: []
  };

  componentDidMount() {
    this.getData();
  }

  async componentWillMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.'
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  getData = () => {
    try {
      db.ref('/users').on('value', res => {
        let data = res.val();
        const objectToArray = Object.values(data);
        // console.log(objectToArray);
        this.setState({ data: objectToArray });
      });
    } catch (error) {
      // console.log(error);
    }
  };

  addChat = item => {
    this.props.navigation.navigate('Chat', { listChat: item });
  };
  onProfile = item => {
    this.props.navigation.navigate('Profil', { tes: 'lolll' });
  };

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // console.warn('Permission to access contacts was denied');
      } else {
        this.setState({ contacts });
      }
    });
  }

  addContact() {
    var newPerson = {
      emailAddresses: [
        {
          label: '',
          email: ''
        }
      ],
      displayName: ''
    };

    Contacts.openContactForm(newPerson, (err, contact) => {
      if (err) {
        throw err;
      }
      // contact has been saved
    });
  }
  render() {
    console.log(this.props.navigation.state.params);
    return (
      <View>
        <Text>Helo</Text>
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
  wrapp: {
    flexDirection: 'row'
  },
  chat__list: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    padding: 12,
    paddingLeft: 15,
    flexDirection: 'row'
  },
  chat__list2: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    // backgroundColor: '#fff',
    paddingTop: 12,
    paddingLeft: 50,
    flexDirection: 'row',
    paddingBottom: 32,
    marginTop: 10
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
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 15
  },
  name__list: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    marginBottom: 2,
    color: '#1e3347'
  },
  listcontact: {
    width: 280
  },
  bio__list: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    marginBottom: 2,
    color: '#61707e'
  },
  message__list: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'gray'
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
  icon__loc: {
    height: 30,
    width: 30,
    marginLeft: -20
  }
  // location: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center'
  // }
});
