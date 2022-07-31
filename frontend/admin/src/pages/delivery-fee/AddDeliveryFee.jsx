/* eslint-disable jsx-a11y/alt-text */
import {
    Box,
    Grid,
} from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import FormikSelect from "components/Input/FormikSelect";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { ErrorToast } from "utils";
import { useNavigate } from "react-router-dom";
import Loader from "layouts/loader/loader";
import { getAllDistrict } from "adapters/address/Address";
import { createDeliveryFee } from "services/deliver-fee/DeliveryFeeService";


export default function AddDeliveryFee() {
    const [loader, setLoader] = useState(false)
    const [districts, setDistrict] = useState(null)
    const history = useNavigate();
    const initialValues = {
        city: undefined,
        fee: undefined
    };

    const onSubmit = async (values) => {
        try {
            setLoader(true);
            await createDeliveryFee(values);
            history('/delivery-fee');
        } catch (error) {
            if (error.response) {
                ErrorToast(error.response?.data?.err);
            }
        }
        finally {
            setLoader(false);
        }
    };
    const getDistricts = async () => {
        const res = await getAllDistrict();
        setDistrict(res?.data)
    }

    useEffect(() => {
        getDistricts()
    }, [])
    
    return (
        <>
            <Box sx={{ p: { xs: 2 }, mt: 5, p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* Formik Form handler */}
                        <Formik
                            enableReinitialize={true}
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                        >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <Box
                                        sx={{
                                            backgroundColor: "white",
                                            boxShadow: 2,
                                            p: 2,
                                        }}
                                    >

                                        <FormikSelect
                                            id="city"
                                            name="city"
                                            label="District"
                                            options={districts}
                                        />
                                        <FormikInput
                                            id="fee"
                                            name="fee"
                                            label="Delivery Fee"
                                            placeholder="Enter Delivery Amount"
                                            type="number"
                                        />
                                    </Box>
                                    {loader ? <Loader />
                                        : <Box
                                            sx={{
                                                backgroundColor: "white",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                paddingX: 2
                                            }}
                                        >
                                            <Button color="error" variant="contained">
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="contained">
                                                Submit
                                            </Button>
                                        </Box>}

                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
