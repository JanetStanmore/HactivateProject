import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createAOrder } from '../../services/orderManagement';
import "./index.css";

const ProfilePage = () => {
  const [name, setName] = React.useState("");
  const [orderId, setOrderId] = React.useState("");
  const [expectedDate, setExpectedDate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await createAOrder({
      userName: name,
      userEmail: email,
      orderId,
      expectedDate
    });
    setName("");
    setOrderId("");
    setExpectedDate("");
    setEmail("");
    navigate("/")
  }


  return (
    <div className="container">
      <div className="card">
        <p className="login">Create an Order</p>
        <div className="inputBox">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <div className="inputBox">
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <span className="user">Order ID</span>
        </div>

        <div className="inputBox">
          <input
            type="text"
            required
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
          />
          <span>EXpected Date</span>
        </div>

        <button className="enter" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default ProfilePage