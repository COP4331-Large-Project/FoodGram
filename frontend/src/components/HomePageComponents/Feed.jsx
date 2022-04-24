import React from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";
import { Grid, Box, Container, Typography, Stack, Button } from "@mui/material";

//For design testing
const recipeCards = [
  {
    image: "/Assets/paella.jpg",
    title: "Shrimp Paella",
    description:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    image: "/Assets/sangria.jpg",
    title: "Sangria",
    description:
      "When you need a crowd-pleasing cocktail, sangria is the obvious choice. A pitcher of sangria is the perfect summer drink to sip on at your backyard barbecue or party. So, let us introduce you to the best sangria recipe on the internet. It's easy to make and, even better, it's irresistibly delicious.",
  },
  {
    image: "/Assets/salsa.jpg",
    title: "Secret Salsa",
    description: "Sweet and spicy pico de gallo-style salsa with my secret ingredient! ",
  },
  {
    image: "/Assets/steak.jpg",
    title: "Rosemary Steak",
    description:
      "This is a wonderful steak dish is quite popular in various restaurants around Buenos Aires. ",
  },
];
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
      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          {recipeCards.map((recipeCard, i) => {
            return (
              <Grid key={i} item>
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
