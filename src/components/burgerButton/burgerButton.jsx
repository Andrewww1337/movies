import { useState } from "react";
import { BurgerMenu } from "../burgerMenu";

import "./burgerButton.css";

export const BurgerButton = ({
  setCataloguesValue,
  cataloguesValue,
  catalogues,
  setKeyword,
  setPage,
  getNewMovies,
}) => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div
      type="button"
      className="burgerButton"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <button
          type="button"
          className={
            menuActive
              ? "cmnToggleSwitchRot active cmnToggleSwitch"
              : "cmnToggleSwitch"
          }
          onClick={() => setMenuActive(!menuActive)}
        >
          <span>menu</span>
        </button>
      </div>

      <BurgerMenu
        getNewMovies={getNewMovies}
        setCataloguesValue={setCataloguesValue}
        cataloguesValue={cataloguesValue}
        catalogues={catalogues}
        setKeyword={setKeyword}
        setPage={setPage}
        activ={menuActive}
        setActive={setMenuActive}
      />
    </div>
  );
};
