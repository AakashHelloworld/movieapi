import React, { useState, useEffect } from "react";

import Movieinfo from "./Movieinfo";

import Pagination from "@material-ui/lab/Pagination";

import { useLocation } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import Genere from "../movie_feature_from_single_page/Genere";

import { MdMovie } from "react-icons/md";

import { BiSlideshow } from "react-icons/bi";

import Popup from "../movie_feature_from_single_page/Popup";

import InfiniteScroll from "react-infinite-scroll-component";

function Moviedocuments({
  moviedata,
  logouttoggle,
  setlogouttoggle,
  toggleMT,
  settoggleMT,
  update,
  setupdate,
  id,
  setId,
}) {
  const location = useLocation();

  const pathidgenre = location.pathname.split("/")[1];

  const pathid = location.pathname.split("/")[2];

  const [realtimemovie, setrealtimemovie] = useState([]);

  const [elementloading, setElementloading] = useState(false);

  const fetchingdataa = async () => {
    setElementloading(true);
    const respond_from_api = await fetch(
      ` https://api.themoviedb.org/3/discover/${
        toggleMT ? "movie" : "tv"
      }?api_key=af3abab3867f0ddb9831952933244908&language=en-US&sort_by=popularity.desc&page=${update}&with_genres=${pathid}`
    );

    const Mdatas = await respond_from_api.json();

    const data = Mdatas.results;

    setrealtimemovie([...realtimemovie, ...data]);
    setElementloading(false);
  };
  useEffect(() => {
    togglehandler();
  }, [pathidgenre]);

  useEffect(() => {
    if (pathid) {
      fetchingdataa();
    }
  }, [pathid, toggleMT, update]);

  const togglehandler = () => {
    settoggleMT((toggleMT) => {
      return !toggleMT;
    });

    setupdate(1);

    setrealtimemovie([]);
  };
  if (!Boolean(id)) {
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
    <div className="big">
      <div className="nav">
        <Genere />

        <div className="noidea">
          <button className="btn" onClick={togglehandler}>
            {toggleMT ? <MdMovie /> : <BiSlideshow />}
          </button>

          <Popup
            logouttoggle={logouttoggle}
            setlogouttoggle={setlogouttoggle}
            id={id}
            setId={setId}
          />
        </div>
      </div>

      {!!realtimemovie.length && (
        <h1 className="headtitle">
          {`${pathidgenre} ${toggleMT ? "movie" : "series"}`}
        </h1>
      )}

      {!realtimemovie.length && (
        <h1 className="headtitle">{`Trending ${
          toggleMT ? "movie" : "series"
        }`}</h1>
      )}

      {/* <div className="big_box"> */}
      <br />

      {realtimemovie && (
        <InfiniteScroll
          className="big_box"
          dataLength={realtimemovie.length}
          next={() => {
            setupdate((prev) => prev + 1);
          }}
          hasMore={true}
        >
          {realtimemovie.map((data) => {
            return (
              <Movieinfo
                toggleMT={toggleMT}
                key={data.id}
                media={data.media_type}
                othername={data.name}
                title={data.original_title}
                name={data.original_name}
                imgpath={data.poster_path}
                vote={data.vote_average}
                imgsecond={data.backdrop_path}
                detail={data.overview}
                lan={data.original_language}
                id={data.id}
              />
            );
          })}{" "}
        </InfiniteScroll>
      )}

      {!realtimemovie.length && (
        <div className="big_box">
          {moviedata.map((data) => {
            // console.log(data);
            return (
              <Movieinfo
                key={data.id}
                media={data.media_type}
                othername={data.name}
                title={data.original_title}
                name={data.original_name}
                imgpath={data.poster_path}
                vote={data.vote_average}
                imgsecond={data.backdrop_path}
                detail={data.overview}
                lan={data.original_language}
                id={data.id}
              />
            );
          })}
        </div>
      )}
      {elementloading &&   <CircularProgress />}
    </div>
  );
}

export default Moviedocuments;
