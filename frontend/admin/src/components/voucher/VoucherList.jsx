import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import VoucherFactory from './VoucherFactory';

const VoucherList = () => {
    const [status, setStatus] = useState('all');
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <>
            <Box sx={{ maxWidth: 240, marginBottom: '20px' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={handleChange}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='deactive'>De Active</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <VoucherFactory type={status} />
        </>
    )
}

export default VoucherList