import React from "react";

import worldImage from "../components/UI/world.jpg";
import ImageOverlay from "../components/UI/ImageOverlay";
import Layout from "../components/layout/Layout";

const WorldHabits: React.FC = () => {
  return (
    <Layout>
      <h1>The World</h1>
      <ImageOverlay image={worldImage} alt="world" text="Coming Soon..." />
    </Layout>
  );
};

export default WorldHabits;
