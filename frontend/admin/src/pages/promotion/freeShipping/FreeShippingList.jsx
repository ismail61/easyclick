import { Box, Typography } from "@mui/material";
import { FreeShippingTabs } from "components/TabsPanel";
import React from "react";
const FreeShippingList = () => {
  return (
    <>
      <Box sx={{ paddingX: 4, paddingY: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Free Shipments Managements
        </Typography>
        <FreeShippingTabs />
      </Box>
    </>
  );
};

export default FreeShippingList