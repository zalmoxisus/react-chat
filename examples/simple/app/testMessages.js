const testMessages = [
  {
    _id: '1',
    user: {
      _id: '1',
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/oagra/128.jpg'
    },
    text: 'Hello, Marry!',
    createdAt: new Date(Date.UTC(2017, 4, 3, 17, 20, 0))
  },
  {
    _id: '2',
    user: {
      _id: '2',
      name: 'Marry',
      avatar: ''
    },
    text: 'Welcome, John!',
    createdAt: 1444428192
  },
  {
    _id: '3',
    user: {
      _id: '1',
      name: 'John',
      avatar: ''
    },
    text: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! ' +
    'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!',
    createdAt: new Date(Date.UTC(2017, 3, 4, 17, 22, 0))
  },
  {
    _id: '4',
    user: {
      _id: '2',
      name: 'Marry',
      avatar: ''
    },
    text: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! ' +
    'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!',
    createdAt: new Date(Date.UTC(2017, 3, 4, 18, 23, 0))
  },
  {
    _id: '5',
    user: {
      _id: '1',
      name: 'John',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg'
    },
    text: 'Hello, Marry!',
    createdAt: new Date(Date.UTC(2017, 5, 4, 17, 23, 0))
  },
  {
    _id: '7',
    user: {
      _id: '1',
      name: 'John',
      avatar: ''
    },
    text: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! ' +
    'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!',
    createdAt: new Date(Date.UTC(2017, 6, 4, 17, 23, 0))
  },
  {
    _id: '12',
    user: {
      _id: 'Marry',
      name: 'John',
      avatar: ''
    },
    text: 'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! ' +
    'Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry! Hello, Marry!',
    createdAt: new Date(Date.UTC(2017, 6, 4, 17, 25, 0))
  }
];

export default testMessages;
