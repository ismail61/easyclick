import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Field } from 'formik'

export default function FormikInput({ id = '', label = '', placeholder = '', className, fixed, ...rest }) {
  return (
    <>
      <Grid container>
        <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
          <label htmlFor={id} className='text-end'>{label} :</label>
        </Grid>
        <Grid item md={9} xs={12}>
          {fixed && fixed ?
            <Typography sx={{ py: 1 }}>
              {
                Object.prototype.toString.call(fixed) === '[object Array]' ? 
                fixed.map(value => {
                  return <span>{value}/  </span>
                }) : <span>{fixed} </span>
              }
            </Typography>
            : <Field
              placeholder={placeholder}
              className={`form-control form-control-sm mb-2 ${className}`}
              {...rest}
            />
          }
        </Grid>
      </Grid>
      {/* <Box sx={{display: 'flex', justifyContent: 'end', mb: 2, color: 'error.main'}}>Required!</Box> */}
    </>
  )
}