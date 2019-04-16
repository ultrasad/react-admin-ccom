// in src/users.js
import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="username" label="Username" />
            <TextField source="groups.group_name" label="Group Name" />
        </Datagrid>
    </List>
);