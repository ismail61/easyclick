import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, CardHeader, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "components/Input/FormikInput";
import FormikSelect from "components/Input/FormikSelect";
import {banks} from 'constants/index'
import {
    getBankInfo,
    updateBankInfo,
} from "services/account/AcountInformation";
import { FormDataAppend, SuccessToast, TryCatch } from "utils";
import { ImageInput } from "components";

export default function BankInfoCard() {
    const [user, setUser] = useState({});
    const [image, setImage] = useState(null);
    const onSubmit = (values) => {
        TryCatch(async () => {
            const formData = new FormData();
            const getFormData = FormDataAppend(formData, values, Object.keys(values));
            getFormData.append('image', image);
            await updateBankInfo(getFormData);
            SuccessToast("Bank Account Updated Successful");
        });
    };
    const getSellerBankAccountInfo = () => {
        TryCatch(async () => {
            const response = await getBankInfo()
            setUser(response?.data);
        });
    };
    const ImageHandler = (e) => {
        setImage(e.target.files[0])
    }
    useEffect(() => {
        getSellerBankAccountInfo();
    }, []);
    return (
        <Card>
            <CardHeader title="Bank Information" />
            <CardContent item md={9} xs={12}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        title: user?.bank_account?.title || "",
                        number: user?.bank_account?.number || "",
                        name: user?.bank_account?.name || "",
                        branch: user?.bank_account?.branch || "",
                        routing_number: user?.bank_account?.routing_number || "",
                        IBAN: user?.bank_account?.IBAN || "",
                        cheque_copy: user?.bank_account?.cheque_copy | "",
                        tax_category: user?.bank_account?.tax_category || "",
                    }}
                    onSubmit={onSubmit}
                >
                    {({ values }) => (
                        <Form>
                            <Box
                                sx={{
                                    backgroundColor: "white",
                                    boxShadow: 2,
                                    p: 2,
                                }}
                            >
                                <FormikInput id="title" name="title" label="Account Title" value={values.title} />
                                <FormikInput
                                    id="number"
                                    name="number"
                                    label="Account Number"
                                    type="number"
                                    value={values.number}
                                />
                                <FormikSelect
                                    id="name"
                                    name="name"
                                    label="Account Name"
                                    options={banks}
                                    value={values.name}
                                />
                                <FormikInput id="branch" name="branch" label="Bank Branch" value={values.branch} />
                                <FormikInput
                                    id="routing_number"
                                    name="routing_number"
                                    label="Routing Number"
                                    type="number"
                                    value={values.routing_number}
                                />
                                <FormikInput
                                    id="IBAN"
                                    name="IBAN"
                                    label="International Bank Account Number"
                                    value={values.IBAN}
                                />
                                <ImageInput
                                    id="image"
                                    name="image"
                                    label="Cheque Copy"
                                    ImageHandler={ImageHandler}
                                />
                                <img height="50px" width="50px" className="img-fluid ml-5" src={user?.bank_account?.cheque_copy ? user?.bank_account?.cheque_copy : ''} alt="Bank Account Check copy" />
                                <FormikInput
                                    id="tax_category"
                                    name="tax_category"
                                    label="Tax Category"
                                    value={values.tax_category}
                                />
                            </Box>
                            <Grid item sm={6} sx={{ my: 2 }}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button type="submit" variant="contained">
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
