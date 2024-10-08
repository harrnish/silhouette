import React from "react";
import "./Index.css";
import { ReactLenis } from "@studio-freight/react-lenis";

const Index = () => {
  const items = Array.from({ length: 80 }, (_, i) => `Item ${i + 1}`);
  const heights = [80, 90, 100, 110, 120, 130];
  const colors = [
    "#eeeeee",
    "#000000",
    "#999999",
    "#cdcdcd",
    "#292929",
    "#3e3e3e",
  ];

  const getRandomHeight = () => {
    return heights[Math.floor(Math.random() * heights.length)];
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <ReactLenis root>
      <div className="index">
        <div className="grid-container">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid-item"
              style={{
                height: `${getRandomHeight()}px`,
                backgroundColor: getRandomColor(),
              }}
            ></div>
          ))}
        </div>
      </div>
    </ReactLenis>
  );
};

export default Index;
