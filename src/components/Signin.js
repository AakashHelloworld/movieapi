import React, { useState } from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";

import "react-toastify/dist/ReactToastify.css";

import { auth } from "../Firestore/firestore";

import { collection, setDoc, doc } from "firebase/firestore";

import { db } from "../Firestore/firestore";

const Signin = ({ setMaindata, maindata }) => {
  const [loading, setloading] = useState(false);

  const history = useNavigate();

  const toggledown = (e) => {
    console.log(e.target.className);

    if (e.target.className == "signin_box") {
      history("/");
    }
  };

  const [users, setusers] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  const handlechange = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setusers((data) => {
      return { ...users, [name]: value };
    });
  };
  const submithandler = async (e) => {
    e.preventDefault();

    if (users.password && users.email && users.username && users.Cpassword) {
      if (users.password == users.Cpassword) {
        setloading(true);

        createUserWithEmailAndPassword(auth, users.email, users.password)
          .then((user) => {
            const ref = collection(db, "user");
            console.log(ref);

            setDoc(doc(ref, user.user.uid), {
              ...maindata,
              username: users.username,
            });
            history("/login");
          })
          .catch((err) => {
            toast.warn(err, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 5000,
              draggable: true,
            });

            setloading(false);

            setusers((data) => {
              return {
                ...data,
                username: "",
                email: "",
                password: "",
                Cpassword: "",
              };
            });
          });
      } else {
        toast.warn("your confirmed password doesnot match previous password", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
          draggable: true,
        });
      }
    } else {
      toast.warn("plz fill all the data", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="signin_box" onClick={(e) => toggledown(e)}>
      <div className="box">
        <h1>Sign In</h1>

        <ToastContainer theme="dark" />

        <form onSubmit={submithandler}>
          <div className="box_items">
            <label>Username:</label>

            <br />

            <input
              value={users.username}
              type="text"
              placeholder="name"
              name="username"
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="box_items">
            <label>Email:</label>

            <br />

            <input
              value={users.email}
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="box_items">
            <label>Password:</label>

            <br />

            <input
              value={users.password}
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="box_items">
            <label>confirm password:</label>

            <br />

            <input
              value={users.Cpassword}
              type="password"
              placeholder="password"
              name="Cpassword"
              onChange={(e) => handlechange(e)}
            />
          </div>

          <div className="box_items">
            <button className="submit">
              {loading ? <CircularProgress /> : `click me`}
            </button>
          </div>
        </form>
      </div>

      <h3>
        if you already have signin, then <Link to={`/login`}>Login</Link>
      </h3>
    </div>
  );
};

export default Signin;
