import React from "react";
import Sidebar from "../components/HomePageComponents/Sidebar";
import Feed from "../components/HomePageComponents/Feed";
import RightBar from "../components/HomePageComponents/Rightbar";
import Navbar from "../components/HomePageComponents/Navbar";
import Footer from "../components/HomePageComponents/Footer";
import { Box, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const font = "'Prompt', sans-serif";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: font,
      color: "#3F3D56",
    },
  },
  palette: {
    primary: {
      main: "#FF203A",
    },
    secondary: {
      main: "#3F3D56",
    },
  },
});

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Feed />
            <RightBar />
          </Stack>
          {/* <Footer /> */}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};
export default HomePage;
