import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  FloatingLabel,
  ListGroup,
  Accordion,
  Badge,
} from "react-bootstrap";
import {
  FaClock,
  FaStar,
  FaUtensils,
  FaListUl,
  FaBookOpen,
  FaRegClock,
  FaUserFriends,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample recipe data - in a real app, you'd fetch this based on the ID
  const [recipe, setRecipe] = useState({
    id: 1,
    title: "Creamy Garlic Pasta",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    time: "25 mins",
    servings: "2-3",
    category: "Dinner",
    rating: 4,
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
  });

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Appetizer",
    "Snack",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const removeInstruction = (index) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipe({
          ...recipe,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe updated:", recipe);
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Container className="edit-recipe-container py-4">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)}
        className="mb-3 back-button"
      >
        <FaArrowLeft className="me-2" /> Back to Recipe
      </Button>

      <Card className="edit-recipe-card shadow-sm">
        {/* Recipe Header */}
        <div className="recipe-header">
          <div className="recipe-image-container">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-main-image"
            />
            <div className="image-upload-overlay">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="d-none"
                id="recipeImageUpload"
              />
              <Button
                as="label"
                htmlFor="recipeImageUpload"
                variant="outline-light"
                className="change-image-btn"
              >
                Change Image
              </Button>
            </div>
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
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                className="recipe-title-input"
              />
            </Form.Group>
            <div className="recipe-meta">
              <InputGroup className="mb-2 me-3" style={{ width: "120px" }}>
                <InputGroup.Text>
                  <FaStar />
                </InputGroup.Text>
                <Form.Select
                  name="rating"
                  value={recipe.rating}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>

              <InputGroup className="mb-2" style={{ width: "150px" }}>
                <InputGroup.Text>
                  <FaUserFriends />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="servings"
                  value={recipe.servings}
                  onChange={handleChange}
                  placeholder="Servings"
                />
              </InputGroup>
            </div>
          </div>
        </div>

        <Card.Body>
          {/* Recipe Description */}
          <Row className="mb-4">
            <Col>
              <FloatingLabel label="Recipe Description">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            {/* Left Column - Ingredients */}
            <Col lg={4} className="mb-4 mb-lg-0">
              <Card className="ingredients-card">
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <span>
                    <FaListUl className="me-2" /> Ingredients
                  </span>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={addIngredient}
                  >
                    <FaPlus />
                  </Button>
                </Card.Header>
                <ListGroup variant="flush">
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex align-items-start"
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="me-2"
                        onClick={() => removeIngredient(index)}
                        disabled={recipe.ingredients.length <= 1}
                      >
                        <FaTrash size={12} />
                      </Button>
                      <Form.Control
                        type="text"
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value)
                        }
                        placeholder={`Ingredient ${index + 1}`}
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>

            {/* Right Column - Instructions */}
            <Col lg={8}>
              <Card className="instructions-card">
                <Card.Header className="d-flex align-items-center justify-content-between">
                  <span>
                    <FaBookOpen className="me-2" /> Instructions
                  </span>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={addInstruction}
                  >
                    <FaPlus />
                  </Button>
                </Card.Header>
                <ListGroup variant="flush">
                  {recipe.instructions.map((instruction, index) => (
                    <ListGroup.Item key={index} className="d-flex mb-2">
                      <div className="step-number me-3">{index + 1}</div>
                      <div className="flex-grow-1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={instruction}
                          onChange={(e) =>
                            handleInstructionChange(index, e.target.value)
                          }
                          placeholder={`Step ${index + 1}`}
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mt-2"
                          onClick={() => removeInstruction(index)}
                          disabled={recipe.instructions.length <= 1}
                        >
                          <FaTrash className="me-1" /> Remove Step
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>

              {/* Recipe Notes */}
              <Accordion className="mt-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <PiChefHat className="me-2" /> Chef's Notes
                  </Accordion.Header>
                  <Accordion.Body>
                    <FloatingLabel label="Additional notes or tips">
                      <Form.Control
                        as="textarea"
                        name="notes"
                        value={recipe.notes}
                        onChange={(e) =>
                          setRecipe({ ...recipe, notes: e.target.value })
                        }
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Card.Body>

        {/* Footer Actions */}
        <Card.Footer className="edit-actions">
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-danger"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              <FaSave className="me-2" /> Save Changes
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default EditRecipe;
