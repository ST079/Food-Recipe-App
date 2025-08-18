import React from "react";
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

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample recipe data - in a real app, you'd fetch this based on the ID
  const recipe = {
    id: 1,
    title: "Creamy Garlic Pasta",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    time: "25 mins",
    servings: "2-3",
    category: "Dinner",
    rating: 4.5,
    author: "Chef Maria",
    date: "May 15, 2023",
    description:
      "A delicious creamy garlic pasta that comes together in just 25 minutes. Perfect for a quick weeknight dinner that feels special enough for company.",
    ingredients: [
      "8 oz fettuccine pasta",
      "3 tbsp unsalted butter",
      "4 garlic cloves, minced",
      "1 cup heavy cream",
      "1/2 cup grated parmesan cheese",
      "1/4 tsp salt",
      "1/4 tsp black pepper",
      "2 tbsp chopped fresh parsley",
    ],
    instructions: [
      "Cook pasta according to package instructions in salted water. Reserve 1/2 cup pasta water before draining.",
      "In a large skillet, melt butter over medium heat. Add garlic and sauté for 1 minute until fragrant.",
      "Pour in heavy cream and bring to a simmer. Cook for 3-4 minutes until slightly thickened.",
      "Stir in parmesan cheese until melted and smooth. Season with salt and pepper.",
      "Add drained pasta to the sauce, tossing to coat. Add reserved pasta water as needed to reach desired consistency.",
      "Garnish with chopped parsley and serve immediately.",
    ],
    notes:
      "For extra protein, add cooked chicken or shrimp. The sauce thickens as it cools, so serve immediately.",
  };

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
              src={recipe.image}
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
          <Row className="mb-4">
            <Col>
              <p className="recipe-description">{recipe.description}</p>
            </Col>
          </Row>

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
