import React, { useEffect, useState } from "react";

import { ReactComponent as StarUnwatched } from "../../img/StarEmpty.svg";
import { ReactComponent as StarWatched } from "../../img/StarFull.svg";
import { ReactComponent as Cross } from "../../img/Cross.svg";
import { ReactComponent as EmptyStar } from "../../img/Icon_star_empty.svg";
import { ReactComponent as FullStar } from "../../img/Icon_star_full.svg";

import "./movieCard.css";
import { setNewGrade } from "../../Api/fetches";

export const MovieCard = ({
  setRefreshPosts,
  refreshPosts,
  isFavorite,
  getFavorites,
  bigCard,
  delMovie,
  setPage,
  ...item
}) => {
  const [favorite, setFavorite] = useState(false);
  const [cardSize, setCardSize] = useState("");
  const [grade, setGrade] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setGrade(item.imdbRating / 2);
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError("");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("favorite"))?.some(
        (movie) => movie === item.imdbID
      )
    ) {
      setFavorite(true);
    }
  }, [favorite, item.imdbID]);

  useEffect(() => {
    if (bigCard) {
      setCardSize("-big");
    }
  }, [bigCard]);

  const getUpageFavorite = () => {
    if (isFavorite) {
      getFavorites();
    }
  };

  const onClickFavoriteButton = () => {
    setFavorite(!favorite);
    if (
      !JSON.parse(localStorage.getItem("favorite"))?.some(
        (movie) => movie === item.imdbID
      )
    ) {
      const favoriteDate = JSON.parse(localStorage.getItem("favorite"));
      favoriteDate.push(item.imdbID);
      localStorage.setItem("favorite", JSON.stringify(favoriteDate));
    } else {
      const movies = JSON.parse(localStorage.getItem("favorite"));
      const findRemovableMovie = movies.findIndex(
        (movie) => movie === item.imdbID
      );
      movies.splice(findRemovableMovie, 1);
      localStorage.setItem("favorite", JSON.stringify(movies));
    }
  };
  const rateMovie = (rating) => {
    const result = setNewGrade(rating * 2, item.imdbID);
    result.then((data) => {
      if (data?.result === "success") {
        setGrade(rating);
      } else {
        setError("оценка не изменена");
      }
    });
  };

  return (
    <div className="movieCard">
      {error && <div className="errorSection">{error}</div>}
      <div className="movieCardTopSection">
        <h3 className={`cardTitle${cardSize}`}>{item.Title}</h3>
        <div className="cardManipulationButtons">
          <button
            onClick={(event) => {
              event.preventDefault();
              onClickFavoriteButton();
              getUpageFavorite();
            }}
            className="favoriteButton"
          >
            {favorite ? (
              <abbr title="Убрать из просмотренных">
                <StarWatched />
              </abbr>
            ) : (
              <abbr title="Добавить в просмотренные">
                {" "}
                <StarUnwatched className="star" />
              </abbr>
            )}
          </button>
          <button
            className="deleteButton"
            onClick={(e) => {
              e.preventDefault();
              delMovie(item.imdbID);
              setPage(1);
            }}
          >
            <abbr title="Удалить фильм из списка">
              <Cross className="cross" />
            </abbr>
          </button>
        </div>
      </div>
      <div className={`movieCardMiddleSection${cardSize}`}>
        <img className="moviePoster" alt="no" src={item.Poster} />
        <div>
          <p className={`country${cardSize}`}>
            <span>{item?.Country}</span>
          </p>

          <p className={`genre${cardSize}`}>{item.Genre}</p>
        </div>
      </div>
      <div className={`movieCardBottomSection${cardSize}`}>
        <p className={`movieYear${cardSize}`}>{item?.Year}</p>
        <div className="star-conteiner">
          <button
            onClick={(e) => {
              e.preventDefault();
              rateMovie(1);
            }}
            className="star-button"
            type="button"
          >
            {grade > 0 && <FullStar className="star" />}
            {grade <= 0 && <EmptyStar className="star" />}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              rateMovie(2);
            }}
            className="star-button"
            type="button"
          >
            {grade > 1 && <FullStar className="star" />}
            {grade <= 1 && <EmptyStar className="star" />}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              rateMovie(3);
            }}
            className="star-button"
            type="button"
          >
            {grade > 2 && <FullStar className="star" />}
            {grade <= 2 && <EmptyStar className="star" />}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              rateMovie(4);
            }}
            className="star-button"
            type="button"
          >
            {grade > 3 && <FullStar className="star" />}
            {grade <= 3 && <EmptyStar className="star" />}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              rateMovie(5);
            }}
            className="star-button"
            type="button"
          >
            {grade === 5 && <FullStar className="star" />}
            {grade < 5 && <EmptyStar className="star" />}
          </button>
        </div>
      </div>
    </div>
  );
};
