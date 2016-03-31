import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import styles from '../../src/chat.scss';
import UserMenu from '../../src/components/inputMenus/UserMenu';
import ChatInput from '../../src/components/ChatInput';

let usermsgWrapper;
const props = {
  messages: [
    {
      id: 1,
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg',
      msg: 'Hello, Marry!',
      time: 1444428192,
      sender: '1'
    }
  ],
  text: 'https://www.youtube.com/watch?v=kuRn2S7iPNU',
  onSend: (msg, success) => {
    const message = {
      id: (Date.now() / 1000 | 0) + Math.random(),
      name: 'X',
      avatar: '',
      msg: props.text,
      time: Date.now() / 1000 | 0,
      sender: '1'
    };
    props.messages.push(message);
    success();
  },
  menuShow: false,
  addTranslation: (e) => {
    props.addStr(e);
    props.menuShow = true;
  },
  addStr: (e) => {
    let node = usermsgWrapper;
    node.value = e;
  },
  onTranslate: (txt, to, cb) => {
    // Add here your translation method
    cb(txt);
  },
  translateLanguages: [
    { c: 'sq', l: 'Albanian' },
    { c: 'ar', l: 'Arabic' }
  ],
  mapRefContainer: (node) => {
    this.videoInpContainer = node;
  }
};

describe('UserMenu.', () => {
  it('should render correctly', () => {
    const wrapper = mount(<UserMenu />).find('ul');
    expect(wrapper.type()).toBe('ul');
  });
  it('should open video popup', () => {
    const wrapper = mount(<UserMenu {...props} />);
    wrapper.find('li').at(2).simulate('click');
    expect(wrapper.node.state.submenuShow).toBe(true);
  });
  it('should add message', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const videoInput = shallow(
        <input autoFocus
          placeholder="Video url (youtube, vimeo)"
          onKeyUp={wrapper.node.changeVideoInp}
        />);
    expect(props.messages.length).toBe(1);
    videoInput.simulate('keyUp', { nativeEvent: { keyCode: 13 }, target: { value: props.text } });
    expect(props.messages.length).toBe(2);
    expect(props.messages[1].msg).toBe(props.text);

  });
  it('should open translate popup', () => {
    const wrapper = mount(<UserMenu {...props} />);
    wrapper.find('li').at(1).simulate('click');
    expect(wrapper.node.state.submenuShow).toBe(true);
  });
  it('should add translation', () => {
    const wrapper = mount(<UserMenu {...props} />);
    const translationInput = shallow(
      <input autoFocus
        placeholder="Tape a phrase to be translated"
        onKeyUp={wrapper.node.insertTranslation}
      />);
    usermsgWrapper = mount(<ChatInput />).find('textarea');
    expect(usermsgWrapper.value).toBe(undefined);
    translationInput.simulate('keyUp', { nativeEvent: { keyCode: 13 }, target: { value: 'hi' } });
    expect(props.menuShow).toBe(true);
    expect(usermsgWrapper.value).toNotBe(undefined);
  });
});
