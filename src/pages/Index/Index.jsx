import React from "react";
import "./Index.css";

const Index = () => {
  const items = Array.from({ length: 80 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="index">
      <div className="grid-container">
        <div className="grid-item logo"></div>
        {items.map((item, index) => (
          <div key={index} className="grid-item"></div>
        ))}
      </div>
    </div>
  );
};

export default Index;
