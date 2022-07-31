import { Grid } from '@mui/material'
import { Field } from 'formik'
import React from 'react'

export default function FormikSelect({ name = '', label = '', className, options = [], ...rest }) {
  return (
    <>
      <Grid container>
        <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
          <label htmlFor={name} className='text-end'>{label} :</label>
        </Grid>
        <Grid item md={9} xs={12}>
          <Field
            as='select'
            id={name}
            name={name}
            {...rest}
            className={`form-select form-select-sm mb-2 ${className}`}

          >
            <option value="none">
              Choose an Options
            </option>
            {
              (options && options.length > 0) ? <>
                {
                  options.map((option, index) => {
                    return (
                      (option && option.title) ?
                        <option key={index} value={option.title}>
                          {option.title}
                        </option> :
                        <option key={index} value={option.name}>
                          {option.name}
                        </option>
                    )
                  })
                }
              </> : null
            }
          </Field>
        </Grid>
      </Grid>
      {/* <Box sx={{display: 'flex', justifyContent: 'end', mb: 2, color: 'error.main'}}>Required!</Box> */}
    </>
  )
}