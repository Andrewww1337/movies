import React from "react";

import { Pagination } from "@mantine/core";

import { SearchPanel } from "../searchPanel";
import { MovieCard } from "../movieCard/movieCard";
import { BurgerButton } from "../burgerButton";
import { EmptyPage } from "../emtpyPage/emptyPage";

import "./mainSection.css";

export const MainSection = ({
  movies,
  delMovie,
  setCataloguesValue,
  cataloguesValue,
  setKeyword,
  activePage,
  setPage,
  keyword,
  windowDimenion,
  getNewMovies,
  addNewMovies,
  catalogues,
}) => {
  return (
    <div className="mainSection">
      <div className="sortingPanel">
        {windowDimenion.winWidth < 769 && (
          <BurgerButton
            getNewMovies={getNewMovies}
            setCataloguesValue={setCataloguesValue}
            cataloguesValue={cataloguesValue}
            setKeyword={setKeyword}
            setPage={setPage}
            catalogues={catalogues}
          />
        )}
        <SearchPanel
          windowDimenion={windowDimenion}
          setKeyword={setKeyword}
          keyword={keyword}
          addNewMovies={addNewMovies}
          getNewMovies={getNewMovies}
          setPage={setPage}
        />
      </div>
      <div className="content">
        {movies?.objects?.map((item) => (
          <MovieCard
            setPage={setPage}
            key={item.imdbID}
            delMovie={delMovie}
            {...item}
          />
        ))}
        {!movies?.objects?.length && <EmptyPage mainPage={true} />}
      </div>
      {movies?.objects && (
        <Pagination
          boundaries={windowDimenion.winWidth > 768 ? 1 : 0}
          className="pagination"
          value={activePage}
          onChange={setPage}
          total={movies?.total > 500 ? 125 : Math.ceil(movies?.total / 4)}
        />
      )}
    </div>
  );
};
