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

const MyRecipes = () => {
  // Sample recipe data
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      time: "25 mins",
      category: "Dinner",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      lastEdited: "2023-05-15",
    },
    {
      id: 2,
      title: "Avocado Toast",
      time: "10 mins",
      category: "Breakfast",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      lastEdited: "2023-06-20",
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      time: "45 mins",
      category: "Dessert",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      lastEdited: "2023-04-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.lastEdited) - new Date(a.lastEdited);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "time") {
      return parseInt(a.time) - parseInt(b.time);
    }
    return 0;
  });

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
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
                  <Col md={3}>
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
                  <Col md={3}>
                    <Button as={Link} to="/add-recipe" variant="primary">
                      <BiSolidBookAdd className="me-2" />
                      Add New Recipe
                    </Button>
                  </Col>
                </Row>
              </div>

              {/* Recipe Grid */}
              {sortedRecipes.length > 0 ? (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {sortedRecipes.map((recipe) => (
                    <Col key={recipe.id}>
                      <Card className="recipe-card h-100">
                        <div className="recipe-image-container">
                          <Card.Img
                            variant="top"
                            src={recipe.image}
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
                              to={`/edit-recipe/${recipe.id}`}
                              variant="outline-primary"
                              size="sm"
                            >
                              <FaEdit className="me-1" /> Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteRecipe(recipe.id)}
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
    </Container>
  );
};

export default MyRecipes;
