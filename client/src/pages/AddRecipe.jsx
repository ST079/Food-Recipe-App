import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  FloatingLabel,
  InputGroup,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import {
  FaUtensils,
  FaClock,
  FaListUl,
  FaBookOpen,
  FaStar,
  FaImage,
  FaPlus,
  FaTrash,
  FaUserFriends,
} from "react-icons/fa";
import { PiChefHat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "../styles/AddRecipe.css";
import axios from "axios";
import RecipeNotification from "../components/RecipeNotification";
import { useRef } from "react";

const AddRecipe = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const[showSuccessNotification, setShowSuccessNotification] = useState("");
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [""],
    author: "",
    instructions: [""],
    servings: 2,
    time: 30,
    category: "",
    rating: 0,
    img: "",
    notes: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Appetizer",
    "Snack",
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((pre) => ({ ...pre, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: parseInt(value) || 0 });
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
      setRecipe({ ...recipe, img: file }); // store file in state
      setImagePreview(URL.createObjectURL(file)); // show preview
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append simple fields
      formData.append("title", recipe.title);
      formData.append("author", localStorage.getItem("user") || "Anonymous");
      formData.append("servings", recipe.servings.toString());
      formData.append("time", recipe.time.toString());
      formData.append("category", recipe.category);
      formData.append("rating", recipe.rating.toString());
      if (recipe.notes) formData.append("notes", recipe.notes);

      // Append arrays properly
      recipe.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient);
      });

      recipe.instructions.forEach((instruction, index) => {
        formData.append(`instructions[${index}]`, instruction);
      });

      // Append image if it exists
      if (recipe.img instanceof File) {
        formData.append("img", recipe.img);
      } 

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const { data } = await axios.post(
        `${API_URL}/recipe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Recipe added successfully:", data);
      setShowSuccessNotification(true);
      setTimeout(() => {
      navigate(`/recipes/${data.data._id}`);
      }, 2000);

    } catch (error) {
      console.error("Error adding recipe:", {
        message: error.message,
        response: error.response?.data,
      });
    }
  };
  return (
    <Container className="add-recipe-container">
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="add-recipe-card">
            <Card.Header className="recipe-card-header">
              <div className="d-flex align-items-center">
                <PiChefHat size={28} className="me-3" />
                <h2 className="display-4 mb-0">Share Your Recipe</h2>
              </div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} id="recipe-form">
                {/* Basic Information */}
                <Row className="mb-4">
                  <Col md={12}>
                    <FloatingLabel label="Recipe Title" className="mb-3">
                      <Form.Control
                        type="text"
                        name="title"
                        id="title"
                        value={recipe.title}
                        onChange={handleChange}
                        placeholder="e.g. Creamy Garlic Pasta"
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row>
                  {/* Left Column - Image, Servings, Time, Category */}
                  <Col md={5}>
                    {/* Recipe Image */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center mb-3">
                        <FaImage className="me-2" /> Recipe Image
                      </Form.Label>
                      <div className="image-upload-container">
                        {imagePreview ? (
                          <div className="image-preview">
                            <img
                              src={imagePreview}
                              alt="Recipe preview"
                              className="img-fluid rounded"
                            />
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setImagePreview(null);
                                setRecipe({ ...recipe, img: "" });
                              }}
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div className="image-upload-placeholder">
                            <FaImage size={48} className="mb-3 text-muted" />
                            <p className="text-muted">Upload your dish photo</p>
                            <Form.Control
                              type="file"
                              name="img"
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
                              Select Image
                            </Button>
                          </div>
                        )}
                      </div>
                    </Form.Group>

                    {/* Servings */}
                    <Form.Group className="mb-4">
                      <FloatingLabel label="Servings">
                        <Form.Control
                          type="number"
                          name="servings"
                          id="servings"
                          min="1"
                          value={recipe.servings}
                          onChange={handleNumberChange}
                          required
                        />
                      </FloatingLabel>
                    </Form.Group>

                    {/* Preparation Time */}
                    <Form.Group className="mb-4">
                      <FloatingLabel label="Preparation Time (minutes)">
                        <Form.Control
                          type="number"
                          name="time"
                          id="time"
                          min="1"
                          value={recipe.time}
                          onChange={handleNumberChange}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-4">
                      <FloatingLabel label="Category">
                        <Form.Select
                          name="category"
                          id="category"
                          value={recipe.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
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
                      <Form.Label className="d-flex align-items-center justify-content-between mb-3">
                        <span>
                          <FaListUl className="me-2" /> Ingredients
                        </span>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={addIngredient}
                        >
                          <FaPlus className="me-1" /> Add
                        </Button>
                      </Form.Label>
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="d-flex mb-2">
                          <Form.Control
                            type="text"
                            name="ingredients"
                            id="ingredients"
                            value={ingredient}
                            onChange={(e) =>
                              handleIngredientChange(index, e.target.value)
                            }
                            placeholder={`Ingredient ${index + 1}`}
                            required
                          />
                          {recipe.ingredients.length > 1 && (
                            <Button
                              variant="outline-danger"
                              className="ms-2"
                              onClick={() => removeIngredient(index)}
                            >
                              <FaTrash />
                            </Button>
                          )}
                        </div>
                      ))}
                    </Form.Group>

                    {/* Instructions */}
                    <Form.Group className="mb-4">
                      <Form.Label className="d-flex align-items-center justify-content-between mb-3">
                        <span>
                          <FaBookOpen className="me-2" /> Instructions
                        </span>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={addInstruction}
                        >
                          <FaPlus className="me-1" /> Add Step
                        </Button>
                      </Form.Label>
                      {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="mb-3">
                          <div className="d-flex align-items-start mb-1">
                            <span className="step-number me-2 mt-1">
                              {index + 1}.
                            </span>
                            <Form.Control
                              as="textarea"
                              name="instructions"
                              id="instructions"
                              rows={3}
                              value={instruction}
                              onChange={(e) =>
                                handleInstructionChange(index, e.target.value)
                              }
                              placeholder={`Describe step ${index + 1}`}
                              required
                            />
                            {recipe.instructions.length > 1 && (
                              <Button
                                variant="outline-danger"
                                className="ms-2"
                                onClick={() => removeInstruction(index)}
                              >
                                <FaTrash />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </Form.Group>

                    {/* Notes */}
                    <Form.Group className="mb-4">
                      <FloatingLabel label="Additional Notes (Optional)">
                        <Form.Control
                          as="textarea"
                          name="notes"
                          id="notes"
                          value={recipe.notes}
                          onChange={handleChange}
                          style={{ height: "100px" }}
                          placeholder="Any special tips or variations..."
                        />
                      </FloatingLabel>
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
      <RecipeNotification
        type="success"
        message={`Your recipe "${recipe.title}" has been added successfully!`}
        show={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
      />
      ;
    </Container>
  );
};

export default AddRecipe;
