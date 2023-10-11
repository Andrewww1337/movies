import { SortingBar } from "../sortingBar";

import "./burgerMenu.css";

export const BurgerMenu = ({
  setCataloguesValue,
  cataloguesValue,
  catalogues,
  setKeyword,
  setPage,
  activ,
  setActive,
  getNewMovies,
}) => {
  return (
    <div
      onClick={(e) => {
        setActive(false);
      }}
      type="button"
      className={activ ? "burgerMenu active" : "burgerMenu"}
    >
      <div onClick={(e) => e.stopPropagation()} className="burgerContent">
        <SortingBar
          getNewMovies={getNewMovies}
          setCataloguesValue={setCataloguesValue}
          cataloguesValue={cataloguesValue}
          catalogues={catalogues}
          setKeyword={setKeyword}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
