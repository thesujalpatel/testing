import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, useAnimation } from "framer-motion";
import gsap from "gsap";

const Preloader = ({ isLoading, onLoaded }) => {
  const wordList = useMemo(
    () => [
      "Hello World",
      "नमस्ते दुनिया",
      "Hola Mundo",
      "Bonjour le monde",
      "Hallo Welt",
      "Ciao mondo",
      "こんにちは世界",
      "你好，世界",
      "안녕 세상",
      "Olá Mundo",
      "Привет, мир",
      "مرحبا بالعالم",
      "Hello World",
      "नमस्ते दुनिया",
    ],
    []
  ); // Empty dependency array means this only runs once

  const animateWords = useCallback(() => {
    if (!containerRef.current) return; // Guard against null ref

    const containerHeight = containerRef.current.offsetHeight;
    const wordHeight = 40; // Approximate word height; adjust as needed
    const totalWordsHeight = wordList.length * wordHeight;
    const animationDuration = 2; // Adjust duration for speed

    gsap
      .timeline({ repeat: 0, ease: "none" }) // changed to gsap for its ease in and out functionality
      .fromTo(
        containerRef.current,
        { y: 0 },
        {
          y: -totalWordsHeight + wordHeight * 2, // Adjust for top and bottom padding
          duration: animationDuration,
          ease: "power1.inOut", // smooth start and end
          onComplete: () => {
            setTimeout(() => {
              gsap.set(containerRef.current, { y: containerHeight }); // Reset position for smooth loop
              animateWords(); // restart animation
            }, 500);
          },
        }
      );
  }, [wordList]); // Add wordList to the dependency array

  const containerRef = useRef(null);
  const animation = useAnimation();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (isLoading && !animationPlayed) {
      setAnimationPlayed(true); // Ensure animation plays only once
      animateWords();
    }

    if (!isLoading && animationPlayed) {
      animation.start({ opacity: 0 }); // Fade out
      setTimeout(() => {
        setAnimationPlayed(false); // Reset for next load
        onLoaded(); // Call the onLoaded callback
      }, 500); // Match fade-out duration
    }

    return () => {
      animation.stop(); // Stop animation on component unmount
    };
  }, [isLoading, animation, onLoaded, animationPlayed, animateWords]); // animateWords is now in the dependency array

  const generateWords = () => {
    return wordList.map((word, index) => (
      <div
        key={index}
        style={{
          fontSize: "30px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {word}
      </div>
    ));
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#f0f0f0", // Solid background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: isLoading ? 1 : 0, // Start with visible, fade out when not loading
        pointerEvents: isLoading ? "auto" : "none", // Prevent interaction when not loading
      }}
      animate={{ opacity: isLoading ? 1 : 0 }} // Fade in when loading, fade out when not loading
      transition={{ duration: 0.5 }} // Fade-in and fade-out duration
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: "40px",
          width: "100%",
        }}
      >
        <div
          ref={containerRef}
          style={{
            fontSize: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {generateWords()}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, #f0f0f0, rgba(240, 240, 240, 0) 20%, rgba(240, 240, 240, 0) 80%, #f0f0f0)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
