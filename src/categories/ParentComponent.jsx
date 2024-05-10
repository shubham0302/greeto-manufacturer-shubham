import React, { useState } from "react";
import CategoryList from "./CategoryList";
import { Box } from "@mui/material";

const ParentComponent = () => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(
      categories.filter((category) => category.id !== categoryToDelete.id)
    );
  };

  const handleSwitchChange = () => {
    setActiveCategory((prevActive) => !prevActive);
  };
  return (
    <Box>
      <CategoryList
        categories={categories}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddCategory={handleAddCategory}
        active={active}
        handleSwitchChange={handleSwitchChange}
      />
    </Box>
  );
};

export default ParentComponent;
