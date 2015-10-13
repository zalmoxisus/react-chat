import React, { Component, PropTypes } from 'react';
import Avatar from './Avatar';

export default class Chat extends Component {
  static defaultProps = {
    messages: []
  };

  static propTypes = {
    messages: PropTypes.array
  };

  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div>{
        this.props.messages.map( message => {
          return <div key={message.id}>
            <Avatar
              src={message.avatar}
              name={message.name}
            />

            {message.name}
          </div>
        })
      }
      </div>
    );
  }

}
