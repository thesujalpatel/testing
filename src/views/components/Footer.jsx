import "../../assets/css/components/Footer.css";

import ScrollVelocity from "../components/ScrollVelocity";
import Orb from "../components/Orb";

function Footer() {
  return (
    <div className="footer">
      <ScrollVelocity
        texts={["Stay Connected", "Scroll Down"]}
        velocity={100}
        className="custom-scroll-text"
      />
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />
    </div>
  );
}
export default Footer;
