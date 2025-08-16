import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLayout from "./layouts/UserLayout";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import AllRecipes from "./pages/AllRecipes";
import axios from "axios";
const App = () => {
  const [recipes, setRecipes] = React.useState([]);
  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/recipe");
        setRecipes(res.data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home recipes={recipes} />}/>
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<AllRecipes recipes={recipes} setRecipes={setRecipes}/>} />
        <Route path="/favourites" element={<Favourites recipes={recipes} />} />
      </Route>
    </Routes>
  );
};

export default App;
