import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import MdCheck from 'react-icons/lib/md/check';
import MdClose from 'react-icons/lib/md/close';
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
  constructor(props) {
    super(props);
    this.state = {
      lang: this.props.store.modal.get('type') === 'translate' ?
        this.props.store.modal.list[0].c : null,
      voice: this.props.store.modal.get('type') === 'speech' ?
        this.props.store.modal.list[0].name : null
    };
  }
  selectLang = (e) => {
    this.setState({ lang: e.target.value });
  };
  selectVoice = (e) => {
    this.setState({ voice: e.target.value });
  };
  formSubmit = () => {
    const type = this.props.store.modal.get('type');
    let val;
    switch (type) {
      case 'translate': val = this.state.lang; break;
      case 'speech': val = this.state.voice; break;
      case 'ban': val = this.props.store.modal.msg; break;
      default: val = null;
    }
    this.props.store.submitModal(val);
  };
  render() {
    const { store } = this.props;
    return (
      <Modal
        isOpen={(store.modal !== null)}
        onRequestClose={store.closeModal}
        style={customStyles}
        contentLabel={store.modal.get('title')}
      >
        <h1>{store.modal.get('title')}</h1>
        {store.modal.list &&
        <div>
          {store.modal.get('type') === 'translate' ?
            <select
              value={this.state.lang} onChange={this.selectLang}
            >
              {store.modal.list
                .map(item => (
                  <option key={item.c} value={item.c}>{item.l}</option>
                ))}
            </select> :
            <select onChange={this.selectVoice}>
              {store.modal.list
                .map(item => (
                  <option key={item.name} value={item.name}>
                    {item.name.replace('Google', '')}
                  </option>
                ))}
            </select>
          }
        </div>
        }
        <MdCheck onClick={this.formSubmit} />
        <MdClose onClick={store.closeModal} />
      </Modal>
    );
  }
}
ModalDialog.propTypes = {
  store: PropTypes.object
};
