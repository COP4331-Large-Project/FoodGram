import { Box } from "@mui/material";
import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Group 22 Large Project Spring {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "skyblue"}} component="footer">
      <Typography variant="h6" align="center">
        FoodGram
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Let's grab a coffee. Vivan las Arepas!
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
