import React, { useEffect } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.config";
import { sendMail } from "./sendMail";
import { getAllOrders } from "../../services/orderManagement";
import "./index.css";

const List = ({ data }) => {
  const isSecurity = (window.sessionStorage.getItem("isSecurity")) === "true" ? true : false;
  
  return (
    <div className="card">
      <div className="left-content">
        <h2 className="card-heading mt-4 mr-5">{data.userName}</h2>
        <div className="card-body">
          <p className="cardBody">{data.orderId}</p>
        </div>
      </div>
      {isSecurity && (
        <div className="right-content">
          <button onClick={() => sendMail(data.userEmail)}>
            <span className="fa-check fa-solid" />
          </button>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const orders = await getAllOrders();
    setData(orders);
  };

  
  return (
    <div className="container">
      <div className="top-content">
        <input
          type="text"
          placeholder="Search for orders..."
          name="text"
          className="input"
        />
        <div className="ms-5">
          <button onClick={signout}>
            <span className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
        <div className="ms-5">
          <button onClick={navigate("/me")}>
            <span className="fa-solid fa-user" />
          </button>
        </div>
      </div>
      <div className="bottom-content">
        {data &&
          data?.length > 0 &&
          _.map(data, (order, i) => <List key={i} data={order} />)}

        {(!data || data?.length < 1) && (
          <div>
            <h2>No orders found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

async function signout() {
  await auth?.signOut();
  window.sessionStorage.clear();
  window.location.reload();
  return true;
}

export default HomePage;
