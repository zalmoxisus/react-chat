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
  constructor(props) {
    super(props);
    this.isOpen = true;
  }
  handleConfirm = () => {
    this.props.success();
    this.props.onClose();
  };
  render() {
    const { modalContent, onClose } = this.props;
    return (
      <Modal
        isOpen={this.isOpen}
        onRequestClose={onClose}
        style={customStyles}
      >
        {modalContent}
      </Modal>
    );
  }
}
ModalExample.propTypes = {
  modalContent: PropTypes.object,
  onClose: PropTypes.func,
  success: PropTypes.func
};