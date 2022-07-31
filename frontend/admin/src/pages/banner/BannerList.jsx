import { Box, Button, Typography } from '@mui/material'
import { BannerTabs } from 'components/TabsPanel'
import React from 'react'
import { NavLink } from 'react-router-dom'

const BannerList = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Banner Management
      </Typography>
      <Box textAlign='right'>
        <Button variant='contained'>
          <NavLink
            className={({ isActive }) => (isActive ? "text-warning" : "")}
            to="/add-banner"
          >
            Add Banner
          </NavLink>
        </Button>
      </Box>
      <BannerTabs />
    </Box>
  )
}

export default BannerList