import React from "react";
import { Button, Input } from "@mantine/core";

import { ReactComponent as Search } from "../../img/Search.svg";

import "./searchPanel.css";

export const SearchPanel = ({
  setKeyword,
  keyword,
  setPage,
  windowDimenion,
  getNewMovies,
  addNewMovies,
}) => {
  return (
    <div className="searchPanel">
      <Input
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword ? keyword : ""}
        className="searchInput"
        icon={<Search size="1rem" />}
        placeholder={
          windowDimenion.winWidth > 500
            ? "Введите название фильма на английском"
            : "Поиск"
        }
        styles={{ rightSection: { marginRight: "12px", width: "180px" } }}
        rightSection={
          <div className="seachButtonSection">
            <Button
              onClick={async () => {
                setPage(1);
                addNewMovies();
                setKeyword("");
              }}
              className="searchButton"
            >
              Добавить
            </Button>
            <Button
              onClick={async () => {
                getNewMovies();
                setPage(1);
              }}
              className="searchButton"
            >
              Поиск
            </Button>
          </div>
        }
      />
    </div>
  );
};
