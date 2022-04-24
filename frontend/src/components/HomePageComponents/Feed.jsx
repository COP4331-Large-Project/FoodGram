import { Box } from "@mui/material";
import React from "react";
import RecipeCard from "../Cards/RecipeCard.tsx";

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
    <Box flex={4} p={2}>
      <>
      {recipeCards.map((recipeCard, i) => {
        return (
          <RecipeCard key={i} {...recipeCard}/>
        );
      })}
      </>
    </Box>
  );
};

export default Feed;
