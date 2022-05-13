import React, { useState, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { useLocation } from "react-router-dom";

import YouTube from "react-youtube";

import movieTrailer from "movie-trailer";

import img1 from "../Photo.png";

import Creditmember from "../movie_feature_from_single_page/Creditmember";

import { MdLibraryAdd } from "react-icons/md";

import { db } from "../Firestore/firestore";

import { collection, doc, setDoc } from "firebase/firestore";

const imgurl = "https://image.tmdb.org/t/p/w500";

const imgurlforcast = "https://image.tmdb.org/t/p/w500";

const key = "af3abab3867f0ddb9831952933244908";

const Moviedata = ({
  moviedata,
  fetchingdataa,
  user,
  setuser,
  setMaindata,
  maindata,
  idofuser,
  libraray,
  setlibraray,
}) => {
  const userdata = collection(db, "user");

  // console.log(userdata);

  const [othermovieinfo, setothermovieinfo] = useState({});

  const [loading, setloading] = useState(true);

  const [castinfo, setcastinfo] = useState({});

  const [trailerURL, settrailerURL] = useState("");

  const location = useLocation();

  const pathid = location.pathname.split("/")[1];

  const pathsecondid = location.pathname.split("/")[2];

  const paththirdid = location.pathname.split("/")[3];

  const result = paththirdid.replaceAll("%20", " ");


  const fetchingdata = async () => {
    setloading(true);
    console.log("i am fetching");
    const respond_from_api = await fetch(
      `https://api.themoviedb.org/3/${pathsecondid}/${pathid}?api_key=${key}&language=en-US`
    );

    const Mdatas = await respond_from_api.json();

    const respond_for_cast = await fetch(
      `https://api.themoviedb.org/3/${pathsecondid}/${pathid}/credits?api_key=${key}&language=en-US`
    );

    const Mdata = await respond_for_cast.json();

    setothermovieinfo(Mdatas);

    setloading(false);

    setcastinfo(Mdata);
  };

  useEffect(() => {
    fetchingdata();
  }, [pathid]);

  const opts = {
    height: "250",
    width: "250",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  useEffect(() => {
    settrailerURL("");

    movieTrailer(result)
      .then((url) => {
        const urll = new URLSearchParams(new URL(url).search);

        settrailerURL(urll.get("v"));

        console.log(trailerURL);
      })
      .catch((error) => console.log(error));
  }, [pathid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathid]);


  if (loading && Boolean(idofuser)) {
    console.log(loading);
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgb(239 220 220 / 60%)",
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="single__page">
      
      <div className="movie__image"> 
      <img
            alt={
              othermovieinfo?.original_title || othermovieinfo?.original_name
            }
            src={imgurl + othermovieinfo?.backdrop_path}
          />
      </div>
      
      <div className="movie__detail__single">
    
          <h3>
            {othermovieinfo?.original_title || othermovieinfo?.original_name}
          </h3>

          <p>
            <span>RELASE DATE: </span>

            {othermovieinfo?.release_date}
          </p>

          <p>
            <span>ORIGINAL LANGUAGE: </span>

            {othermovieinfo?.original_language}
          </p>

          <p>
            <span>MEDIA TYPE: </span>

            {othermovieinfo?.media_type
              ? othermovieinfo?.media_type
              : pathsecondid}
          </p>

          <p>
            <span>STORY: </span> {othermovieinfo?.overview}
          </p>
        
      </div>

        <div className=" cast__section">
          <h4>CAST</h4>
          <div className="cast__container">
            {castinfo.cast?.map((data) => {
              return (
                <div className="cast" key={data.credit_id}>
                  <img
                  className="cast__img"
                    src={
                      data.profile_path
                        ? imgurlforcast + data.profile_path
                        : img1
                    }
                  />
                  <h5>{data.original_name}</h5>
                  <h5>{data.known_for_department}</h5>
                </div>
              );
            })}
          </div>
          </div>
    
        <div className="youtube__section">
          <h4>Trailer</h4>

          {trailerURL ? (
            <YouTube
              style={{ textAlign: 'center' }}
              videoId={trailerURL ? trailerURL : "w3ug4uy3"}
              opts={opts}
            />
          ) : (
            <div className="youtube__error">
              <h5>Due to some techinal problem we are unale to show</h5>
            </div>
          )}
        </div>

    </div>
  );
};
export default Moviedata;
