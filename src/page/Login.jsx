import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
