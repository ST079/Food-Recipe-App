import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import {
  FaClock,
  FaStar,
  FaUtensils,
  FaListUl,
  FaBookOpen,
  FaRegClock,
  FaUserFriends,
  FaHeart,
  FaShareAlt,
  FaPrint,
  FaArrowLeft,
} from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/RecipeDetails.css";
import axios from "axios";

const RecipeDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = React.useState({
    title: "",
    ingredients: [""],
    instructions: [""],
    servings: 1,
    time: 0,
    category: "",
    rating: 0,
    img: "",
    notes: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      const result = await axios.get(
        `${API_URL}/recipe/${id}`
      );
      console.log(result.data.data);
      setRecipe(result.data.data);
    };
    fetchRecipe();
  }, [id, API_URL]);

  return (
    <Container className="recipe-details-container py-4">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-3 back-button"
      >
        <FaArrowLeft className="me-2" /> Back to Recipes
      </Button>

      <Card className="recipe-details-card shadow-sm">
        {/* Recipe Header */}
        <div className="recipe-header">
          <div className="recipe-image-container">
            <img
              src={
                recipe.img.startsWith("http")
                  ? recipe.img
                  : `https://food-recipe-app-server.onrender.com${recipe.img}`
              }
              alt={recipe.title}
              className="recipe-main-image"
            />
            <div className="recipe-badges">
              <Badge bg="primary" className="me-2">
                <FaUtensils className="me-1" /> {recipe.category}
              </Badge>
              <Badge bg="success">
                <FaRegClock className="me-1" /> {recipe.time}
              </Badge>
            </div>
          </div>

          <div className="recipe-title-section">
            <h1 className="recipe-title">{recipe.title}</h1>
            <div className="recipe-meta">
              <span className="me-3">
                <FaStar className="text-warning me-1" /> {recipe.rating}
              </span>
              <span className="me-3">
                <FaUserFriends className="text-primary me-1" /> Serves{" "}
                {recipe.servings}
              </span>
              <span>
                By {recipe.author} • {recipe.date}
              </span>
            </div>
          </div>
        </div>

        <Card.Body>
          {/* Recipe Description */}
          {/* <Row className="mb-4">
            <Col>
              <p className="recipe-description">{recipe.description}</p>
            </Col>
          </Row> */}

          <Row>
            {/* Left Column - Ingredients */}
            <Col lg={4} className="mb-4 mb-lg-0">
              <Card className="ingredients-card">
                <Card.Header className="d-flex align-items-center">
                  <FaListUl className="me-2" /> Ingredients
                </Card.Header>
                <ListGroup variant="flush">
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex align-items-start"
                    >
                      <span className="ingredient-checkbox me-2">□</span>
                      <span>{ingredient}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>

            {/* Right Column - Instructions */}
            <Col lg={8}>
              <Card className="instructions-card">
                <Card.Header className="d-flex align-items-center">
                  <FaBookOpen className="me-2" /> Instructions
                </Card.Header>
                <ListGroup variant="flush">
                  {recipe.instructions.map((instruction, index) => (
                    <ListGroup.Item key={index} className="d-flex">
                      <div className="step-number me-3">{index + 1}</div>
                      <div className="step-content">{instruction}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>

              {/* Recipe Notes */}
              {recipe.notes && (
                <Accordion className="mt-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <PiChefHat className="me-2" /> Chef's Notes
                    </Accordion.Header>
                    <Accordion.Body>{recipe.notes}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
            </Col>
          </Row>
        </Card.Body>

        {/* Footer Actions */}
        <Card.Footer className="recipe-actions">
          <div className="d-flex justify-content-between">
            <div>
              <Button variant="outline-primary" className="m-2">
                <FaHeart className="me-1" /> Save Recipe
              </Button>
              <Button variant="outline-secondary" className="m-2">
                <FaShareAlt className="me-1" /> Share
              </Button>
              <Button variant="outline-secondary " className="m-2">
                <FaPrint className="me-1" /> Print
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
