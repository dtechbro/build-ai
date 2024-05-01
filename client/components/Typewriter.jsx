import React, { useState, useEffect } from "react";

const TypewriterResponse = ({ responseText }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add the next character to the displayed text
      setDisplayedText((prevText) => prevText + responseText[currentIndex]);

      // Move to the next character
      setCurrentIndex((prevIndex) => prevIndex + 1);

      // Stop the typewriter effect when all characters are displayed
      if (currentIndex === responseText.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval (in milliseconds) for typing speed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentIndex, responseText]);

  return (
    <div>
      <p>{displayedText}</p>
    </div>
  );
};

export default TypewriterResponse;
