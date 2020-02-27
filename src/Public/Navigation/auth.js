import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

export default createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false
    }
  }
});
