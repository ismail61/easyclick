import { Box, Button, Typography } from '@mui/material'
import { CategoryTabs } from 'components/TabsPanel'
import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryList = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Category Management
      </Typography>
      <Box textAlign='right'>
        <Button variant='contained'>
          <NavLink
            className={({ isActive }) => (isActive ? "text-warning" : "")}
            to="/add-category"
          >
            Add category
          </NavLink>
        </Button>
      </Box>
      <CategoryTabs />
    </Box>
  )
}

export default CategoryList