import React, { useState } from "react";
import signUpWithEmail from "../../services/signUpWithEmail";
import "./index.css";
import Message from "./message";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");

  function handleSubmit() {
    const status = signUpWithEmail(fullName, email, password);
    setSignUpSuccess(status);
  }
  
  return (
    <div className="container">
      <div className="card">
        <p className="login">Hey Sign up</p>
        <div className="inputBox">
          <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} />
          <span className="user">Full Name</span>
        </div>

        <div className="inputBox">
          <input type="text" required value={email} onChange={e => setEmail(e.target.value)} />
          <span className="user">Email</span>
        </div>

        <div className="inputBox">
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          <span>Password</span>
        </div>

        <button className="enter" onClick={handleSubmit}>Register</button>

        <div className="footer">
          <Link to="/signin"><p>Login here</p></Link>
        </div>
      </div>

      {
        signUpSuccess !== "" && <Message isSuccess={signUpSuccess} user={fullName} />
      }
    </div>
  );
};

export default SignupPage;
