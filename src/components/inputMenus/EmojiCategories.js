import React, { Component, PropTypes } from 'react';
import shortnames from 'emoji-shortnames';
import { inject } from 'mobx-react';
import styles from '../../chat.scss';
import emojify from '../../utils/emojify';

@inject('chatViewStore')
export default class EmojiCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
    this.categories = Object.keys(shortnames).map((category, i) =>
      <li className={styles.categoryBtn} key={i}>{emojify(shortnames[category][0])}</li>
    );
  }
  setActive = (node) => {
    let children = (node.target.tagName === 'LI') ?
      node.target.parentNode.childNodes :
      node.target.parentNode.parentNode.childNodes;
    let child = (node.target.tagName === 'LI') ? node.target : node.target.parentNode;
    for (let i = 0; i < children.length; i++) {
      children[i].style.background = '#D2DCEA';
      if (child === children[i]) {
        this.setState({ text: shortnames[Object.keys(shortnames)[i]].join('') });
        child.style.background = '#ffffff';
      }
    }
  };
  addEmoticon = (e) => {
    if (e.target.nodeName === 'SPAN') {
      this.props.addEmoticon(e.target.title);
    }
  };
  render() {
    return (
      <div className={this.props.chatViewStore.emoticonShow ? styles.showEmoticons : styles.hideEmoticons}>
        <div className={styles.emoticonCategory} onClick={this.addEmoticon}>
          {emojify(this.state.text)}
        </div>
        <ul className={styles.categoryBtns} onClick={this.setActive}>
          {this.categories}
        </ul>
      </div>
    );
  }
}

EmojiCategories.propTypes = {
  chatViewStore: PropTypes.func,
  text: PropTypes.string,
  addEmoticon: PropTypes.func
};
EmojiCategories.defaultProps = {
  text: shortnames['people'].join('')
};
