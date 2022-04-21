import { createContext, useState } from "react";

import useLocalStorage from "../Hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let initialAuthState = null;
  const [savedUser] = useLocalStorage("user", {});

  if (
    savedUser &&
    Object.getPrototypeOf(savedUser) === Object.prototype &&
    Object.keys(savedUser).length !== 0
  ) {
    // restore user data from local storage and set with auth state
    initialAuthState = {
      accessToken: savedUser.accessToken,
      userData: savedUser.userData,
    };
  }

  const [auth, setAuth] = useState(initialAuthState);

  const removeAuth = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
