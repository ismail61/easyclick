import { Grid } from '@mui/material'
import React from 'react'

const ImageInput = ({ id = '', label = '', name = '', index, className = '', uploaded = false, ImageHandler, ...rest }) => {
    const onChangeHandle = (e) => {
        ImageHandler(e, index)
    }
    return (
        <>
            <Grid container className={className}>
                <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
                    <label htmlFor={id} className='text-end'>{label} :</label>
                </Grid>
                <Grid item md={9} xs={12}> <input onChange={onChangeHandle} accept="image/*" type="file" name={name}
                    {...rest} />
                </Grid>
            </Grid>
        </>
    );
};

export default ImageInput;
