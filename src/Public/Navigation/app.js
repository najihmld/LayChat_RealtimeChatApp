import React, { Component } from 'react';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { ListItem } from 'react-native-elements';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Dialog from 'react-native-dialog';

import Home from '../../App/Home/Home';
import Profil from '../../App/Home/Profil';
import Chat from '../../App/Home/Chat';
import Account from '../../App/Account';
import Contactss from '../../App/Contact/Contact';
import Mapss from '../../App/Maps/Maps';

class Toggle extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
        <Image
          source={require('../Assets/icons/menu.png')}
          style={styles.toggle}
        />
      </TouchableOpacity>
    );
  }
}

class BackHome extends Component {
  onBack = () => {
    this.props.navigationProps.navigate('Home');
  };
  render() {
    return (
      <TouchableOpacity onPress={this.onBack.bind(this)}>
        <Image
          source={require('../Assets/icons/back.png')}
          style={styles.toggle}
        />
      </TouchableOpacity>
    );
  }
}

class ChatHeader extends Component {
  state = {
    dialogProfile: false
  };
  onBack = () => {
    this.props.navigationProps.navigate('Home');
  };
  onProfil = data => {};

  handleProfile = () => {
    this.setState({ dialogProfile: false });
  };

  showDialogProfile = () => {
    this.setState({ dialogProfile: true });
  };
  render() {
    const data = this.props.navigationProps.state.params.listChat;

    return (
      <View style={styles.headerChat}>
        <TouchableOpacity onPress={this.onBack.bind(this)}>
          <Image
            source={require('../Assets/icons/back.png')}
            style={styles.toggle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dialogprofile}
          onPress={() => this.showDialogProfile()}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${data.avatar}`
            }}
            style={styles.img__header__chat}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dialogprofile}
          onPress={() => this.showDialogProfile()}>
          <Text style={styles.name__header__chat}>{data.name}</Text>
          <Text style={styles.bio__header__chat}>{data.bio}</Text>
        </TouchableOpacity>
        <Dialog.Container
          headerStyle={styles.dialogMargin}
          visible={this.state.dialogProfile}>
          <Image
            resizeMode="cover"
            style={styles.dialogProfile2}
            source={{
              uri: `data:image/jpeg;base64,${data.avatar}`
            }}
          />

          <View style={styles.list__setting}>
            <Text style={styles.h2}>Info Account</Text>
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Name</Text>
            </View>
            <ListItem title={data.name} style={styles.list__item} />
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Email</Text>
            </View>
            <ListItem title={data.email} style={styles.list__item} />
          </View>
          <View style={styles.items}>
            <View style={styles.subtitle__list}>
              <Text style={styles.subtitle__list__text}>Bio</Text>
            </View>
            <ListItem title={data.bio} style={styles.list__item} />
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

const DrawerContent = props => (
  <View>
    <View style={styles.header}>
      <View style={styles.img}>
        <Image
          style={styles.setting__img}
          resizeMode="cover"
          source={require('../../Public/Assets/icons/laychat.png')}
        />
      </View>
      <View>
        <Text style={styles.name__header}>Lay Chat</Text>
      </View>
    </View>
    <DrawerItems {...props} />
  </View>
);

const HomeScreen = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: false,
      headerLeft: <Toggle navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#45c8dc'
      },
      headerTintColor: '#fff'
    })
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: false,
      headerLeft: <ChatHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#45c8dc'
      },
      headerTintColor: '#fff'
    })
  }
});

const ContactScreen = createStackNavigator({
  Contacts: {
    screen: Contactss,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <BackHome navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#45c8dc'
      },
      headerTintColor: '#fff'
    })
  },
  Maps: {
    screen: Mapss,
    navigationOptions: ({ navigation }) => ({
      title: false,
      headerLeft: <BackHome navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#45c8dc'
      },
      headerTintColor: '#fff'
    })
  }
});

const SettingScreen = createStackNavigator({
  Setting: {
    screen: Account,
    navigationOptions: ({ navigation }) => ({
      title: false,
      headerLeft: <BackHome navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#45c8dc',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      },
      headerTintColor: '#fff'
    })
  }
});

const ProfilScreen = createStackNavigator({
  Profile: {
    screen: Profil,
    navigationOptions: ({ navigation }) => ({
      title: false,
      headerLeft: <BackHome navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#45c8dc',
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0 // remove shadow on iOS
      },
      headerTintColor: '#fff'
    })
  }
});

// const MapsScreen = createStackNavigator({
//   Maps: {
//     screen: Maps,
//     navigationOptions: ({ navigation }) => ({
//       title: false,
//       headerLeft: <BackHome navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#45c8dc',
//         elevation: 0, // remove shadow on Android
//         shadowOpacity: 0 // remove shadow on iOS
//       },
//       headerTintColor: '#fff'
//     })
//   }
// });

export default createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Contacts: {
      screen: ContactScreen,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
        drawerIcon: () => (
          <Image
            source={require('../Assets/icons/contact.png')}
            resizeMode="contain"
            style={styles.iconContact}
          />
        )
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
        drawerIcon: () => (
          <Image
            source={require('../Assets/icons/setting.png')}
            resizeMode="contain"
            style={styles.iconSet}
          />
        )
      }
    },
    Profil: {
      screen: ProfilScreen,
      navigationOptions: {
        drawerLabel: () => null,
        drawerLockMode: 'locked-closed'
      }
    }
  },
  {
    contentComponent: DrawerContent
  }
);

const styles = StyleSheet.create({
  toggle: {
    width: 30,
    height: 30,
    marginLeft: 15
  },
  header: {
    backgroundColor: '#45c8dc',
    minHeight: 150,
    maxHeight: 150,
    paddingLeft: 20,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  setting__img: {
    height: 80,
    width: 80
  },
  name__header: {
    color: '#fff',
    fontFamily: 'Raleway-Bold',
    fontSize: 22,
    padding: 15
  },
  headerChat: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    width: 360,
    alignItems: 'center'
  },
  img__header__chat: {
    marginLeft: 10,
    height: 42,
    width: 42,
    borderRadius: 42 / 2
  },
  name__header__chat: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway-Medium'
  },
  bio__header__chat: {
    marginLeft: 10,
    fontSize: 12,
    color: '#fafafa',
    fontFamily: 'Raleway-Medium'
  },
  list__setting: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: 'row'
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
  }
});
