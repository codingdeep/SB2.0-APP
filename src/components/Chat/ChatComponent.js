import React, { Component } from 'react';
import {
  _getAllThreads,
  _getSingleThread,
  _getAllMessage,
} from './../../Redux/SagaActions/ChatSagasAction';


export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retrive: false,
      exit: false,
      locationId: 0,
      getAllThreads: null,
      threads: [],
      userId: 0,
      getThreadMessage: null,
      threadId: 0,
      onNewMessageThreadListner: null,
      onNewMessageThreadListListner: null,
    };
  }

  componentDidMount() {
    //this.chatRetriver();
    let self = this;
    this.props.setChat(function () {
      return {
        getState: () => {
          return {};
        },
        setRetrive: _retrive => {

          self.state.retrive = _retrive;
        },
        getThreadList: () => {
          self.chatRetriver();
        },
        setLocation: id => {
          self.state.locationId = id;
        },
        setUser: id => {
          self.state.userId = id;
        },
        setAllThreads: callback => {
          self.state.getAllThreads = callback;
        },
        setThreadMessage: callback => {
          self.state.getThreadMessage = callback;
        },
        setThreadId: id => {
          self.state.threadId = id;
        },
        setOnNewMessageThreadListner: (callback) => {
          self.state.onNewMessageThreadListner = callback;
        },
        setOnNewMessageThreadListListner: (callback) => {
          self.state.onNewMessageThreadListListner = callback;
        },
        getOnNewMessageThreadListner: () => {
          return self.state.onNewMessageThreadListner ? self.state.onNewMessageThreadListner() : null;
        },
        getOnNewMessageThreadListListner: () => {
          return self.state.onNewMessageThreadListListner ? self.state.onNewMessageThreadListListner() : null;
        }
      };
    });
  }

  componentWillUnmount() {
    //console.log('Deactivated');
    this.state.exit = true;
  }

  chatRetriver = () => {
    //console.log('SSssssssssssssssss...');
    let self = this;
    let _r = async () => {
      if (!self.state.exit) {
        //console.log('Active');
        if (self.state.retrive) {
          //console.log('Retriving...');
          if (this.state.getAllThreads) {
            let data = await _getAllThreads(self.state.locationId);
            //console.log('thread data',data)
            self.state.threads = data.filter(item => {
              if (item.participants.length) return true;
              return false;
            });
            for (let i = 0; i < self.state.threads.length; i++) {
              let lastMessage = await _getAllMessage(
                self.state.threads[i].id,
                0,
                1,
              );
              if (lastMessage.length > 0)
                self.state.threads[i] = {
                  ...self.state.threads[i],
                  lastMessage: lastMessage[0],
                };
            }
            self.state.getAllThreads(self.state.threads);
          }
        }
        //self.chatRetriver();

        let messages = await _getAllMessage(self.state.threadId, 0, 20);
        if (self.state.getThreadMessage) {
          self.state.getThreadMessage(messages);
        }
      }
    }
    _r()
    //}, 4000);
  };

  render() {
    //console.log("mmmmmmbbmbb", this.props.children);

    return <>{this.props.children}</>;
  }
}
