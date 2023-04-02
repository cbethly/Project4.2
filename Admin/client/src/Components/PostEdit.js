import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

function PostEdit(props) {
  return (
    <Edit title="Edit Post" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="title" />
        <TextInput source="category" />
        <TextInput source="description" />
        <TextInput source="link" />
        <DateInput label="Published" source="publishedAt" />
      </SimpleForm>
    </Edit>
  );
}

export default PostEdit;
