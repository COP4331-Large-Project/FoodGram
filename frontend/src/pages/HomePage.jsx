import React from "react";
import LoggedInName from "../components/LoggedInName";
import TopNavbar from "../components/Nav/TopNavbar_dashboard";
// D' imports
import Sidebar from "../components/HomePageComponents/Sidebar";
import Feed from "../components/HomePageComponents/Feed";
import RightBar from "../components/HomePageComponents/Rightbar";
import Navbar from "../components/HomePageComponents/Navbar";
import Footer from "../components/HomePageComponents/Footer";
import { Box, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const font = "'Prompt', sans-serif";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: font,
      color: '#3F3D56',
    },
  },
});

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Feed />
          <RightBar />
        </Stack>
        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
};
export default HomePage;
