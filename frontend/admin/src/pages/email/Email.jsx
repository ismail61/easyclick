/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid } from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import { ErrorToast } from "utils";
import { useNavigate } from "react-router-dom";
import Loader from "layouts/loader/loader";
import BooleanCheckBox from "components/Input/CheckBox";
import FormikRichText from "components/Input/FormikRichText";
import { sendEmail } from "services/email/EmailService";
import Swal from "sweetalert2";


export default function Email() {
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(false)
    const history = useNavigate();
    const initialValues = {
        email: undefined,
        all_email: false,
        subject: undefined,
        body: undefined
    };

    const onSubmit = async (values) => {
        values.body = value;
        try {
            setLoader(true);
            await sendEmail(values);
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Email Send Successful',
                showConfirmButton: false,
                timer: 1500
            })
            history('/');
        } catch (error) {
            if (error.response) {
                ErrorToast(error.response?.data?.err);
            }
        } finally {
            setLoader(false);
        }
    };
    const handleBooleanChange = (event, setFieldValue, type) => {
        setFieldValue(type, event.target.checked)
    };
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
                                        <FormikInput
                                            id="email"
                                            name="email"
                                            label="Email"
                                            placeholder="Enter The Email Address to send custom email"
                                            disabled={values.all_email ? true : false}
                                            type="email"
                                        />
                                        <BooleanCheckBox
                                            id="all_email"
                                            name="all_email"
                                            label="Send Email to all Customer"
                                            check={values.all_email}
                                            handleBooleanChange={handleBooleanChange}
                                            setFieldValue={setFieldValue}
                                            type="all_email"
                                        />
                                        <FormikInput
                                            id="subject"
                                            name="subject"
                                            label="Subject"
                                            placeholder="Enter The Email Subject Here"
                                        />
                                        <FormikRichText
                                            id="body"
                                            name="body"
                                            label="Email Body"
                                            value={value}
                                            setValue={setValue}
                                        />
                                    </Box>
                                    {loader ? <Loader />
                                        : <Box
                                            sx={{
                                                backgroundColor: "white",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: 1
                                            }}
                                        >
                                            <span></span>
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
