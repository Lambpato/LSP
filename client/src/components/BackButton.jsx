import { Navigate } from "react-router-dom";

export default function BackButton () {
  const navigate = Navigate();
  const toggleBack = () => navigate(-1);

  return (
    <button onClick={toggleBack}>Back</button>
  );
};
