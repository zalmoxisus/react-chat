import React, { Component, PropTypes } from 'react';
import './style.scss';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

export default class ModalExample extends Component {
  render() {
    const { modalContent, onClose } = this.props;
    return (
      <ModalContainer onClose={onClose}>
        <ModalDialog onClose={onClose}>
          <div>
            {modalContent}
          </div>
          <div>
            <span onClick={onClose}>Cancel</span>
            <span onClick={this.handleConfirm}>Confirm</span>
          </div>
        </ModalDialog>
      </ModalContainer>
    );
  }
}
ModalExample.propTypes = {
  modalContent: PropTypes.object,
  onClose: PropTypes.func
};