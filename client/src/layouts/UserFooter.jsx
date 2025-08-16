import React from 'react'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
const UserFooter = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Food Recipe</h5>
              <p>Discover and share the best recipes from around the world.</p>
            </Col>
            <Col md={2}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    About
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={2}>
              <h5>Categories</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Breakfast
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Lunch
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Dinner
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Dessert
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Connect With Us</h5>
              <div className="social-icons">
                <a href="#" className="text-white me-3">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-white me-3">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-white me-3">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-white">
                  <FaPinterest size={20} />
                </a>
              </div>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Food Recipe App. All rights
              reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default UserFooter