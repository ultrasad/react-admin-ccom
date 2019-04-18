// in src/users.js
import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const MessageList = props => (
    <List actions={null} {...props}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="message" label="Message" />
            <TextField source="priority" label="Priority" />
            <TextField source="created_by" label="Created By" />
        </Datagrid>
    </List>
);