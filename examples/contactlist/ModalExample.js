import React, { Component, PropTypes } from 'react';
import './style.scss';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(238, 238, 238, 0.75)'
  }
};
export default class ModalExample extends Component {
  render() {
    const { content, onClose } = this.props;
    return (
      <Modal
        isOpen={(content !== null)}
        onRequestClose={onClose}
        style={customStyles}
      >
        {content}
      </Modal>
    );
  }
}
ModalExample.propTypes = {
  content: PropTypes.object,
  onClose: PropTypes.func
};