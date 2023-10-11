import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout";
import { MainPage } from "./pages/mainPage/mainPage";

import "./App.css";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("favorite")) {
      localStorage.setItem("favorite", "[]");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/movie/search" />} />
          <Route path="movie/:type" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
