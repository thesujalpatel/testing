import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return <div onClick={() => navigate("/auth")}>Login/Register</div>;
}
export default Landing;
