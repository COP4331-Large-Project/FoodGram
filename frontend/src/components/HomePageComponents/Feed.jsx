import { Box } from "@mui/material";
import React from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";

const Feed = () => {
  return (
    <Box flex={4} p={2}>
      <RecipeCard
        image="/Assets/paella.jpg"
        title="Shrimp Paella"
        description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
      ></RecipeCard>
    </Box>
  );
};

export default Feed;
