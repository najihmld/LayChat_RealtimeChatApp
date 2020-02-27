import { Component } from 'react';
import { connect } from 'react-redux';
import { app } from '../../Config/firebase';

class index extends Component {
  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(index);
