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
import { app, db } from '../../Config/firebase';
import Contacts from 'react-native-contacts';
import Geolocation from 'react-native-geolocation-service';

class App extends Component {
  state = {
    userId: app.auth().currentUser.uid,
    data: [],
    contacts: [],
    listContacts: []
  };

  componentDidMount() {
    this.getData();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.'
      }).then(() => {
        this.loadContacts();
      });
    } else {
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

  loadContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // console.warn('Permission to access contacts was denied');
      } else {
        this.setState({ contacts });

        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            // console.warn('Permission to access contacts was denied');
          } else {
            this.setState({ contacts });
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
            this.setState({ listContacts: contactData });
          }
        });
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
      this.loadContacts();
    });
  }

  onMaps = item => {
    this.props.navigation.navigate('Maps', {
      friendId: item.uid
    });
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <Statusbar />
        <FlatList
          data={this.state.listContacts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.wrapp}>
                <TouchableOpacity
                  style={styles.listcontact}
                  onPress={() => this.addChat(item)}>
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
                <TouchableOpacity onPress={() => this.onMaps(item)}>
                  <View style={styles.chat__list2}>
                    <Image
                      source={require('../../Public/Assets/icons/location.png')}
                      style={styles.icon__loc}
                    />
                  </View>
                </TouchableOpacity>
              </View>
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
    flexDirection: 'row',
    paddingBottom: 32,
    marginTop: 10,
    flex: 0.5
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
    flex: 1
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
    marginRight: 15
  }
  // location: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center'
  // }
});
