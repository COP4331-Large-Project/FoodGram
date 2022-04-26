import React from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";
import { Grid, Box, Container, Typography, Stack, Button } from "@mui/material";

//For design testing
import { recipeCards } from "../../recipeCardsData";
//End of design testing

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
        Group 22 Large Project Spring {' '}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Feed = () => {
  return (
    <Box sx={{ bgcolor: "secondary.light" }} flex={6} p={{ xs: 0, md: 2 }}>
      {/* Hero Unit */}
      <Container maxWidth="sm">
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Explore All Recipes
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
      {/* Footer */}
      <Box variant="outlined" sx={{ bgcolor: "secondary.light" }} component="footer">
        <Typography variant="h6" align="center">
          FoodGram
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Let's grab a coffee. Viva las Arepas!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </Box>
  );
};

export default Feed;
