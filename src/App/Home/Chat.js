import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ChatScreen } from 'react-native-easy-chat-ui';
import { app, db } from '../../Config/firebase';

class Chat extends Component {
  componentDidMount() {
    this.getMessage();
    this.getData();
  }
  state = {
    data: [],
    sender: app.auth().currentUser.uid,
    target: this.props.navigation.state.params.listChat.uid,
    dataTarget: this.props.navigation.state.params.listChat,
    senderMessages: [],
    receiverMessages: [],
    messages: [],
    inverted: false, // require
    voiceHandle: true,
    currentTime: 0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: '',
    voicePlaying: false,
    voiceLoading: false,
    content: ''
  };

  getData = () => {
    try {
      db.ref(`/users/${this.state.sender}`).on('value', res => {
        let data = res.val();
        this.setState({ data: data });
      });
    } catch (error) {}
  };

  sendMessage = (type, content, isInverted) => {
    this.setState({ content });
    const listChat = this.state.dataTarget;
    db.ref(`/chats/${this.state.target}/${this.state.sender}`)
      .push({
        id: `${new Date().getTime()}`,
        type,
        targetId: '12345678',
        chatInfo: {
          avatar:
            'https://bubhandari.net/wp-content/uploads/2017/09/avatar.jpg',
          id: this.state.target,
          nickName: 'Test'
        },
        renderTime: true,
        sendStatus: 1,
        content,
        time: `${new Date().getTime()}`
      })
      .then(
        db
          .ref(`/chatroom/${this.state.sender}`)
          .child(listChat.uid)
          .set({
            uid: listChat.uid,
            name: listChat.name,
            avatar: listChat.avatar,
            bio: listChat.bio,
            email: listChat.email,
            content: content,
            time: `${new Date().getTime()}`
          })
          .then(
            db
              .ref(`/chatroom/${listChat.uid}`)
              .child(this.state.sender)
              .set({
                uid: this.state.data.uid,
                name: this.state.data.name,
                avatar: this.state.data.avatar,
                bio: this.state.data.bio,
                email: this.state.data.email,
                content: content,
                time: `${new Date().getTime()}`
              })
          )
      );
  };

  getMessage = () => {
    try {
      db.ref(`/chats/${this.state.sender}/${this.state.target}`).on(
        'value',
        res => {
          let data = res.val();
          if (data !== null) {
            const objectToArray = Object.values(data);
            this.setState({ senderMessages: objectToArray });
          } else {
          }
        }
      );
      db.ref(`/chats/${this.state.target}/${this.state.sender}`).on(
        'value',
        res => {
          let data = res.val();
          let senderData = [];
          if (data != null) {
            const objectToArray = Object.values(data);
            objectToArray.map((item, index) => {
              senderData.push({
                id: item.id,
                type: item.type,
                targetId: '88886666',
                chatInfo: item.chatInfo,
                renderTime: item.renderTime,
                sendStatus: item.sendStatus,
                content: item.content,
                time: item.time
              });
              this.setState({ receiverMessages: senderData });
            });
          } else {
          }
        }
      );
    } catch (error) {}
  };

  render() {
    let newData = [
      ...this.state.senderMessages,
      ...this.state.receiverMessages
    ];

    return (
      <ChatScreen
        ref={e => (this.chat = e)}
        messageList={newData}
        sendMessage={this.sendMessage}
        avatarStyle={styles.chatsc}
        placeholder={'Message...'}
        rightMessageBackground={'#b4e9f1'}
        pressOutText={'Lepas'}
        pressInText={'terus..'}
      />
    );
  }
}

export default Chat;

const styles = StyleSheet.create({
  chatsc: {
    display: 'none'
  }
});
