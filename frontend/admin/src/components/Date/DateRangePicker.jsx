import * as React from 'react';
import { Grid } from '@mui/material';
import moment from "moment";
import { DatePicker } from 'antd';

export default function DateRangePicker({ name = '', label = '', disabled = false, time = false, defaultValue, placeholder, edit = false, setFieldValue, ...rest }) {
    const onChange = (date, dateString) => {
        if (name === "start_from" || name === "specific_period.start_date" || name === "campaign_start_time") {
            rest?.StartDateHandler(date, dateString, setFieldValue);
        } else if (name === 'campaign_end_time') {
            rest?.EndDateAndTimeHandler(date, dateString, setFieldValue);
        } else {
            rest?.EndDateHandler(date, dateString, setFieldValue);
        }
    }
    const dateFormat1 = "YYYY-MM-DD";
    const dateFormat2 = "YYYY-MM-DD HH:mm:ss";
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now();
    }
    return (
        <>
            <Grid container sx={{ marginBottom: '10px', marginTop: '8px' }}>
                <Grid item md={3} xs={12} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', pr: 2 }}>
                    <label htmlFor={name} className='text-end'>{label} :</label>
                </Grid>
                <Grid item md={9} xs={12}>
                    {
                        edit ? <DatePicker
                            disabled={disabled}
                            showTime={time ? true : false}
                            placeholder={placeholder}
                            disabledDate={disabledDate}
                            allowClear={false}
                            style={{ width: '100%' }}
                            onChange={onChange}
                            value={moment(defaultValue)}
                            format={time ? dateFormat2 : dateFormat1}
                        /> : <DatePicker
                            showTime={time ? true : false}
                            disabled={disabled}
                            placeholder={placeholder}
                            disabledDate={disabledDate}
                            allowClear={false}
                            style={{ width: '100%' }}
                            onChange={onChange}
                        />
                    }
                </Grid>
            </Grid>
        </>

    );
}
