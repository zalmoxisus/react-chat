import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import MdCheck from 'react-icons/lib/md/check';
import MdClose from 'react-icons/lib/md/close';
import './style.scss';
import styles from './modal.scss';

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
  constructor(props) {
    super(props);
    this.state = {
      lang: this.props.modal['type'] === 'translate' ?
        this.props.modal.list[0].c : null,
      voice: this.props.modal['type'] === 'speech' ?
        this.props.modal.list[0].name : null
    };
  }
  componentDidMount() {
    this.setState({ lang: this.props.modal.selectedItem });
  }
  selectLang = (e) => {
    this.setState({ lang: e.target.value });
  };
  selectVoice = (e) => {
    this.setState({ voice: e.target.value });
  };
  formSubmit = () => {
    const type = this.props.modal['type'];
    let val;
    switch (type) {
      case 'translate': val = this.state.lang; break;
      case 'speech': val = this.state.voice; break;
      case 'ban': val = this.props.modal.msg; break;
      default: val = null;
    }
    this.props.submitModal(val);
  };
  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal
        isOpen={(modal !== null)}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className={styles.modal}>
          <h1>{modal['title']}</h1>
          <div className={styles.modalContent}>
            {modal.list &&
            <div>
              {modal['type'] === 'translate' ?
                <select
                  value={this.state.lang}
                  onChange={this.selectLang}
                >
                  {modal.list
                    .map(item => (
                      <option key={item.c} value={item.c}>{item.l}</option>
                    ))}
                </select> :
                <select onChange={this.selectVoice}>
                  {modal.list
                    .map(item => (
                      <option key={item.name} value={item.name}>
                        {item.name.replace('Google', '')}
                      </option>
                    ))}
                </select>
              }
            </div>
            }
            <div className={styles.btns}>
              <MdCheck onClick={this.formSubmit} />
              <MdClose onClick={closeModal} />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
ModalDialog.propTypes = {
  modal: PropTypes.object,
  submitModal: PropTypes.func,
  closeModal: PropTypes.func
};
