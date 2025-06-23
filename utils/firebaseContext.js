// utils/firebaseContext.js
import { createContext, useContext } from "react";
import { auth, db } from "./firebase";

const FirebaseContext = createContext({ auth, db });

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
