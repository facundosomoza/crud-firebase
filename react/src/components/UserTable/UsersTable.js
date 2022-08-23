import React from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import useUserTable from "./useUserTable";

const UsersTable = ({ users, handleClickModal, app, getUsers }) => {
  const { handleEdit, handleDelete } = useUserTable(
    handleClickModal,
    app,
    getUsers
  );

  console.log("USERS TABLE", users);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.phone}</td>
              <td>
                <Button onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};

export default UsersTable;
