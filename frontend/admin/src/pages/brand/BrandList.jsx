import { Box, Button, Typography } from '@mui/material'
import { BrandTabs } from 'components/TabsPanel'
import React from 'react'
import { NavLink } from 'react-router-dom'

const BrandList = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Brand Management
      </Typography>
      <Box textAlign='right'>
        <Button variant='contained'>
          <NavLink
            className={({ isActive }) => (isActive ? "text-warning" : "")}
            to="/add-brand"
          >
            Add Brand
          </NavLink>
        </Button>
      </Box>
      <BrandTabs />
    </Box>
  )
}

export default BrandList