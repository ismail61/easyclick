import "antd/dist/antd.css";
import { Cascader } from "antd";
import { Grid } from "@mui/material";


const Cascade = ({ name = "", label = "", categories = [], className, setFieldValue, onCascadeChange, defaultValue = [], disabled = false, ...rest }) => {
    function onChange(value, selectedOptions) {
        onCascadeChange(selectedOptions, setFieldValue);
    }
    return (
        <>
            <Grid container>
                <Grid
                    item
                    md={3}
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        pr: 2,
                    }}
                >
                    <label htmlFor={name} className="text-end">
                        {label} :
                    </label>
                </Grid>
                <Grid item md={9} xs={12} sx={{ my: 1 }}>
                    {
                        disabled ?
                            <Cascader
                                style={{ width: "100%" }}
                                expandTrigger="hover"
                                maxTagCount="responsive"
                                value={defaultValue}
                                placeholder="Please select category"
                                disabled
                                {...rest}
                            /> : <Cascader
                                style={{ width: "100%" }}
                                expandTrigger="hover"
                                maxTagCount="responsive"
                                options={categories}
                                onChange={onChange}
                                placeholder="Please select category"
                                {...rest}
                            />
                    }
                </Grid>
            </Grid>
            {/* <Box sx={{display: 'flex', justifyContent: 'end', mb: 2, color: 'error.main'}}>Required!</Box> */}
        </>
    );
};

export default Cascade;
