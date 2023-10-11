import React, { useEffect, useState } from "react";
import { Pagination } from "@mantine/core";

import { MovieCard } from "../../components/movieCard/movieCard";
import { EmptyPage } from "../../components/emtpyPage/emptyPage";
import { getFavorite } from "../../Api/fetches";
import { Loader } from "../../components/loader";

import { deleteMovie } from "../../Api/fetches";

import "./favoritePage.css";

export const FavoritePage = ({ windowDimenion }) => {
  const [favoritePosts, setFavoritePosts] = useState();
  const [refreshPosts, setRefreshPosts] = useState(true);
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const delMovie = async (defaultParams) => {
    setLoading(true);
    const result = deleteMovie(defaultParams);
    result.then((data) => {
      if (data) {
        setLoading(false);
        getFavorites();
      } else {
        setLoading(false);
        setError("фильм не удален");
      }
    });
  };

  const getFavorites = async () => {
    setLoading(true);
    const result = getFavorite();
    result.then((data) => {
      if (data) {
        setLoading(false);
        setFavoritePosts(data);
      } else {
        setLoading(false);
        setError("Попробуйте позже");
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
    if (
      JSON.parse(localStorage.getItem("favorite")).length > 0 &&
      !favoritePosts
    ) {
      getFavorites();
    }
  }, [refreshPosts]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="favoritePage">
      {error && <div className="errorSection">{error}</div>}
      {(!favoritePosts?.length ||
        JSON.parse(localStorage.getItem("favorite")).length < 1) && (
        <EmptyPage />
      )}
      <div>
        {!!favoritePosts?.length &&
          JSON.parse(localStorage.getItem("favorite")).length > 0 && (
            <div className="favoritePageMovies">
              {favoritePosts
                ?.slice((activePage - 1) * 4, activePage * 4)
                ?.map((item) => (
                  <MovieCard
                    setPage={setPage}
                    delMovie={delMovie}
                    getFavorites={getFavorites}
                    isFavorite={true}
                    setRefreshPosts={setRefreshPosts}
                    refreshPosts={refreshPosts}
                    key={item.imdbID}
                    {...item}
                  />
                ))}
            </div>
          )}
      </div>
      {!!favoritePosts?.length &&
        JSON.parse(localStorage.getItem("favorite")).length > 0 && (
          <div className="pagination">
            <Pagination
              boundaries={windowDimenion.winWidth > 768 ? 1 : 0}
              value={activePage}
              onChange={setPage}
              total={Math.ceil(favoritePosts?.length / 4)}
            />
          </div>
        )}
    </div>
  );
};
