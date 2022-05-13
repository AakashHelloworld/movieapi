import react, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import Login from "./components/Login";

import { ToastContainer } from "react-toastify";

import Signin from "./components/Signin";

import Moviedocuments from "./Moviecollection/Moviedocuments";

import Moviedata from "./Movie_data_about_one/Moviedata";

import Profile from "./movie_feature_from_single_page/Profile";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./Firestore/firestore";

import "./css/App.css";

import "./css/index.css";

import { getDoc, doc } from "firebase/firestore";

import { db } from "./Firestore/firestore";

const Key = "api_key=af3abab3867f0ddb9831952933244908";

const mainurl = "https://api.themoviedb.org/3";

const url = mainurl + "/discover/movie?sort_by=popularity.desc&" + Key;

const App = () => {
  const [id, setId] = useState("");

  const [logouttoggle, setlogouttoggle] = useState(false);

  const [toggleMT, settoggleMT] = useState(false);

  const [update, setupdate] = useState(1);

  const [moviedata, setmoviedata] = useState([]);

  const [libraray, setlibraray] = useState([]);

  const [maindata, setMaindata] = useState({
    username: "",
    library: [],
    comments: [],
  });
  // i have nothing to say about it just comment

  const fetchingdataa = async () => {
    try {
      const respond_from_api = await fetch(
        `https://api.themoviedb.org/3/trending/${
          toggleMT ? "movie" : "tv"
        }/day?api_key=af3abab3867f0ddb9831952933244908`
      );
      const Mdatas = await respond_from_api.json();
      const data = Mdatas.results;
      setmoviedata(data);
      return 1;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setId(user.uid);
        const ref = doc(db, "user", user.uid);
        getDoc(ref).then((snapshot) => {
          setMaindata(snapshot.data());
        });
        console.log(user);
      }
    });
  }, []);

  useEffect(() => {
    fetchingdataa();
  }, [update, toggleMT]);

  return (
    <>
      <main>
        <ToastContainer theme="dark" />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/signin"
              element={<Signin maindata={maindata} setMaindata={setMaindata} />}
            />

            <Route path="/login" element={<Login setId={setId} id={id} />} />

            <Route
              path={`/movie`}
              element={
                <Moviedocuments
                  id={id}
                  setId={setId}
                  logouttoggle={logouttoggle}
                  setlogouttoggle={setlogouttoggle}
                  toggleMT={toggleMT}
                  settoggleMT={settoggleMT}
                  moviedata={moviedata}
                  update={update}
                  setupdate={setupdate}
                />
              }
            />

            <Route
              path="/:Id/:Media/:Originalname"
              element={
                <Moviedata
                  fetchingdataa={fetchingdataa}
                  moviedata={moviedata}
                  maindata={maindata}
                  setMaindata={setMaindata}
                  libraray={libraray}
                  setlibraray={setlibraray}
                  idofuser={id}
                />
              }
            />

            <Route
              path=":Genere/:Id"
              element={
                <Moviedocuments
                  id={id}
                  setId={setId}
                  logouttoggle={logouttoggle}
                  setlogouttoggle={setlogouttoggle}
                  toggleMT={toggleMT}
                  settoggleMT={settoggleMT}
                  setmoviedata={setmoviedata}
                  moviedata={moviedata}
                  update={update}
                  setupdate={setupdate}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  maindata={maindata}
                  setMaindata={setMaindata}
                  setId={setId}
                  idofuser={id}
                />
              }
            />
          </Routes>
        </Router>
      </main>
    </>
  );
};
export default App;
