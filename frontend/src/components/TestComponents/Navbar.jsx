import { AppBar, Toolbar, styled, Typography } from "@mui/material";
import React from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          fontFamily="Prompt"
          fontWeight="bold"
          color="#3F3D56"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          FoodGram
        </Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
