import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLayout from "./layouts/UserLayout";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import Favourites from "./pages/Favourites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/recipes" element={<Recipes/>} />
        <Route path="/favourites" element={<Favourites/>} />
      </Route>
    </Routes>
  );
};

export default App;
