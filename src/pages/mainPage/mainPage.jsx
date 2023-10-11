import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { FavoritePage } from "../favoritePage";
import { SearchMoviePage } from "../searchMoviePage/searchMoviePage";

import "./mainPage.css";

export const MainPage = () => {
  const { type } = useParams();

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <div className="mainPage">
      {type === "search" && <SearchMoviePage windowDimenion={windowDimenion} />}
      {type === "favorite" && <FavoritePage windowDimenion={windowDimenion} />}
    </div>
  );
};
