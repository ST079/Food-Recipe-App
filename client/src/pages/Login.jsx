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
  FaLock,
  FaUtensils,
  FaSignInAlt,
  FaHeart,
  FaBook,
  FaCookieBite,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const isSuccess = await axios
      .post("http://localhost:3000/api/v1/user/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          setError("");
        }, 3000);
        navigate("/");
      });
      
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container fluid className="login-container">
      <Row className="align-items-center min-vh-100 g-0">
        {/* Left Side - Decorative Section */}
        <Col md={6} className="d-none d-md-block login-hero">
          <div className="hero-content">
            <div className="hero-icon">
              <FaUtensils size={64} />
            </div>
            <h2>Welcome Back!</h2>
            <p>
              Continue your culinary journey with thousands of delicious recipes
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <FaHeart className="feature-icon" />
                <span>Access your saved recipes</span>
              </div>
              <div className="feature-item">
                <FaBook className="feature-icon" />
                <span>Manage your personal cookbook</span>
              </div>
              <div className="feature-item">
                <FaCookieBite className="feature-icon" />
                <span>Discover new recommendations</span>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side - Login Form */}
        <Col md={6} className="py-5 px-4 px-md-5">
          <Card className="login-card">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="login-icon">
                  <FaUtensils size={36} />
                </div>
                <h2>Welcome Back</h2>
                <p className="text-muted">Sign in to continue</p>
              </div>

              <Form onSubmit={handelSubmit}>
                {/* Email/Username Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Email </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <div className="d-flex justify-content-end mt-2">
                    <Link to="/forgot-password" className="text-muted small">
                      Forgot password?
                    </Link>
                  </div>
                </Form.Group>
                {error && (
                  <p className="text-danger text-center fw-bold">{error}</p>
                )}
                {/* Submit Button */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3 login-button"
                >
                  <FaSignInAlt className="me-2" /> Sign In
                </Button>

                {/* Signup Link */}
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/user/sign-up">Sign up</Link>
                  </p>
                </div>

                {/* Social Login Options */}
                <div className="text-center mt-4">
                  <p className="divider pt-5">or continue with</p>
                  <div className="social-login">
                    <Button variant="outline-primary" className="social-btn">
                      <i className="fab fa-google"></i>
                    </Button>
                    <Button variant="outline-primary" className="social-btn">
                      <i className="fab fa-facebook-f"></i>
                    </Button>
                    <Button variant="outline-primary" className="social-btn">
                      <i className="fab fa-apple"></i>
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
