import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaClock, FaUtensils, FaHeart, FaStar } from "react-icons/fa";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Home = () => {
  // Sample recipe data
  const latestRecipes = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      time: "25 mins",
      category: "Pasta",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      title: "Avocado Toast",
      time: "10 mins",
      category: "Breakfast",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      title: "Vegetable Curry",
      time: "40 mins",
      category: "Vegetarian",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      title: "Chocolate Cake",
      time: "60 mins",
      category: "Dessert",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const categories = [
    { name: "Breakfast", count: 45 },
    { name: "Lunch", count: 78 },
    { name: "Dinner", count: 62 },
    { name: "Dessert", count: 53 },
    { name: "Vegetarian", count: 89 },
    { name: "Vegan", count: 42 },
  ];

  return (
    <div className="App">
      {/* Banner */}
      <div className="banner-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="banner-title">Discover Delicious Recipes</h1>
              <p className="banner-subtitle">
                Find and share everyday cooking inspiration. Explore thousands
                of recipes from home cooks around the world.
              </p>
              <Link to="/recipes">
                <Button variant="primary" size="lg" className="mt-3">
                  Explore Recipes
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Delicious food"
                className="img-fluid rounded banner-image"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Latest Recipes */}
      <section className="latest-recipes py-5">
        <Container>
          <div className="section-header d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Latest Recipes</h2>
            <Button variant="outline-primary">View All</Button>
          </div>

          <Row>
            {latestRecipes.map((recipe) => (
              <Col key={recipe.id} md={3} sm={6} className="mb-4">
                <Card className="h-100 recipe-card">
                  <Card.Img variant="top" src={recipe.image} />
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <FaClock className="me-1" />
                        {recipe.time}
                      </span>
                      <span className="text-primary">
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
                    <Button variant="outline-primary" size="sm">
                      View Recipe
                    </Button>
                    <Button variant="link" className="float-end">
                      <FaHeart />
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Categories */}
      <section className="categories-section py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">Recipe Categories</h2>
          <Row>
            {categories.map((category, index) => (
              <Col key={index} md={2} sm={4} xs={6} className="mb-4">
                <div className="category-card text-center p-3 bg-white rounded shadow-sm">
                  <div
                    className="category-icon mb-2"
                    style={{ color: "#3498db" }}
                  >
                    {category.icon}
                  </div>
                  <h5 className="category-name">{category.name}</h5>
                  <p className="text-muted mb-0">{category.count} recipes</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
