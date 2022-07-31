import { Box, Typography } from "@mui/material";
import { VoucherTabs } from "components/TabsPanel";
import React from "react";
const VoucherList = () => {
  return (
    <>
      <Box sx={{ paddingX: 4, paddingY: 2 }}>
        <Typography variant="h5" gutterBottom component="div">
          Voucher Management
        </Typography>
        <VoucherTabs />
      </Box>
    </>
  );
};

export default VoucherList