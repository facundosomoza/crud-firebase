import React from "react";

import Button from "react-bootstrap/Button";

import UserModal from "./components/UserModal/UserModal";
import UsersTable from "./components/UserTable/UsersTable";
import useApp from "./useApp";

function App() {
  const {
    handleClickModal,
    users,
    app,
    getUsers,
    clickModal,
    hideClick,
    selectedUser,
  } = useApp();

  return (
    <>
      <Button variant="primary" onClick={() => handleClickModal()}>
        Add
      </Button>

      <UsersTable
        users={users}
        handleClickModal={handleClickModal}
        app={app}
        getUsers={getUsers}
      />

      <UserModal
        handleClickModal={handleClickModal}
        clickModal={clickModal}
        hideClick={hideClick}
        app={app}
        getUsers={getUsers}
        user={selectedUser}
      ></UserModal>
    </>
  );
}

export default App;
