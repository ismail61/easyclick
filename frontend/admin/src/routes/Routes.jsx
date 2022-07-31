import React, { useContext } from "react";
import AuthApi from "store/AuthApi";
import { Box, Stack } from "@mui/material";
import Sidebar from "layouts/sidebar/Sidebar";
import Header from "layouts/header/Header";
import { Routing } from "./Routing";

export const AllRoutes = () => {
  const context = useContext(AuthApi);
  return (
    <>
      <div style={{ display: "flex" }}>
        <Box style={{ minHeight: "100vh" }}>
          <Sidebar user={context.user} />
        </Box>
        <Stack flexGrow={1}>
          <Header user={context.user} />
          <Box sx={{height: '90vh', overflow: 'scroll'}}>
            <Routing user={context.user} />
          </Box>
        </Stack>
      </div>
    </>
  );
};