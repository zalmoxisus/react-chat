import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import { describeWithDOM, mount } from 'enzyme';
import hook from 'css-modules-require-hook';
import ChatInput from '../../src/components/ChatInput';
import styles from '../../src/Chat.css';

const props = {
  onSend: expect.createSpy(),
  text: 'hello'
};


describeWithDOM('ChatInput.', () => {
  it('should render correctly', () => {
    const wrapper = mount(<ChatInput />).find('textarea');
    expect(wrapper.type()).toBe('textarea');
    expect(wrapper.text()).toEqual('');
    expect(wrapper.prop('className')).toBe(styles.usermsg);
  });

  it('should send messages to parrent', () => {
    const wrapper = mount(<ChatInput {...props} />).find('textarea');
    wrapper.simulate('keyPress', { nativeEvent: { keyCode: 1 }, target: { value: props.text } });
    expect(props.onSend.calls.length).toBe(0);
    wrapper.simulate('keyPress', { nativeEvent: { keyCode: 13 }, target: { value: '' } });
    expect(props.onSend.calls.length).toBe(0);
    wrapper.simulate('keyPress', { nativeEvent: { keyCode: 13 }, target: { value: props.text } });
    expect(props.onSend).toHaveBeenCalled();
    expect(props.onSend.calls.length).toBe(1);
  });
  it('should open menu popup', () => {
    let wrapper = mount(<ChatInput {...props} />);
    expect(wrapper.node.state.menuShow).toBe(false);
    wrapper.find('.' + styles.arrowDown).simulate('click');
    expect(wrapper.node.state.menuShow).toBe(true);
    wrapper.find('.' + styles.arrowDown).simulate('click');
    expect(wrapper.node.state.menuShow).toBe(false);
  });
  it('should open emoticons popup', () => {
    let wrapper = mount(<ChatInput {...props} />);
    expect(wrapper.node.state.emoticonShow).toBe(false);
    wrapper.find('.' + styles.emoticonsBtn).simulate('click');
    expect(wrapper.node.state.emoticonShow).toBe(true);
    wrapper.find('.' + styles.emoticonsBtn).simulate('click');
    expect(wrapper.node.state.emoticonShow).toBe(false);
  });
});