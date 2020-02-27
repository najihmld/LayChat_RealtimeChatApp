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
    let contactEmail = [];
    this.state.contacts.map((item, index) => {
      let emailList = item.emailAddresses;
      if (emailList.length > 0) {
        item.emailAddresses.map((item2, index2) => {
          let data = Object.values(item2)[2];
          contactEmail.push(data);
        });
      }
    });

    let userId = app.auth().currentUser.uid;
    let contactData = [];
    this.state.data.map((item, index) => {
      contactEmail.map((item2, index2) => {
        if (item.uid !== userId && item.email === item2) {
          contactData.push(item);
        }
      });
    });

    return (
      <View style={styles.wrapper}>
        <Statusbar />
        <FlatList
          data={contactData}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => this.addChat(item)}>
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
                    <Text style={styles.name__list}>{item.name}</Text>
                    <Text style={styles.bio__list}>{item.email}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity
          style={styles.set__circle}
          onPress={() => this.addContact()}>
          <Image
            source={require('../../Public/Assets/icons/addContact.png')}
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
  chat__list: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fff',
    padding: 12,
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
  }
});
