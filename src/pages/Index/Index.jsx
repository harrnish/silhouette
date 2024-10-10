import React from "react";
import "./Index.css";
import Transition from "../../components/Transition/Transition";

import { ReactLenis } from "@studio-freight/react-lenis";

const Index = () => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadImages = async () => {
      try {
        const imageContext = import.meta.glob(
          "../../assets/images/index/*.(png|jpg|svg)"
        );

        const loadedImages = await Promise.all(
          Object.values(imageContext).map((importImage) => importImage())
        );
        const imageUrls = loadedImages.map((module) => module.default);

        const sortedImages = imageUrls.sort((a, b) => {
          const aNum = parseInt(a.match(/(\d+)\.[^.]+$/)[1]);
          const bNum = parseInt(b.match(/(\d+)\.[^.]+$/)[1]);
          return aNum - bNum;
        });

        setImages(sortedImages);
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };
    loadImages();
  }, []);

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

  const getRandomHeight = () =>
    heights[Math.floor(Math.random() * heights.length)];
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

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

  if (loading) {
    return (
      <div className="loading-msg">
        <p>Loading images...</p>
      </div>
    );
  }

  return (
    <ReactLenis root>
      <div className="index">
        <div className="grid-container">
          {images.length === 0 ? (
            <div>
              <p>No images found. Check your image directory.</p>
            </div>
          ) : (
            images.map((image, index) => (
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
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    onError={(e) => {
                      console.error(`Error loading image ${index}:`, e);
                      e.target.src = "path/to/fallback/image.jpg";
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="whitespace"></div>
      </div>
    </ReactLenis>
  );
};

export default Transition(Index);
