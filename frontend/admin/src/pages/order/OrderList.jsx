import { Box, Typography } from '@mui/material'
import { OrderTabs } from 'components/TabsPanel'
import React from 'react'

const OrderList = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Order Management
      </Typography>
      <OrderTabs />
    </Box>
  )
}

export default OrderList