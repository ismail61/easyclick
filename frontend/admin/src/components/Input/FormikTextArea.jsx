import { Box, Grid } from '@mui/material'
import React from 'react'
import { Field } from 'formik'

export default function FormikTextArea({id='', label='', className, ...rest}) {
  return (
    <>
    <Grid container>
      <Grid item md={3} xs={12}  sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', pr:2 }}>
        <label htmlFor={id} className='text-end'>{label} :</label>
      </Grid>
      <Grid item md={9} xs={12}>
        <Field 
          as='textarea'
          className={`form-control form-control-sm mb-2 ${className}`}
          {...rest}
        />
      </Grid>
    </Grid>
    {/* <Box sx={{display: 'flex', justifyContent: 'end', mb: 2, color: 'error.main'}}>Required!</Box> */}
    </>
  )
}