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
      // Wrap wordList with useMemo
      "Hello World", // English
      "नमस्ते दुनिया", // Hindi
      "Hola Mundo", // Spanish
      "Bonjour le monde", // French
      "Hallo Welt", // German
      "Ciao mondo", // Italian
      "こんにちは世界", // Japanese
      "你好，世界", // Chinese
      "안녕 세상", // Korean
      "Olá Mundo", // Portuguese
      "Привет, мир", // Russian
      "مرحبا بالعالم", // Arabic
      "Hello World",
      "नमस्ते दुनिया",
    ],
    []
  ); // Empty dependency array means it's only created once

  const containerRef = useRef(null);
  const animation = useAnimation();
  const [animationPlayed, setAnimationPlayed] = useState(false);

  const animateWords = useCallback(() => {
    const currentContainer = containerRef.current; // Copy the ref value inside the callback

    if (!currentContainer) return;

    const containerHeight = currentContainer.offsetHeight;
    const wordHeight = 40;
    const totalWordsHeight = wordList.length * wordHeight;
    const animationDuration = 2;

    gsap.timeline({ repeat: 0, ease: "none" }).fromTo(
      currentContainer, // Use the copied ref value
      { y: 0 },
      {
        y: -totalWordsHeight + wordHeight * 2,
        duration: animationDuration,
        ease: "power1.inOut",
        onComplete: () => {
          setTimeout(() => {
            gsap.set(currentContainer, { y: containerHeight }); // Use the copied ref value
            animateWords();
          }, 500);
        },
      }
    );
  }, [wordList]);

  useEffect(() => {
    const currentContainer = containerRef.current; // Copy ref value inside useEffect

    if (isLoading && !animationPlayed) {
      setAnimationPlayed(true);
      animateWords();
    }

    if (!isLoading && animationPlayed) {
      animation.start({ opacity: 0 });
      setTimeout(() => {
        setAnimationPlayed(false);
        onLoaded();
      }, 500);
    }

    return () => {
      animation.stop();
      if (currentContainer) gsap.killTweensOf(currentContainer); // Use copied ref value and check if it exists
    };
  }, [isLoading, animation, onLoaded, animationPlayed, animateWords]); // Add animateWords to dependency array

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
