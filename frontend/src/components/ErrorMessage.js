import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20, margin: "10px" }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
