import { db } from "../Firebase/Config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

//hooks
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanUP
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkifIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data) => {
    checkifIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);

      alert("Cadastrado com sucesso!");
      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password ")) {
        systemErrorMessage = "A senha precisa conter no minímo 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = " E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro tente mais tarde";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //logout - sign Out

  const logout = () => {
    checkifIsCancelled();

    signOut(auth);
  };

  //login - sign In

  const login = async (data) => {
    checkifIsCancelled();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
      alert("usuário encontrado");
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logout, login };
};
