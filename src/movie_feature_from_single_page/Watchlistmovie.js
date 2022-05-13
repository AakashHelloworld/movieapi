import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { db } from "../Firestore/firestore";

import { collection, doc, setDoc } from "firebase/firestore";

const imgurl = "https://image.tmdb.org/t/p/w500";

const Watchlistmovie = ({ d, maindata, setMaindata, idofuser }) => {
  const userdata = collection(db, "user");
  const [toggle, settoggle] = React.useState(false);

  const removehandler = () => {
    const library = maindata.library.filter((data) => {
      return data.id != d.id;
    });
    setMaindata({ ...maindata, library });
    settoggle(!toggle);
  };
  useEffect(() => {
    console.log(idofuser);
    if (idofuser && userdata) {
      setDoc(doc(userdata, idofuser), {
        ...maindata,
        library: [...maindata.library],
      }).then(() => {});
    }
  }, [maindata.library]);

  return (
    <div>
      <Link to={`/${d.id}/${d.type}/${d.name}`}>
        <div className="small_box" key={d.id}>
          <img alt={d.name} src={imgurl + d.img} />

          <div className="small_box_over">
            {" "}
            <h6>{d.name}</h6>
          </div>
          <div className="smalll_box_over"> </div>
        </div>
      </Link>
      <button className="remove" onClick={removehandler}>
        {" "}
        Remove from the list
      </button>
    </div>
  );
};

export default Watchlistmovie;
