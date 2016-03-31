import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import styles from '../../src/chat.scss';
import shortnames from 'emoji-shortnames';
import EmojiCategories from '../../src/components/InputMenus/EmojiCategories';
import ChatInput from '../../src/components/ChatInput';

let usermsgWrapper;
const props = {
  text: ':grinning:',
  addEmoticon: (e) => {
    let node = usermsgWrapper;
    node.value = e;
  }
};

describe('EmojiCategories.', () => {
  it('should add emoticon in textarea', () => {
    const emojiWrapper = mount(<EmojiCategories {...props} />).find('.' + styles.emoticonCategory);
    usermsgWrapper = mount(<ChatInput />).find('textarea');
    expect(emojiWrapper.find('span').at(0).node.title).toBe(props.text);
    emojiWrapper.find('span').at(0).simulate('click');
    expect(usermsgWrapper.value).toBe(emojiWrapper.find('span').at(0).node.title);
  });
  it('should set active button in emoticons buttons menu', () => {
    const wrapper = mount(<EmojiCategories />);
    expect(wrapper.node.state.text).toEqual(shortnames[Object.keys(shortnames)[0]].join(''));
    wrapper.find('li').at(1).simulate('click');
    expect(wrapper.node.state.text).toEqual(shortnames[Object.keys(shortnames)[1]].join(''));
  });
});
