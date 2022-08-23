import Modal from "react-bootstrap/Modal";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import useUserModal from "./useUserModal";

const UserModal = ({
  clickModal,
  app,
  handleClickModal,
  hideClick,
  getUsers,
  user,
}) => {
  const {
    name,
    surname,
    phone,
    message,
    handleName,
    handleSurname,
    handlePhone,
    handleSaveChanges,
    cleanFormAndHideModal,
  } = useUserModal(hideClick, user, app, getUsers);

  return (
    <>
      <Modal show={clickModal} onHide={cleanFormAndHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{user ? "Edit" : "Add"} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={handleName} value={name} />
              {name ? "" : message}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                onChange={handleSurname}
                value={surname}
              />
              {surname ? "" : message}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" onChange={handlePhone} value={phone} />
              {phone ? "" : message}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cleanFormAndHideModal}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModal;
