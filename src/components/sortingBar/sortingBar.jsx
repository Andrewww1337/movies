import React, { useState } from "react";
import { ReactComponent as Cross } from "../../img/Cross.svg";
import { ReactComponent as ChevronDown } from "../../img/chevronDown.svg";
import { ReactComponent as ChevronUp } from "../../img/chevronUp.svg";

import { Select, Button } from "@mantine/core";

import "./sortingBar.css";

export const SortingBar = ({
  setCataloguesValue,
  cataloguesValue,
  catalogues,

  setKeyword,
  setPage,
  getNewMovies,
}) => {
  const [movieStateIsOpen, setMovieStateIsOpen] = useState(false);

  return (
    <div className="sortingBar">
      <div className="sortingHeader">
        <h3 className="sortingTitle">Фильтр</h3>
        <button
          onClick={() => {
            setKeyword("");
            setCataloguesValue("");
            setPage(1);
            getNewMovies({
              keyword: "",
              catalogues: "",
              page: 0,
            });
          }}
          className="resetFilterButton"
        >
          <span>Сбросить</span>
          <Cross className="crossButton" />
        </button>
      </div>
      {catalogues && (
        <div className="selectGenre">
          <Select
            onChange={setCataloguesValue}
            label="Жанр"
            value={cataloguesValue}
            placeholder="Выберете жанр"
            rightSection={
              movieStateIsOpen ? (
                <ChevronUp className="chevron" size="1rem" />
              ) : (
                <ChevronDown className="chevron" size="1rem" />
              )
            }
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none", margin: "5px" } }}
            data={catalogues?.map((item) => ({
              label: `${item?.title?.substr(0, 23)} ${
                item?.title?.length > 23 ? "..." : ""
              }`,
              value: item?.key,
            }))}
            onDropdownClose={() => {
              setMovieStateIsOpen(false);
            }}
            onDropdownOpen={() => {
              setMovieStateIsOpen(true);
            }}
          />
        </div>
      )}

      <div>
        <Button
          onClick={() => {
            getNewMovies();
            setPage(1);
          }}
          className="submitFilterButton"
        >
          Применить
        </Button>
      </div>
    </div>
  );
};
