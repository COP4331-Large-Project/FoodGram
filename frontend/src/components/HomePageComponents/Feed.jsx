import React from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";
import { Grid, Box, Container, Typography, Stack, Button } from "@mui/material";

//For design testing
import { recipeCards } from "../../recipeCardsData";
//End of design testing

const Feed = () => {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {/* Hero Unit */}
      <Container maxWidth="sm">
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          My Recipes
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Something short and leading about the collection below—its contents, the creator, etc.
          Make it short and sweet, but not too short so folks don&apos;t simply skip over it
          entirely.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {recipeCards.map((recipeCard, i) => {
            return (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <RecipeCard {...recipeCard} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Feed;
