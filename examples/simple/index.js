import React from 'react';
import ReactDOM from 'react-dom';
import Chat from 'react-chat';

ReactDOM.render(
  <Chat
    messages={[
      { id: 1, name: 'John', avatar: 'https://pp.vk.me/c621720/v621720119/31ca4/ic-nhOiDogM.jpg', msg: 'Hello, Marry!', time: 1444428192, sender: 1 },
      { id: 2, name: 'Marry', avatar: '', msg: 'Welcome, John!', time: 1444428192, sender: 2 },
      { id: 3, name: 'John', avatar: '', msg: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!', time: 1444428192, sender: 1 },
      { id: 4, name: 'Marry', avatar: '', msg: 'Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John!', time: 1444428192, sender: 2 },
      { id: 5, name: 'John', avatar: '', msg: 'Hello, Marry!', time: 1444428192, sender: 1 },
      { id: 6, name: 'Marry', avatar: '', msg: 'Welcome, John!', time: 1444428192, sender: 2 },
      { id: 7, name: 'John', avatar: '', msg: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!', time: 1444428192, sender: 1 },
      { id: 8, name: 'Marry', avatar: '', msg: 'Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John! Welcome, John!', time: 1444428192, sender: 2 }
    ]}
  />,
  document.getElementById('root')
);
