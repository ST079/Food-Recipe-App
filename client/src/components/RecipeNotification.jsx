import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { FaCheckCircle, FaTrash, FaTimes } from "react-icons/fa";
import { PiCookingPotBold } from "react-icons/pi";
import "../styles/RecipeNotification.css";

const RecipeNotification = ({
  type,
  message,
  onClose,
  show = true,
  autoClose = true,
  autoCloseDuration = 3000,
}) => {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, autoCloseDuration, onClose]);

  if (!show) return null;

  const getVariant = () => {
    switch (type) {
      case "success":
        return "success";
      case "delete":
        return "danger";
      case "failed":
        return "danger";
      default:
        return "info";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="me-2" size={20} />;
      case "delete":
        return <FaTrash className="me-2" size={18} />;
      default:
        return <PiCookingPotBold className="me-2" size={20} />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "success":
        return "Recipe Saved!";
      case "delete":
        return "Recipe Deleted";
      default:
        return "Notification";
    }
  };

  return (
    <Alert
      variant={getVariant()}
      className="recipe-notification shadow-lg"
    >
      <div className="d-flex align-items-center">
        <div className="notification-icon">{getIcon()}</div>
        <div className="flex-grow-1">
          <h5 className="mb-1">{getTitle()}</h5>
          <p className="mb-0">{message}</p>
        </div>
        <Button
          variant={`outline-${getVariant()}`}
          size="sm"
          onClick={onClose}
          className="ms-3 close-btn"
        >
          <FaTimes />
        </Button>
      </div>
    </Alert>
  );
};

export default RecipeNotification;
