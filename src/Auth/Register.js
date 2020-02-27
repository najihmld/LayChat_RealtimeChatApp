import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { defaultAvatar } from './avatar';

import { app, db } from '../Config/firebase';

class Login extends Component {
  state = {
    uid: '',
    name: '',
    email: '',
    password: '',
    avatar: defaultAvatar,
    bio: "Hello i'm using Lay Chat"
  };

  handleInput = (text, type) => {
    this.setState({ [type]: text });
  };

  handleSignup = () => {
    const { name, email, password, avatar, bio } = this.state;
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(credentialUser => {
        db.ref('/users')
          .child(credentialUser.user.uid)
          .set({
            uid: credentialUser.user.uid,
            name,
            email,
            avatar,
            bio
          });
        ToastAndroid.show('Signup success', ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
      })
      .catch(function(error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };
  login = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.wrapper}>
        <StatusBar backgroundColor="#fff" barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.row}>
            <Image
              source={require('../Public/Assets/logo.png')}
              style={styles.logo}
            />

            <View style={styles.input__auth}>
              <TextInput
                onChangeText={text => this.handleInput(text, 'name')}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={'Name'}
                placeholderTextColor="#1e3347"
              />
            </View>

            <View style={styles.input__auth}>
              <TextInput
                onChangeText={text => this.handleInput(text, 'email')}
                value={email}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#1e3347"
              />
            </View>

            <View style={styles.input__auth}>
              <TextInput
                onChangeText={text => this.handleInput(text, 'password')}
                value={password}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#1e3347"
              />
            </View>

            <TouchableOpacity onPress={this.handleSignup}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => this.login()}>
                <Text style={styles.signupButton}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    zIndex: 100,
    justifyContent: 'center'
  },
  row: {
    flex: 0.8
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 15,
    alignSelf: 'center'
  },
  bg_auth: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    position: 'absolute',
    bottom: -50
  },
  input__auth: {
    backgroundColor: '#eaecf0',
    borderRadius: 30,
    height: 50,
    margin: 8,
    color: '#F2E8D5',
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65
  },
  button: {
    backgroundColor: '#45c8dc',
    color: '#1e3347',
    height: 50,
    margin: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    textTransform: 'uppercase',
    color: '#fff'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: -15,
    flexDirection: 'row'
  },
  signupText: {
    fontSize: 14,
    color: '#45c8dc',
    marginRight: 5,
    fontFamily: 'Roboto-Regular'
  },
  signupButton: {
    fontSize: 14,
    color: '#45c8dc',
    fontWeight: '500',
    fontFamily: 'Roboto-Bold'
  }
});
