import { useContext, useDebugValue } from "react";

import AuthContext from "../Context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.userData ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};

export default useAuth;
