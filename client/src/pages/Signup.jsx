import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUtensils,
  FaSignInAlt,
  FaHeart,
  FaBook,
  FaCookieBite,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  
  return (
    <Container fluid className="signup-container">
      <Row className="align-items-center min-vh-100 g-0">
        {/* Left Side - Decorative Section */}
        <Col md={6} className="d-none d-md-block signup-hero">
          <div className="hero-content">
            <div className="hero-icon">
              <FaUtensils size={64} />
            </div>
            <h2>Join Our Recipe Community</h2>
            <p>
              Discover, create, and share delicious recipes with food
              enthusiasts worldwide
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <FaHeart className="feature-icon" />
                <span>Save your favorite recipes</span>
              </div>
              <div className="feature-item">
                <FaBook className="feature-icon" />
                <span>Create your personal cookbook</span>
              </div>
              <div className="feature-item">
                <FaCookieBite className="feature-icon" />
                <span>Get personalized recommendations</span>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side - Signup Form */}
        <Col md={6} className="py-5 px-4 px-md-5">
          <Card className="signup-card">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="signup-icon">
                  <FaUtensils size={36} />
                </div>
                <h2>Create Account</h2>
                <p className="text-muted">Start your culinary journey</p>
              </div>

              <Form>
                {/* Username Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="chef_username" />
                  </InputGroup>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="your@email.com" />
                  </InputGroup>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Create password"
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    At least 6 characters
                  </Form.Text>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                    />
                  </InputGroup>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3 signup-button"
                >
                  <FaSignInAlt className="me-2" /> Sign Up
                </Button>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account? <Link to="/user/login">Log in</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
