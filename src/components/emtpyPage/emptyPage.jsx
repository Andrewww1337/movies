import React from "react";
import { Link } from "react-router-dom";

import "./emptyPage.css";

export const EmptyPage = ({ mainPage }) => {
  return (
    <div className={`emptyPage ${mainPage ? "ForMain" : "ForFavorite"}`}>
      <h3 className="emptyTitle">{`${
        mainPage
          ? "Упс, тут пусто. Добавь фильм по название на английском!"
          : "Упс, здесь еще ничего нет!"
      }`}</h3>
      <Link
        to={`${mainPage ? "/movie/favorite/" : "/movie/search/"}`}
        className="linkOutEmptyPage"
      >
        {`${mainPage ? "Смотрел" : "Поиск фильма"}`}
      </Link>
    </div>
  );
};
