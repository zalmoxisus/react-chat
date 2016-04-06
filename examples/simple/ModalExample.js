import React, { Component, PropTypes } from 'react';
import './style.scss';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

export default class ModalExample extends Component {
  handleConfirm = () => {
    this.props.success();
    this.props.onClose();
  };
  render() {
    const { modalContent, onClose } = this.props;
    return (
      <ModalContainer onClose={onClose}>
        <ModalDialog onClose={onClose}>
          <div>
            {modalContent}
          </div>
        </ModalDialog>
      </ModalContainer>
    );
  }
}
ModalExample.propTypes = {
  modalContent: PropTypes.object,
  onClose: PropTypes.func,
  success: PropTypes.func
};