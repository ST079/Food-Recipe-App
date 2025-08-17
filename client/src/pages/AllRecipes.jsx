import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaUtensils,
  FaFilter,
  FaStar,
} from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { GiCook } from "react-icons/gi";
import { Link } from "react-router-dom";
import "../styles/Recipes.css";
import axios from "axios";
import { useEffect } from "react";

const AllRecipes = ({recipes,setRecipes}) => {

 

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePage, setActivePage] = useState(1);
  const recipesPerPage = 8;

  // Get unique categories
  const categories = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.category)),
  ];

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe._id === id
          ? { ...recipe, isFavorite: !recipe.isFavorite }
          : recipe
      )
    );
  };

  // Filter recipes based on search and category
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastRecipe = activePage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <Container className="recipes-page py-5">
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 mb-3 d-flex align-items-center">
            <GiCook className="me-3 text-primary" /> All Recipes
          </h1>
          <p className="lead text-muted">
            Browse our collection of delicious recipes
          </p>
        </Col>
      </Row>

      {/* Search and Filter */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
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
        <Col>
          <Button
            as={Link}
            to="/add-recipe"
            variant="primary"
          >
            <BiSolidBookAdd className="me-2" />
            Add New Recipe
          </Button>
        </Col>
      </Row>

      {/* Recipes Grid */}
      <Row className="g-4">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe) => (
            <Col key={recipe._id} lg={3} md={6}>
              <Card className="h-100 recipe-card">
                <div
                  className="favorite-icon"
                  onClick={() => toggleFavorite(recipe._id)}
                >
                  {recipe.isFavorite ? (
                    <FaHeart className="text-danger" />
                  ) : (
                    <FaRegHeart className="text-muted" />
                  )}
                </div>
                <Card.Img
                  variant="top"
                  src={recipe.img}
                  className="recipe-image"
                />
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">
                      <FaClock className="me-1" />
                      {recipe.time}
                    </span>
                    <span className="text-warning">
                      <FaStar className="me-1" />
                      {recipe.rating}
                    </span>
                  </div>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text className="text-muted">
                    <FaUtensils className="me-1" />
                    {recipe.category}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-0">
                  <Button
                    as={Link}
                    to={`/recipes/${recipe._id}`}
                    variant="outline-primary"
                    size="sm"
                  >
                    View Recipe
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <h4>No recipes found</h4>
            <p>Try adjusting your search or filter criteria</p>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {filteredRecipes.length > recipesPerPage && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center ">
            <Pagination >
              <Pagination.Prev
                disabled={activePage === 1}
                onClick={() => setActivePage(activePage - 1)}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === activePage}
                  onClick={() => setActivePage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={activePage === totalPages}
                onClick={() => setActivePage(activePage + 1)}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AllRecipes;
