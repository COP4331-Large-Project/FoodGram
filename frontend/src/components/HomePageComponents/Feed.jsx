import { Box } from "@mui/material";
import React from "react";
import RecipeCard from "../Cards/RecipeCard";

const Feed = () => {
  return (
    <Box flex={4} p={2}>
      <RecipeCard></RecipeCard>
    </Box>
  );
};

export default Feed;
