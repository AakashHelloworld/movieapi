import React, { useState } from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../Firestore/firestore";

const Login = ({ id, setId }) => {
  const [loading, setloading] = useState(false);

  const history = useNavigate();

  const toggledown = (e) => {
    console.log(e.target.className);
    if (e.target.className == "login_box") {
      history("/");
    }
  };

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handlechangeforlogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setlogin((data) => {
      return { ...login, [name]: value };
    });
  };

  const submitlogin = (e) => {
    e.preventDefault();
    if (login.email && login.password) {
      setloading(true);
      signInWithEmailAndPassword(auth, login.email, login.password)
        .then(() => {
          console.log("we are logined");
          history("/movie");
          toast.success("login success", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 5000,
            draggable: true,
          });
        })
        .catch((e) => {
          alert("either email wrong or password wrong");
        });
      setloading(false);
    } else {
      alert("plz fill the data");
    }
  };

  return (
    <div className="login_box" onClick={(e) => toggledown(e)}>
      <div className="box">
        <h1>Login In</h1>

        <form onSubmit={submitlogin}>
          <div className="box_items">
            <label>Email:</label>

            <br />

            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) => handlechangeforlogin(e)}
            />
          </div>
          <div className="box_items">
            <label>Password:</label>

            <br />

            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handlechangeforlogin(e)}
            />
          </div>

          <div className="box_items">
            <button className="submit">submit</button>
          </div>
        </form>
      </div>

      <h3>
        if you have not signin yet, then <Link to={`/signin`}>signin</Link>
      </h3>
    </div>
  );
};

export default Login;
