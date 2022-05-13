import React from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../Firestore/firestore";

import Watchlistmovie from "./Watchlistmovie";

const Profile = ({ maindata, setMaindata, idofuser, setId }) => {
  const userdata = collection(db, "user");

  return (
    <div className="profile">
      <h1
        style={{
          textAlign: "center",
          borderBottom: "2px solid white",
          display: "inline",
        }}
      >
        Profile
      </h1>
      <h1 style={{ textAlign: "left" }}>Hi {maindata.username}</h1>
      <h1>Watch list</h1>
      <div className="profile_box">
        {maindata.library?.map((d) => {
          return (
            <Watchlistmovie
              maindata={maindata}
              setMaindata={setMaindata}
              d={d}
              idofuser={idofuser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
