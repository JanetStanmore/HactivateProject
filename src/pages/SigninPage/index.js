import React, { useState } from "react";
import signInWithEmail from "../../services/signInWithEmail";
import { Link, useNavigate } from "react-router-dom";
import Message from "./message";
import "./index.css";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(null);
  const navigate = useNavigate();


  function handleSubmit() {
    const status = signInWithEmail( email, password);
    setSignInSuccess(status);
    navigate("/")
  }
  
  return (
    <div className="container">
      <div className="card">
        <p className="login">Hey Sign in</p>
        <div className="inputBox">
          <input type="text" required value={email} onChange={e => setEmail(e.target.value)} />
          <span className="user">Email</span>
        </div>

        <div className="inputBox">
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          <span>Password</span>
        </div>

        <button className="enter" onClick={handleSubmit}>Log in</button>

        <div className="footer">
          <Link to="/signup"><p>Register here</p></Link>
        </div>
      </div>


      {
        signInSuccess !== null && signInSuccess.isSuccessful && <Message isSuccess={signInSuccess.isSuccessful} message={signInSuccess.message} />
      }
    </div>
  );
};

export default SigninPage;
