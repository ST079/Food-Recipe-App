import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLayout from "./layouts/UserLayout";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import AllRecipes from "./pages/AllRecipes";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import EditRecipe from "./pages/EditRecipe";
import NotFound from "./pages/NotFound"



const App = () => {
  const [recipes, setRecipes] = React.useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipe`);
        setRecipes(res.data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, [recipes, API_URL]);

  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home recipes={recipes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/recipes"
          element={<AllRecipes recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes recipes={recipes} setRecipes={setRecipes} />} />
        <Route path="/favourites" element={<Favourites recipes={recipes} setRecipes={setRecipes} />} />
        <Route path="/user/sign-up" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />


        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
