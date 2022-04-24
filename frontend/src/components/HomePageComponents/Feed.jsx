import React from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";
import { Grid, Box } from "@mui/material";

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
    <Box flex={4} p={4}>
      <Grid container spacing={5}>
          {recipeCards.map((recipeCard, i) => {
            return (
              <Grid key={i} item>
                <RecipeCard {...recipeCard} />
              </Grid>
            );              
          })}
      </Grid>
    </Box>
  );
};

export default Feed;
