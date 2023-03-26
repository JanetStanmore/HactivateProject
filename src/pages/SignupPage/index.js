import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "./message";
import signUpWithEmail from "../../services/signUpWithEmail";
import "./index.css";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecurity, setIsSecurity] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    const status = signUpWithEmail(fullName, email, password, isSecurity);
    navigate("/");
    setSignUpSuccess(status);  
  }

  return (
    <div className="container">
      <div className="card">
        <p className="login">Hey Sign up</p>
        <div className="inputBox">
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <span className="user">Full Name</span>
        </div>

        <div className="inputBox">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="user">Email</span>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center"
        }}>
          <label>Is Security Personnel ? </label>
          <label className="checkbox-btn ms-5">
            <label htmlFor="checkbox" />
            <input id="checkbox" type="checkbox" value={isSecurity} onChange={() => setIsSecurity(!isSecurity)} />
            <span className="checkmark" />
          </label>
        </div>

        <div className="inputBox">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </div>

        <button className="enter" onClick={handleSubmit}>
          Register
        </button>

        <div className="footer">
          <Link to="/signin">
            <p>Login here</p>
          </Link>
        </div>
      </div>

      {signUpSuccess !== "" && (
        <Message isSuccess={signUpSuccess} user={fullName} />
      )}
    </div>
  );
};

export default SignupPage;
