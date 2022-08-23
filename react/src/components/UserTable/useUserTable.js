import Swal from "sweetalert2";

import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export default function useUserTable(handleClickModal, app, getUsers) {
  const handleEdit = (user) => {
    handleClickModal(user);
  };

  const handleDelete = (user) => {
    console.log(user.id);
    Swal.fire({
      title: `Do you want to delete the user ${user.name} ${user.surname}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
    }).then(async (result) => {
      console.log(result);
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const db = getFirestore(app); //Get connection

        const userToDelete = doc(db, "users", user.id);

        await deleteDoc(userToDelete);

        getUsers();

        Swal.fire("Deleted", "", "success");
      }
    });
  };

  return {
    handleEdit,
    handleDelete,
  };
}
