import React from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';

ReactDOM.render(
  <Chat
    messages={[
      { id: 1, name: 'John', avatar: '', msg: 'Hello, Marry!', time: 1444428192, sender: 1 },
      { id: 2, name: 'Marry', avatar: '', msg: 'Welcome, John!', time: 1444428192, sender: 2 }
    ]}
  />,
  document.getElementById('root')
);
