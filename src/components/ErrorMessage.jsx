import React from "react";

const ErrorMessage = ({ touched, name, errors }) => {
  if (!touched[name]) return null;

  return <div className="text-danger fst-italic fw-bold">{errors[name]}</div>;
};

export default ErrorMessage;
