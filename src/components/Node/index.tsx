import React, { useState, useEffect } from "react";
import "./index.css";

interface NodeProps {
  value: number;
  style?: React.CSSProperties;
  onClick: (value: number) => void;
  disabled?: boolean;
  isFirstClick?: boolean;
}

const NodeItem: React.FC<NodeProps> = ({
  value,
  style,
  onClick,
  disabled = false,
  isFirstClick = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsClicked(false);
  }, []);

  useEffect(() => {
    if (isClicked && !isFirstClick) {
      // Hide the node after it is clicked and not the first click
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Delay before hiding

      // Cleanup timer if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [isClicked, isFirstClick]);

  const handleClick = () => {
    if (isVisible && !disabled) {
      setIsClicked(true); // Trigger clicked state immediately
      onClick(value); // Call the onClick handler immediately
    }
  };

  return (
    isVisible && (
      <div
        className="node"
        style={{
          ...style,
          backgroundColor: isClicked ? "red" : "transparent",
        }}
        onClick={handleClick}
      >
        {value}
      </div>
    )
  );
};

export default NodeItem;
