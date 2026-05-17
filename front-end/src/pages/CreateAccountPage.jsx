import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password != confirmPassword) {
        setError("Password and Confirm Password did not match");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          const { value } = e.target;
          setConfirmPassword(value);
        }}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to="/login">Back</Link>
    </>
  );
};

export default CreateAccountPage;
