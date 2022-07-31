import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';
import { ErrorToast } from 'utils';

export default function ComboBox({ name = '', label = '', index, multiple = false, disabled = false, textLabel = '', handleColorInputChange, handleSizeInputChange, defaultValue, className, options = [], edit = false }) {
    const autocompleteHandle = (event, value) => {
        ErrorToast('Sorry! You can\'t not do this')
    }
    return (
        <>
            <Grid container sx={{ marginBottom: '20px', marginTop: '10px', padding: '10px' }}>
                <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
                    <label htmlFor={name} className='text-end'>{label} :</label>
                </Grid>
                <Grid item md={9} xs={12}>
                    {
                        (edit === true )? <Autocomplete
                            disabled={disabled}
                            onChange={autocompleteHandle}
                            multiple={multiple}
                            value={multiple ? [...defaultValue] : defaultValue}
                            id="tags-standard"
                            options={options}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={textLabel}
                                />
                            )}
                        /> : <Autocomplete
                            disabled={disabled}
                            onChange={autocompleteHandle}
                            multiple={multiple}
                            id="tags-standard"
                            options={options}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={textLabel}
                                />
                            )}
                        />
                    }
                </Grid>
            </Grid>
        </>

    );
}
