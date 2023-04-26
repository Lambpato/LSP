import { useNavigate } from "react-router-dom";

export default function BackButton ({action}) {
  const navigate = useNavigate();
  const toggleBack = () => navigate(-1);

  return (
    <button className="btn align-self-start fw-semibold" onClick={toggleBack}>{action}</button>
  );
};
