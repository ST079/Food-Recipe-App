import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import {
  FaUtensils,
  FaClock,
  FaListUl,
  FaBookOpen,
  FaStar,
  FaImage,
  FaPlusCircle,
} from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "../styles/AddRecipe.css";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    instructions: [""],
    time: "",
    category: "",
    rating: 0,
    image: null,
    imagePreview: null,
  });

  const categories = [
    "Breakfast",
    "Brunch",
    "Lunch",
    "Dinner",
    "Dessert",
    "Appetizer",
    "Snack",
    "Beverage",
  ];
  const navigate = useNavigate();

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
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe submitted:", recipe);
    // Here you would typically send the data to your backend
    navigate("/my-recipes"); // Redirect after submission
  };

  return (
    <Container className="add-recipe-container py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="add-recipe-card shadow-sm">
            <Card.Header className="recipe-card-header">
              <div className="d-flex align-items-center">
                <PiChefHat size={28} className="me-3" />
                <h2 className="mb-0">Create New Recipe</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Recipe Title */}
                <Form.Group className="mb-4">
                  <FloatingLabel
                    label={
                      <span>
                        <FaUtensils className="me-2" /> Recipe Title
                      </span>
                    }
                  >
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="e.g. Creamy Garlic Pasta"
                      value={recipe.title}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Row>
                  {/* Left Column - Image, Time, Category, Rating */}
                  <Col md={5}>
                    {/* Recipe Image */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-3">
                        <FaImage className="me-2" /> Recipe Image
                      </Form.Label>
                      <div className="image-upload-container">
                        {recipe.imagePreview ? (
                          <div className="image-preview">
                            <img
                              src={recipe.imagePreview}
                              alt="Recipe preview"
                              className="img-fluid rounded"
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="mt-2"
                              onClick={() =>
                                setRecipe({
                                  ...recipe,
                                  image: null,
                                  imagePreview: null,
                                })
                              }
                            >
                              Change Image
                            </Button>
                          </div>
                        ) : (
                          <div className="image-upload-placeholder">
                            <FaImage size={48} className="mb-3 text-muted" />
                            <p className="text-muted">Upload your dish photo</p>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="d-none"
                              id="recipeImage"
                            />
                            <Button
                              as="label"
                              htmlFor="recipeImage"
                              variant="outline-primary"
                            >
                              Browse Files
                            </Button>
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    {/* Preparation Time */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-2">
                        <FaClock className="me-2" /> Total Time Required
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaClock />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="time"
                          placeholder="e.g. 30 mins, 1 hour 15 mins"
                          value={recipe.time}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <Form.Text className="text-muted">
                        Include preparation + cooking time
                      </Form.Text>
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-2">
                        <FaUtensils className="me-2" /> Meal Category
                      </Form.Label>
                      <Form.Select
                        name="category"
                        value={recipe.category}
                        onChange={handleChange}
                        className="form-select-lg"
                      >
                        <option value="">Select meal category</option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* Rating */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-2">
                        <FaStar className="me-2" /> Your Rating
                      </Form.Label>
                      <div className="d-flex align-items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={24}
                            className="me-2 star-rating"
                            color={
                              star <= recipe.rating ? "#ffc107" : "#e4e5e9"
                            }
                            onClick={() =>
                              setRecipe({ ...recipe, rating: star })
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ))}
                        <span className="ms-2">
                          {recipe.rating > 0 ? (
                            <span className="text-primary">
                              {recipe.rating}{" "}
                              {recipe.rating === 1 ? "star" : "stars"}
                            </span>
                          ) : (
                            <span className="text-muted">Not rated</span>
                          )}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>

                  {/* Right Column - Ingredients and Instructions */}
                  <Col md={7}>
                    {/* Ingredients */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-3">
                        <FaListUl className="me-2" /> Ingredients List
                      </Form.Label>
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="d-flex mb-2">
                          <Form.Control
                            type="text"
                            value={ingredient}
                            onChange={(e) =>
                              handleIngredientChange(index, e.target.value)
                            }
                            placeholder={`e.g. 2 cups flour, 1 tbsp sugar`}
                          />
                          {recipe.ingredients.length > 1 && (
                            <Button
                              variant="outline-danger"
                              className="ms-2"
                              onClick={() => removeIngredient(index)}
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2"
                        onClick={addIngredient}
                      >
                        <FaPlusCircle className="me-1" /> Add Another Ingredient
                      </Button>
                    </Form.Group>

                    {/* Instructions */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-3">
                        <FaBookOpen className="me-2" /> Cooking Instructions
                      </Form.Label>
                      {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex align-items-start mb-1">
                            <span className="step-number me-2 mt-1">
                              {index + 1}.
                            </span>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              value={instruction}
                              onChange={(e) =>
                                handleInstructionChange(index, e.target.value)
                              }
                              placeholder={`Describe step ${
                                index + 1
                              } in detail`}
                            />
                            {recipe.instructions.length > 1 && (
                              <Button
                                variant="outline-danger"
                                className="ms-2"
                                onClick={() => removeInstruction(index)}
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2"
                        onClick={addInstruction}
                      >
                        <FaPlusCircle className="me-1" /> Add Another Step
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <Button variant="primary" type="submit" size="lg">
                    <PiChefHat className="me-2" /> Save Recipe
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
