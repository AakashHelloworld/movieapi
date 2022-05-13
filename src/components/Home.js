import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Banner from "./Banner.js";
import { initializeApp } from "firebase/app";

const Home = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDTbxgaDiW9krkrJha-Zz1pGWkHqr7ClQ8",
    authDomain: "fir-learning-bff74.firebaseapp.com",
    projectId: "fir-learning-bff74",
    storageBucket: "fir-learning-bff74.appspot.com",
    messagingSenderId: "326653008218",
    appId: "1:326653008218:web:cceaa350224c13b7417b63",
  };
  // Initialize Firebase
  initializeApp(firebaseConfig);

  const auth = getAuth();
  const logoutfun = (e) => {
    signOut(auth)
      .then(() => {
        console.log("we loged out");
      })
      .catch((err) => {});
  };
  return (
    <>
      <div className="homepage">
        <div className="displaynone">
          <Link className="link" to={`/signin`}>
            signin
          </Link>
          <Link className="link" to={`/login`}>
            loginin
          </Link>
        </div>

        <Banner />
      </div>
    </>
  );
};

export default Home;
