import React from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import img1 from "../Photo.png";

const imgurl = "https://image.tmdb.org/t/p/w500";

const Creditmember = ({ similarmovie }) => {
  const items = similarmovie?.map((d) => {
    return (
      <Link to={`/${d.id}/movie/${d.original_title}`} className="similarmovie">
        <div className="similarmovie" key={d.id}>
          <img alt={d.original_title} src={imgurl + d.backdrop_path} />
          <div>
            <h6>{d.original_title}</h6>
          </div>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: { items: 5 },
    568: { items: 7 },
    1024: { items: 9 },
  };
  return (
    <AliceCarousel
      responsive={responsive}
      disableDotsControls
      mouseTracking
      autoPlay
      disableButtonsControls
      infinite
      items={items}
    />
  );
};
export default Creditmember;
