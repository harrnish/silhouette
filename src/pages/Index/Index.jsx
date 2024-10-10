import React, { useState, useEffect, useRef } from "react";
import "./Index.css";
import Transition from "../../components/Transition/Transition";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Index = () => {
  const container = useRef();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState({
    visible: false,
    image: "",
    name: "",
  });

  const gridRef = useRef(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageContext = import.meta.glob(
          "../../assets/images/index/*.(png|jpg|svg)"
        );

        const loadedImages = await Promise.all(
          Object.values(imageContext).map((importImage) => importImage())
        );
        const imageUrls = loadedImages.map((module) => module.default);

        // More robust sorting function
        const sortedImages = imageUrls.sort((a, b) => {
          const aMatch = a.match(/(\d+)/);
          const bMatch = b.match(/(\d+)/);
          const aNum = aMatch ? parseInt(aMatch[0]) : 0;
          const bNum = bMatch ? parseInt(bMatch[0]) : 0;
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

  useGSAP(
    () => {
      if (!loading && gridRef.current) {
        const items = gsap.utils.toArray(".grid-item-wrapper");

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power4.out",
              stagger: 0.01,
              delay: 0.75,
            }
          );
        } else {
          console.warn("No grid items found for GSAP animation");
        }
      }
    },
    { scope: container, dependencies: [loading, images] }
  );

  useEffect(() => {
    if (preview.visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [preview.visible]);

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

  const handleItemClick = (image, name) => {
    setPreview({ visible: true, image, name });
  };

  const handlePreviewClick = () => {
    setPreview({ visible: false, image: "", name: "" });
  };

  return (
    <ReactLenis root>
      <div
        ref={container}
        className="index"
        style={{ pointerEvents: preview.visible ? "none" : "auto" }}
      >
        <div className="grid-container" ref={gridRef}>
          {images.length === 0 ? (
            <div>No images found. Check your image directory.</div>
          ) : (
            images.map((image, index) => (
              <div
                className="grid-item-wrapper"
                key={index}
                onClick={() => handleItemClick(image, getItemName(index))}
              >
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

      {preview.visible && (
        <div
          className="preview"
          onClick={handlePreviewClick}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="preview-img"
            style={{
              backgroundImage: `url(${preview.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="preview-name">
            <p>{preview.name}</p>
          </div>
        </div>
      )}
    </ReactLenis>
  );
};

export default Transition(Index);
