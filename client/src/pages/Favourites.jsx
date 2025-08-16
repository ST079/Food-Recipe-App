import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import {
  FaHeart,
  FaClock,
  FaUtensils,
  FaStar,
  FaRegSadTear,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "../styles/Recipes.css";

const Favorites = ({ recipes }) => {
  // Get favorite recipes
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <Container className="favorites-page py-5">
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 mb-3 d-flex align-items-center">
            <FaHeart className="me-3 text-danger" /> Favorite Recipes
          </h1>
          <p className="lead text-muted">Your saved recipes for quick access</p>
        </Col>
      </Row>

      {/* Favorites Grid */}
      <Row className="g-4">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <Col key={recipe.id} lg={3} md={6}>
              <Card className="h-100 recipe-card">
                <div className="favorite-icon">
                  <FaHeart className="text-danger" />
                </div>
                <Card.Img
                  variant="top"
                  src={recipe.image}
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
                    to={`/recipe/${recipe.id}`}
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
            <Alert variant="info" className="d-inline-flex align-items-center">
              <FaRegSadTear size={24} className="me-3" />
              <div>
                <h4>No favorite recipes yet</h4>
                <p className="mb-0">
                  Browse recipes and add some to your favorites!
                </p>
              </div>
            </Alert>
            <br />
            <Button as={Link} to="/recipes" variant="primary" className="mt-3">
              Browse Recipes
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
