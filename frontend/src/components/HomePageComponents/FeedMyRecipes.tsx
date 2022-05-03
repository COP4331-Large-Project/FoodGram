import React, { useState, useEffect } from "react";
// import RecipeCard from "../Cards/RecipeCard.tsx";
import { Grid, Box, Container, Typography, Stack, Button } from "@mui/material";

const FeedMyRecipes = () => {

  return (
    <Box className="lineInputted" sx={{ bgcolor: "white" }} flex={6} p={{ xs: 0, md: 2 }}>
        <Typography>
            Welcome to Feed My Recipes
        </Typography>

    </Box>
  );
};

export default FeedMyRecipes;
