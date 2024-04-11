import React from "react";
import Category from "./Category";

const PublicationCategories = ({ publicationsData }) => {
  return (
    <div>
      <Category publicationsData={publicationsData} />
    </div>
  );
};

export default PublicationCategories;
