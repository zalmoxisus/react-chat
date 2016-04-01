import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Avatar from '../../src/components/messages/Avatar';

const props = {
  message:
  {
    id: 1,
    name: 'John',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
    msg: 'Hello, Marry!',
    time: 1444428192,
    sender: 1
  }
};

describe('Avatar', () => {
  it('should render avatar', () => {
    const avatar = shallow(<Avatar
      src={props.message.avatar}
    />);
    expect(avatar.find('img').length).toBe(1);
    expect(avatar.find('img').node.props.src).toBe(props.message.avatar);
  });
});
