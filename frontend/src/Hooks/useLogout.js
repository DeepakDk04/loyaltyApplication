import { useNavigate } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import useLocalStorage from "../Hooks/useLocalStorage";

const useLogout = () => {
  const { removeAuth } = useAuth();
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage("user", {});
  return (redirect) => {
    setUser({});
    removeAuth();
    navigate(redirect, { replace: true });
    console.log("user is logged out");
  };
};

export default useLogout;
