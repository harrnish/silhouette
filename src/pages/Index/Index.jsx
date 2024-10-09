import React from "react";
import "./Index.css";
import { ReactLenis } from "@studio-freight/react-lenis";
import Transition from "../../components/Transition/Transition";

const Index = () => {
  const items = Array.from({ length: 60 }, (_, i) => `Item ${i + 1}`);
  const heights = [80, 90, 100, 110, 120, 130];
  const colors = [
    "#eeeeee",
    "#000000",
    "#999999",
    "#cdcdcd",
    "#292929",
    "#3e3e3e",
  ];
  const names = [
    ["CG", 8],
    ["MSC", 6],
    ["AD", 4],
    ["I", 4],
    ["PZX", 8],
    ["QQ", 8],
    ["OIA", 2],
    ["B", 6],
    ["IUW", 8],
    ["DJB", 6],
  ];

  const getRandomHeight = () => {
    return heights[Math.floor(Math.random() * heights.length)];
  };

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getItemName = (index) => {
    let count = 0;
    for (const [prefix, total] of names) {
      if (index < count + total) {
        const itemNumber = index - count + 1;
        return `${prefix}_${itemNumber}.jpg`;
      }
      count += total;
    }
    return `UNKNOWN_${index + 1}.jpg`;
  };

  return (
    <ReactLenis root>
      <div className="index">
        <div className="grid-container">
          {items.map((item, index) => (
            <div className="grid-item-wrapper" key={index}>
              <div className="grid-item-name">
                <p>{getItemName(index)}</p>
              </div>
              <div
                className="grid-item"
                style={{
                  height: `${getRandomHeight()}px`,
                  backgroundColor: getRandomColor(),
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="whitespace"></div>
      </div>
    </ReactLenis>
  );
};

export default Transition(Index);
