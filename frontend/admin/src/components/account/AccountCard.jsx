import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, CardHeader, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "components/Input/FormikInput";
import { getSellerAccountInfo as SellerAccount, updateSellerAccountInfo } from "services/account/AcountInformation";
import { ErrorToast, SuccessToast, TryCatch } from "utils";
import { sellerAccountInfoValidation } from "validations";

export default function AccountCard() {
    const [user, setUser] = useState({});
    const onSubmit = (values) => {
        TryCatch(async () => {
            const validation = sellerAccountInfoValidation(values);
            if (validation.error) return ErrorToast(validation.error?.details[0].message);
            await updateSellerAccountInfo({ name: values.name, phone: values.phone });
            SuccessToast('Account Updated Successful')
        });
    };
    const getSellerAccountInfo = () => {
        TryCatch(async () => {
            const response = await SellerAccount();
            setUser(response?.data);
        });
    };
    useEffect(() => {
        getSellerAccountInfo();
    }, []);

    return (
        <Card>
            <CardHeader title="Seller Account" />
            <CardContent item md={9} xs={12}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: user?.seller_account?.name || '',
                        phone: user?.seller_account?.phone || '',
                        email: user?.seller_account?.email || '',
                        seller_id: user?.seller_id || '',
                        shop_name: user?.seller_account?.shop_name || ''
                    }}
                    onSubmit={onSubmit}
                >
                    {
                       ({values}) => (
                            <Form>
                                <Box
                                    sx={{
                                        backgroundColor: "white",
                                        boxShadow: 2,
                                        p: 2,
                                    }}
                                >
                                    <FormikInput
                                        id="id"
                                        name="seller_id"
                                        label="Seller Id"
                                        fixed={values.seller_id}
                                    />
                                    <FormikInput id="name" name="name" label="Full Name" />
                                    <FormikInput
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        fixed={values.email}
                                    />
                                    <FormikInput
                                        id="phone"
                                        name="phone"
                                        label="Phone Number"
                                        type="number"
                                        value={values.phone}
                                    />
                                    <FormikInput
                                        id="shop_name"
                                        name="shop_name"
                                        label="Shop Name"
                                        fixed={values.shop_name}
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
                        )
                    }
                </Formik>
            </CardContent>
        </Card>
    );
}
