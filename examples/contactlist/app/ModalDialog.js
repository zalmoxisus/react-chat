import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './style.scss';

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
export default class ModalDialog extends Component {
  render() {
    const { store } = this.props;
    return (
      <Modal
        isOpen={(store.modal !== null)}
        onRequestClose={store.closeModal}
        style={customStyles}
        contentLabel={store.modal.get('title')}
      >
        <div>
          <div>
            You are about to remove &nbsp;
            {store.modal.get('title')} .
            <br />
            All related chats will be closed.
          </div>
          <span onClick={store.closeModal}>Cancel</span>
          <span onClick={store.modal.func}>Confirm</span>
        </div>
      </Modal>
    );
  }
}
ModalDialog.propTypes = {
  store: PropTypes.object
};
