import { Box, Typography } from "@mui/material";
import { CampaignTabs } from "components/TabsPanel";
import React from "react";
const CampaignList = () => {
  return (
    <>
      <Box sx={{ paddingX: 4, paddingY: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Campaign Managements
        </Typography>
        <CampaignTabs />
      </Box>
    </>
  );
};

export default CampaignList