import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Dropdown,
  Badge,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaClock,
  FaStar,
  FaUtensils,
} from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { BiSolidBookAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../styles/MyRecipes.css";
import axios from "axios";
import RecipeNotification from "../components/RecipeNotification";

const MyRecipes = ({ recipes, setRecipes }) => {
  const API_URL = import.meta.env.VITE_API_URL;
   const[showDeleteNotification, setShowDeleteNotification] = useState("");
  const MyRecipes = recipes.filter(
    (recipe) => recipe.author === localStorage.getItem("user")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  const filteredRecipes = MyRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const deleteRecipe = async (id) => {
    await axios.delete(`${API_URL}/recipe/${id}`);
    setRecipes(recipes.filter((recipe) => recipe._id !== id));
    setShowDeleteNotification(true);
  };

  return (
    <Container className="my-recipes-container py-6">
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="my-recipes-card">
            <Card.Header className="my-recipes-header">
              <div className="d-flex align-items-center">
                <PiChefHat size={28} className="me-3" />
                <h1 className="mb-0 display-4 ">My Recipes</h1>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Search and Filter Bar */}
              <div className="search-filter-bar mb-4">
                <Row className="g-3">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search your recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={`${recipes.length > 0 ? 3 : 6}`}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaFilter />
                      </InputGroup.Text>
                      <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  {MyRecipes.length > 0 && (
                    <Col md={3}>
                      <Button as={Link} to="/add-recipe" variant="primary">
                        <BiSolidBookAdd className="me-2" />
                        Add New Recipe
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Recipe Grid */}
              {filteredRecipes.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredRecipes.map((recipe) => (
                    <Col key={recipe._id}>
                      <Card className="recipe-card h-100">
                        <div className="recipe-image-container">
                          <Card.Img
                            variant="top"
                            src={
                              recipe.img.startsWith("http")
                                ? recipe.img
                                : `http://localhost:3000${recipe.img}`
                            }
                            className="recipe-image"
                          />
                          <Badge bg="primary" className="recipe-category">
                            {recipe.category}
                          </Badge>
                        </div>
                        <Card.Body>
                          <Card.Title>{recipe.title}</Card.Title>
                          <div className="recipe-meta d-flex justify-content-between mb-3">
                            <span className="text-muted">
                              <FaClock className="me-1" /> {recipe.time}
                            </span>
                            <span className="text-warning">
                              <FaStar className="me-1" /> {recipe.rating}
                            </span>
                          </div>
                          <div className="recipe-actions d-flex justify-content-between">
                            <Button
                              as={Link}
                              to={`/edit-recipe/${recipe._id}`}
                              variant="outline-primary"
                              size="sm"
                            >
                              <FaEdit className="me-1" /> Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteRecipe(recipe._id)}
                            >
                              <FaTrash className="me-1" /> Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5">
                  <h4>No recipes found</h4>
                  <p className="text-muted">
                    {searchTerm
                      ? "Try a different search term"
                      : "You haven't created any recipes yet"}
                  </p>
                  <Button
                    as={Link}
                    to="/add-recipe"
                    variant="primary"
                    className="mt-3"
                  >
                    <PiChefHat className="me-2" /> Create Your First Recipe
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <RecipeNotification
        type="delete"
        message={`Your recipe has been permanently deleted.`}
        show={showDeleteNotification}
        onClose={() => setShowDeleteNotification(false)}
        autoCloseDuration={4000} // Optional: customize auto-close time
      />
    </Container>
  );
};

export default MyRecipes;
