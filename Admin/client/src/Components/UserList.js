import React from "react";
import {
  List,
  Datagrid,
  DateField,
  TextField,
  EditButton,
  EmailField,
  DeleteButton,
} from "react-admin";

function UserList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="password" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />

        <EditButton basePath="/users" />
        <DeleteButton basePath="/users" />
      </Datagrid>
    </List>
  );
}

export default UserList;
