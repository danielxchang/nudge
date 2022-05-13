import React from "react";

import worldImage from "../../static/images/world.jpg";
import ImageOverlay from "../UI/ImageOverlay";
import Layout from "../layout/Layout";

const WorldPageContent: React.FC = () => {
  return (
    <Layout>
      <h1>The World</h1>
      <ImageOverlay image={worldImage} alt="world" text="Coming Soon..." />
    </Layout>
  );
};

export default WorldPageContent;
