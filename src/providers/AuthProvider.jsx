import React, { useEffect } from 'react'
import PropTypes from "prop-types";
import { useState } from 'react';
import { createContext } from 'react'
import { app } from '../firebase/firebase.config';

export const AuthContext =createContext(null);
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app)


const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

    //   if (currentUser) {
    //     // get token and store client
    //     const userInfo = { email: currentUser?.email };

    //     (async () => {
    //       try {
    //         const { data } = await axiosCommon.post("/jwt", userInfo);
    //         if (data?.token) {
    //           localStorage.setItem("access-token", data?.token);
    //           setLoading(false);
    //         }
    //       } catch (error) {
    //         console.error("Error:", error);
    //       }
    //     })();
    //   } else {
    //     localStorage.removeItem("access-token");
    //     setLoading(false);
    //   }
      console.log("currentUser: ", currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.node,
};

export default AuthProvider