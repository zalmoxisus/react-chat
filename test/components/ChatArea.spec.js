import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import Test from 'legit-tests';
import hook from 'css-modules-require-hook';
import ChatArea from '../../src/components/ChatArea';
import styles from '../../src/Chat.css';
import {findContainer} from '../testMixins';

const props = {
  messages: [
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: 1
    },
    {
      id: 2,
      name: 'Marry',
      avatar: '',
      msg: 'Welcome, John!',
      time: 1444428192,
      sender: 2
    }

  ]
};

describe('ChatArea', () => {
  it('should render correctly', () => {
    Test(<ChatArea {...props} />)
      .mixin({findContainer: findContainer})
      .findContainer(styles.container)
      .test(({container}) => {
        expect(container).toExist();
        expect(container.tagName).toBe('DIV');
      });
  });

  it('should render messages', () => {
    Test(<ChatArea {...props} />)
      .mixin({findContainer: findContainer})
      .findContainer(styles.container)
      .test(({container}) => {
        let renderedAvatar = container.querySelectorAll('img');
        for (let i = 0; i < renderedAvatar.length; i++) {
          expect(renderedAvatar[i].src).toBe(props.messages[i].avatar);
        }
      });
  });
});
