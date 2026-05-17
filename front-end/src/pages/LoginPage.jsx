import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          const { value } = e.target;
          setEmail(value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          const { value } = e.target;
          setPassword(value);
        }}
      />
      <button onClick={logIn}>Log In</button>
      <Link to="/create-account">Create Account</Link>
    </>
  );
};

export default LoginPage;
