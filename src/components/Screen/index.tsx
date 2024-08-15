import React, { useState, useEffect } from "react";
import "./index.css";
import NodeItem from "../Node";

interface ScreenProps {
  numberNode: number | "";
  onError: () => void; // Callback to notify error
  onClear: () => void; // Callback to notify when all nodes are cleared
  reset: boolean; // Prop to trigger reset
}

const Screen: React.FC<ScreenProps> = ({
  numberNode,
  onError,
  onClear,
  reset,
}) => {
  const [nodes, setNodes] = useState<
    { id: number; value: number; left: number; top: number; visible: boolean }[]
  >([]);
  const [lastClicked, setLastClicked] = useState<number | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [firstClick, setFirstClick] = useState<number | null>(null);

  // Effect to handle nodes creation and reset
  useEffect(() => {
    const nodeCount = typeof numberNode === "number" ? numberNode : 0;

    if (nodeCount > 0) {
      const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
        id: i,
        value: i + 1,
        left: Math.random() * 90, // Ensure nodes stay within the bounds
        top: Math.random() * 85, // Adjust for the position of nodes
        visible: true, // Initialize all nodes as visible
      }));
      setNodes(newNodes);
    } else {
      setNodes([]);
    }

    // Reset state variables when reset is true or numberNode changes
    if (reset || typeof numberNode === "number") {
      setDisabled(false);
      setLastClicked(null);
      setFirstClick(null);
    }
  }, [numberNode, reset]);

  // Effect to handle completion of node clearing
  useEffect(() => {
    if (nodes.every((node) => !node.visible) && firstClick !== null) {
      onClear(); // Notify that all nodes have been cleared
    }
  }, [nodes, onClear, firstClick]);

  const handleNodeClick = (value: number) => {
    if (disabled) return; // Do nothing if nodes are disabled

    // Check if the clicked value is exactly one more than the last clicked value
    const nextExpectedValue = lastClicked === null ? 1 : lastClicked + 1;

    if (firstClick === null || value !== nextExpectedValue) {
      setFirstClick(value);
    }

    if (value !== nextExpectedValue) {
      setDisabled(true);
      onError(); // Notify the error
      return;
    }

    // Correct value clicked
    setLastClicked(value);

    // Update the visibility of the current node
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.value === value
          ? {
              ...node,
              visible: true,
              hideTimeout: setTimeout(() => {
                setNodes((currentNodes) =>
                  currentNodes.map((n) =>
                    n.id === node.id ? { ...n, visible: false } : n
                  )
                );
              }, 1000),
            }
          : node
      )
    );
  };

  return (
    <div className="screen-container">
      {nodes.map(
        ({ id, value, left, top, visible }) =>
          visible && (
            <NodeItem
              key={id}
              value={value}
              style={{
                left: `${Math.min(left, 90)}%`,
                top: `${Math.min(top, 85)}%`,
              }}
              onClick={handleNodeClick}
              disabled={disabled}
              isFirstClick={value === firstClick}
            />
          )
      )}
    </div>
  );
};

export default Screen;
