import { Box, Typography } from '@mui/material'
import React from 'react'

const AccountStatements = () => {
  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div" sx={{marginBottom: 3}}>
        Account Statement
      </Typography>
    </Box>
  )
}

export default AccountStatements