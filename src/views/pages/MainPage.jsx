// import { useNavigate } from "react-router-dom";

import Home from "../parts/Home";
import About from "../parts/About";
import Projects from "../parts/Projects";
import Contact from "../parts/Contact";

import "../../assets/css/pages/MainPage.css";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function MainPage() {
  // const navigate = useNavigate();

  return (
    <div className="mainPage">
      <Navigation />
      <div className="parts">
        <Home className="home" id="home" />
        <About className="about" id="about" />
        <Projects className="projects" id="projects" />
        <Contact className="contact" id="contact" />
      </div>
      <Footer />
    </div>
  );
}
export default MainPage;

/* <>
      <div onClick={() => navigate("/auth")}>Login/Register</div>
      <h1 className="title">Hello World</h1>
      <h3>
        This is a simple landing page. You can add more content to it or replace
        it with your own landing page.
      </h3>
    </> */
