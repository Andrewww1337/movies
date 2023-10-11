import React, { useState, useEffect } from "react";

import { SortingBar } from "../../components/sortingBar";
import { MainSection } from "../../components/mainSection";
import { Loader } from "../../components/loader";

import {
  getGenres,
  getMovies,
  addMovies,
  deleteMovie,
} from "../../Api/fetches";

import "./searchMoviePage.css";

export const SearchMoviePage = ({ windowDimenion }) => {
  const [cataloguesValue, setCataloguesValue] = useState("");
  const [keyword, setKeyword] = useState(null);
  const [catalogues, setCatalogues] = useState([]);
  const [movies, setMovies] = useState([]);
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParams = {
    keyword: keyword && `${keyword}`,
    catalogues: cataloguesValue && `${cataloguesValue}`,
    page: `${activePage - 1}`,
  };

  const getMoviesGenres = async () => {
    const result = await getGenres();
    setCatalogues(result);
  };

  const getNewMovies = async (defaultParams) => {
    setLoading(true);
    const result = getMovies(defaultParams ? defaultParams : searchParams);
    result.then((data) => {
      if (data) {
        setLoading(false);
        setMovies(data);
      } else {
        setLoading(false);
        setError("Попробуйте позже");
      }
    });
  };

  const addNewMovies = async () => {
    setLoading(true);

    if (searchParams?.keyword?.length > 0) {
      const result = addMovies(searchParams);
      result.then((data) => {
        setLoading(false);
        if (data) {
          setLoading(false);
          setMovies(data);
        } else {
          setLoading(false);
          setError("фильм не добавлен");
        }
      });
    } else {
      setError("Слишком короткое название");
      setLoading(false);
    }
  };

  const delMovie = async (defaultParams) => {
    setLoading(true);
    const result = deleteMovie(defaultParams);
    result.then((data) => {
      if (data) {
        setLoading(false);
        setMovies(data);
      } else {
        setLoading(false);
        setError("фильм не удален");
      }
    });
  };

  useEffect(() => {
    if (error) {
      setTimeout(function () {
        setError("");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    getMoviesGenres();
    getNewMovies();
  }, [activePage]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="searchMoviePage">
      {error && <div className="errorSection">{error}</div>}
      <div className="searchMovieSection">
        {windowDimenion.winWidth > 768 && (
          <SortingBar
            addNewMovies={addNewMovies}
            getNewMovies={getNewMovies}
            setCataloguesValue={setCataloguesValue}
            cataloguesValue={cataloguesValue}
            catalogues={catalogues}
            setKeyword={setKeyword}
            setPage={setPage}
          />
        )}
        <MainSection
          delMovie={delMovie}
          addNewMovies={addNewMovies}
          getNewMovies={getNewMovies}
          windowDimenion={windowDimenion}
          setCataloguesValue={setCataloguesValue}
          cataloguesValue={cataloguesValue}
          keyword={keyword}
          setKeyword={setKeyword}
          activePage={activePage}
          setPage={setPage}
          movies={movies}
          catalogues={catalogues}
        />
      </div>
    </div>
  );
};
