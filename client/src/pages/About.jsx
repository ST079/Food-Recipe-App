import React from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import {
  FaUtensils,
  FaUsers,
  FaHeart,
  FaAward,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/About.css";

const About = () => {
  return (
    <Container className="about-section py-5">
      {/* Page Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="text-center display-4 mb-3">About Our Recipe App</h1>
          <p className="text-center lead text-muted">
            Discover the story behind our passion for food and sharing recipes
          </p>
        </Col>
      </Row>

      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} className="mb-4">
          <Card className="sidebar-nav">
            <Card.Body>
              <Nav defaultActiveKey="#our-story" className="flex-column">
                <Nav.Link
                  href="#our-story"
                  className="d-flex align-items-center py-2"
                >
                  Our Story
                </Nav.Link>
                <Nav.Link
                  href="#our-mission"
                  className="d-flex align-items-center py-2"
                >
                  <FaHeart className="me-2" /> Our Mission
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          {/* Our Story Section */}
          <section id="our-story" className="mb-5">
            <h2 className="mb-4 d-flex align-items-center">Our Story</h2>
            <Row>
              <Col md={6}>
                <p>
                  Founded in 2025, our recipe app began as a small passion
                  project between friends who loved to cook. What started as a
                  simple way to share family recipes has grown into a thriving
                  community of food enthusiasts from around the world.
                </p>
                <p>
                  We believe that great food brings people together, and our
                  mission is to make cooking accessible to everyone, regardless
                  of their skill level in the kitchen.
                </p>
              </Col>
              <Col md={6}>
                <img
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Cooking together"
                  className="img-fluid rounded shadow"
                />
              </Col>
            </Row>
          </section>

          {/* Our Mission Section */}
          <section id="our-mission" className="mb-5 py-4 bg-light rounded px-3">
            <h2 className="mb-4 d-flex align-items-center">
              <FaHeart className="me-3 text-danger" /> Our Mission
            </h2>
            <Row>
              <Col>
                <p className="lead">
                  To inspire and empower home cooks through delicious, tested
                  recipes and cooking education.
                </p>
                <div className="d-flex align-items-center mb-3">
                  <FaUtensils className="me-3 text-primary" />
                  <div>
                    <h5>Quality Recipes</h5>
                    <p className="mb-0">
                      Every recipe is tested multiple times to ensure perfect
                      results
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaUsers className="me-3 text-primary" />
                  <div>
                    <h5>Community Focused</h5>
                    <p className="mb-0">
                      We value our community's feedback and recipe contributions
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaAward className="me-3 text-primary" />
                  <div>
                    <h5>Education</h5>
                    <p className="mb-0">
                      Helping cooks of all levels improve their skills
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
