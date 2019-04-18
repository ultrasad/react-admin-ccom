// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './users';
import { MessageList } from './messages';
//import { PostList, PostEdit, PostCreate  } from './posts';
import Dashboard from './Dashboard';

import authProvider from './authProvider';

import MessageIcon from '@material-ui/icons/Message';
//import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import jsonServerProvider from 'ra-data-json-server';

//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const dataProvider = jsonServerProvider('http://172.22.228.211:8085');

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} title="CCOM Admin Broadcasts">
      {/*<Resource options={{ label: 'Posts' }} name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />*/}

      <Resource options={{ label: 'Messages' }} name="messages" list={MessageList} icon={MessageIcon} />
      <Resource options={{ label: 'User Groups' }} name="user/Super1" list={UserList} icon={UserIcon} />
  </Admin>
);

export default App;
