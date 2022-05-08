import React from "react";

import worldImage from "../components/UI/world.jpg";
import ImageOverlay from "../components/UI/ImageOverlay";

const WorldHabits: React.FC = () => {
  return (
    <div>
      <h1>The World</h1>
      <ImageOverlay image={worldImage} alt="world" text="Coming Soon..." />
    </div>
  );
};

export default WorldHabits;
