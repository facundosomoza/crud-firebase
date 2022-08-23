import React, { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function useApp() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBzsM7w8Zt4mqzek7WFgArpGkcW3iZkCtM",
    authDomain: "fir-auth-ffda7.firebaseapp.com",
    projectId: "fir-auth-ffda7",
    storageBucket: "fir-auth-ffda7.appspot.com",
    messagingSenderId: "347416012238",
    appId: "1:347416012238:web:e68193928287d979bf379f",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const [clickModal, setClickModal] = useState(false);
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleClickModal = (user) => {
    setSelectedUser(user);
    setClickModal(true);
  };

  const hideClick = () => {
    setClickModal(false);
    setSelectedUser(null);
  };

  const getUsers = async () => {
    const db = getFirestore(app);

    const usersCollection = collection(db, "users");

    const querySnapshot = await getDocs(usersCollection);

    const fbUsers = [];

    querySnapshot.forEach((doc) => {
      const userWithId = { ...doc.data(), id: doc.id };

      fbUsers.push(userWithId);
    });

    setUsers(fbUsers);
  };

  /* const getUsers = () => {
    const db = getFirestore(app);

    const usersCollection = collection(db, "users");

    getDocs(usersCollection).then((querySnapshot) => {
      const fbUsers = [];

      querySnapshot.forEach((doc) => {
        const userWithId = { ...doc.data(), id: doc.id };

        fbUsers.push(userWithId);
      });

      console.log(fbUsers);

      setUsers(fbUsers);
    });
  }; */

  useEffect(() => {
    getUsers();
  }, []);

  return {
    handleClickModal,
    users,
    app,
    getUsers,
    clickModal,
    hideClick,
    selectedUser,
  };
}
