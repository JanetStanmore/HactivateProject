import React, { useState } from "react";
import signUpWithEmail from "../../services/signUpWithEmail";
import "./index.css";
import Message from "./message";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");

  function handleSubmit() {
    const status = signUpWithEmail(fullName, email, password);
    setSignUpSuccess(status);
  }


  console.log(signUpSuccess);

  return (
    <div className="container">
      <div className="card">
        <p className="login">Hey Sign up</p>
        <div className="inputBox">
          <input type="text" required={true} value={fullName} onChange={e => setFullName(e.target.value)} />
          <span className="user">Full Name</span>
        </div>

        <div className="inputBox">
          <input type="text" required={true} value={email} onChange={e => setEmail(e.target.value)} />
          <span className="user">Email</span>
        </div>

        <div className="inputBox">
          <input type="password" required={true} value={password} onChange={e => setPassword(e.target.value)} />
          <span>Password</span>
        </div>

        <button className="enter" onClick={handleSubmit}>Register</button>
      </div>

      {
        signUpSuccess !== "" && <Message isSuccess={signUpSuccess} user={fullName} />
      }
    </div>
  );
};

export default SignupPage;
