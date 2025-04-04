import "../../assets/css/components/Navigation.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="navigation">
      <div className="navigation_left">
        <div className="navigation_logo">Sujal Patel</div>
      </div>
      <div className="navigation_right">
        <div className="navigation_options">
          <div
            className="navigation_option"
            onClick={() => scrollToSection("home")}
          >
            Home
          </div>
          <div
            className="navigation_option"
            onClick={() => scrollToSection("about")}
          >
            About
          </div>
          <div
            className="navigation_option"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </div>
          <div
            className="navigation_option"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </div>
        </div>
        <div className="navigation_divider"></div>
        <div className="navigation_others" onClick={() => navigate("/auth")}>
          SignIn/SignUp
        </div>
      </div>
    </div>
  );
}

export default Navigation;
