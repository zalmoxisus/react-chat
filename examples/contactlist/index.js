import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ContactList from 'react-chat/ContactList';
import testContacts from './testContacts';

ReactDOM.render(<ContactList listContacts={testContacts}/>, document.getElementById('root'));
