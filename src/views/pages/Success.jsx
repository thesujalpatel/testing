import { useNavigate } from "react-router-dom";
import userServices from "../../server/services/userServices";

function Success() {
  const navigate = useNavigate();
  function handleSignOut() {
    userServices.signOut();
    navigate("/auth");
  }

  return (
    <div>
      <h1>Success</h1>
      <h1>Sign Out</h1>
      <input type="submit" value="Sign Out" onClick={handleSignOut} />
    </div>
  );
}

export default Success;
