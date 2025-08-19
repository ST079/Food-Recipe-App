import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { FaUtensils, FaSearch, FaHome } from "react-icons/fa";
import { PiCookingPotBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <Container fluid className="not-found-container">
      <Row className="align-items-center min-vh-100">
        <Col md={6} className="text-center text-md-start mb-5 mb-md-0">
          <div className="error-content">
            <h1 className="error-code">
              4<PiCookingPotBold className="error-icon" />4
            </h1>
            <h2 className="error-title">Recipe Not Found!</h2>
            <p className="error-message">
              Oops! The page you're looking for has either been moved, deleted, or never existed.
              Maybe the chef took it off the menu?
            </p>
            <div className="error-actions mt-4 d-flex flex-column gap-3">
              <Button as={Link} to="/" variant="primary" className="me-3">
                <FaHome className="me-2" /> Back to Home
              </Button>
              <Button as={Link} to="/recipes" variant="outline-primary">
                <FaUtensils className="me-2" /> Browse Recipes
              </Button>
            </div>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <div className="error-image">
            <div className="chef-hat">
              <div className="hat-top"></div>
              <div className="hat-brim"></div>
            </div>
            <div className="plate">
              <div className="food">
                <div className="noodle"></div>
                <div className="noodle"></div>
                <div className="noodle"></div>
                <div className="vegetable carrot"></div>
                <div className="vegetable broccoli"></div>
              </div>
              <div className="plate-bottom"></div>
            </div>
            <div className="search-icon">
              <FaSearch size={24} />
            </div>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;