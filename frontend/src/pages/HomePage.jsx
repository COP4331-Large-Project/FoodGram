import React from "react";
import LoggedInName from "../components/LoggedInName";
import TopNavbar from "../components/Nav/TopNavbar_dashboard";
// D' imports
import Sidebar from "../components/TestComponents/Sidebar";
import Feed from "../components/TestComponents/Feed";
import RightBar from "../components/TestComponents/Rightbar";
import Navbar from "../components/TestComponents/Navbar";
import { Box, Stack } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <TopNavbar />
      {/* <Navbar/> */}
      <LoggedInName />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <RightBar />
      </Stack>
    </Box>
  );
};
export default HomePage;