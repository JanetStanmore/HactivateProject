import React, { useState } from "react";
import signInWithEmail from "../../services/signInWithEmail";
import "./index.css";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");

  function handleSubmit() {
    const status = signInWithEmail( email, password);
    setSignInSuccess(status);
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
      </div>
    </div>
  );
};

export default SigninPage;
