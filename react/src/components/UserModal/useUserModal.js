import React, { useEffect, useState } from "react";

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";

export default function useUserModal(
  hideClick,
  user,
  app,

  getUsers
) {
  console.log("Llego user", user);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

  const cleanFormAndHideModal = () => {
    console.log("LIMPIE FORM");
    cleanFormFields();
    hideClick();
  };

  const cleanFormFields = () => {
    setName("");
    setSurname("");
    setPhone("");
    setMessage("");
  };

  const loadUser = () => {
    console.log("Cargar user", user);
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setPhone(user.phone);
    }
  };

  useEffect(loadUser, [user]); //solo ejecuta load user si cambia user

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleSurname = (event) => {
    setSurname(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleSaveChanges = async () => {
    const db = getFirestore(app);

    const usersCollection = collection(db, "users");

    let valid = true;

    if (name.trim() === "") {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (surname.trim() === "") {
      setMessage("You must fill out the field");
      valid = false;
    }
    if (phone.trim() === "") {
      setMessage("You must fill out the field");
      valid = false;
    }

    if (valid === true) {
      const newUser = {
        name,
        surname,
        phone,
      };

      const getMessage = () => {
        let message;

        if (user) {
          message = "Your user was succesfully updated ";
        } else {
          message = "Your user was succesfully registered ";
        }

        return message;
      };

      try {
        if (user) {
          const userId = user.id;

          const userDoc = doc(db, "users", userId);

          await updateDoc(userDoc, newUser);
        } else {
          await addDoc(usersCollection, newUser);
        }

        Swal.fire({
          icon: "success",
          text: getMessage(),
        });
        cleanFormAndHideModal();

        getUsers();
      } catch (error) {
        Swal.fire({
          icon: "error",

          text: "Name, Surname or Phone are not valid!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",

        text: "Name, Surname or Phone are not valid!",
      });
    }
  };

  const handleSaveEdit = () => {
    console.log("soy editar");
  };

  return {
    name,
    surname,
    phone,
    message,
    handleName,
    handleSurname,
    handlePhone,
    handleSaveChanges,
    cleanFormFields,
    cleanFormAndHideModal,
  };
}
