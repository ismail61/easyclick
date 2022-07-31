import { Box, Button, Typography } from '@mui/material'
import DeliveryFeeList from 'components/delivery-fee/DeliveryFeeList'
import { CategoryTabs } from 'components/TabsPanel'
import React from 'react'
import { NavLink } from 'react-router-dom'

const DeliveryFee = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Delivery Fee Management
      </Typography>
      <Box textAlign='right'>
        <Button variant='contained'>
          <NavLink
            className={({ isActive }) => (isActive ? "text-warning" : "")}
            to="/add-delivery-fee"
          >
            Add Delivery
          </NavLink>
        </Button>
      </Box>
      <DeliveryFeeList />
    </Box>
  )
}

export default DeliveryFee