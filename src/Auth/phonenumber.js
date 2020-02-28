// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid
// } from 'react-native';

// import PhoneInput from 'react-native-phone-input';
// import { db } from '../Config/firebase';
// import firebase from 'firebase';

// class Login extends Component {
//   state = {
//     user: null,
//     message: '',
//     codeInput: '',
//     phoneNumber: '+62',
//     confirmResult: null
//   };

//   signIn = () => {
//     const { phoneNumber } = this.state;
//     // this.setState({ message: 'Sending code ...' });

//     // firebase.auth().settings.appVerificationDisabledForTesting = true;
//     // firebase.auth.RecaptchaVerifier('sign-in-button', {
//     //   size: 'invisible',
//     //   callback: function(response) {
//     //     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     //     this.signIn();
//     //   }
//     // });
//     // let appVerifier =
//     firebase
//       .auth()
//       .signInWithPhoneNumber(phoneNumber, appVerifier)
//       .then(confirmResult =>
//         this.setState({ confirmResult, message: 'Code has been sent!' })
//       )
//       .catch(error =>
//         this.setState({
//           message: `Sign In With Phone Number Error: ${error.message}`
//         })
//       );
//   };
//   render() {
//     // const { email, password } = this.setState;
//     const { phoneNumber } = this.state;

//     return (
//       <View style={styles.wrapper}>
//         <StatusBar backgroundColor="#fff" barStyle="light-content" />
//         <View style={styles.container}>
//           <PhoneInput
//             ref="phone"
//             style={styles.input__auth}
//             onChangeText={value => this.setState({ phoneNumber: value })}
//             placeholder={'Phone number ... '}
//             value={phoneNumber}
//           />
//           <TouchableOpacity onPress={this.signIn}>
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>Next</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// export default Login;

// const styles = StyleSheet.create({
//   wrapper: {
//     backgroundColor: '#fff',
//     flex: 1,
//     justifyContent: 'center'
//   },
//   container: {
//     flex: 0.9,
//     paddingLeft: 30,
//     paddingRight: 30,
//     zIndex: 100,
//     justifyContent: 'center'
//   },
//   row: {
//     flex: 0.8
//   },
//   logo: {
//     height: 100,
//     width: 100,
//     marginBottom: 15,
//     alignSelf: 'center'
//   },
//   bg_auth: {
//     width: '100%',
//     height: undefined,
//     aspectRatio: 1,
//     position: 'absolute',
//     bottom: -50
//   },
//   input__auth: {
//     backgroundColor: '#eaecf0',
//     borderRadius: 30,
//     height: 50,
//     margin: 8,
//     color: '#F2E8D5',
//     paddingLeft: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 6
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4.65
//   },
//   button: {
//     backgroundColor: '#45c8dc',
//     color: '#1e3347',
//     height: 50,
//     margin: 8,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#fff'
//   },
//   buttonText: {
//     fontSize: 18,
//     fontFamily: 'Raleway-Medium',
//     textTransform: 'uppercase',
//     color: '#fff'
//   },
//   signupTextCont: {
//     flexGrow: 1,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//     marginBottom: -15,
//     flexDirection: 'row'
//   },
//   signupText: {
//     fontSize: 14,
//     color: '#fff',
//     marginRight: 5,
//     fontFamily: 'Roboto-Regular'
//   },
//   signupButton: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: '500',
//     fontFamily: 'Roboto-Bold'
//   }
// });
