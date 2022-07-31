import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, CardHeader, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import FormikInput from 'components/Input/FormikInput';
import FormikSelect from 'components/Input/FormikSelect';
import { useState } from 'react';
import DateRangePicker from 'components/Date/DateRangePicker';
import { SuccessToast, TryCatch } from 'utils';
import { useNavigate } from 'react-router-dom';
import { addVoucher } from 'services/promotions/Promotion.Service';

export default function AddVoucher() {
    const [discountType, setDiscountType] = useState('');
    const history = useNavigate();
    const initialValues = {
        name: undefined,
        start_from: undefined,
        end_time: undefined,
        code: undefined,
        discount_type: undefined,
        discount_amount: undefined,
        discount_amount_percentage: undefined,
        max_discount_amount: undefined,
        min_amount_to_apply: undefined,
        total_issued_voucher: undefined
    }
    const onSubmit = (values) => {
        TryCatch(async () => {
            await addVoucher(values);
            SuccessToast("New Voucher Added");
            history('/')
        });
    }
    const StartDateHandler = (date, dateString, setFieldValue) => {
        setFieldValue('start_from',dateString)
    }
    const EndDateHandler = (date, dateString, setFieldValue) => {
        setFieldValue('end_time',dateString)
    }
    return (
        <Card>
            <CardHeader
                title="Voucher Details"
            />
            <CardContent item md={9} xs={12}>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Box
                                sx={{
                                    backgroundColor: 'white',
                                    boxShadow: 2,
                                    p: 2
                                }}
                            >
                                <FormikInput id='name' name='name' label='Name' />
                                <DateRangePicker id="start_from" name="start_from" label='Start Date' placeholder="Start Date" setFieldValue={setFieldValue} StartDateHandler={StartDateHandler} />
                                <DateRangePicker id="end_time" name="end_time" label='End Time' placeholder="End Date" EndDateHandler={EndDateHandler} setFieldValue={setFieldValue}/>
                                <FormikInput id='code' name='code' label='Code' placeholder='e.g. ESYCLICK123' />
                                <span onClick={(e) => setDiscountType(e.target.value || discountType)}>
                                    <FormikSelect id='discount_type' name='discount_type' label='Discount Type' options={[{ name: 'MONEY_VALUE_VOUCHER' }, { name: 'PERCENTAGE_VALUE_VOUCHER' }]} />
                                </span>
                                {discountType && discountType === 'MONEY_VALUE_VOUCHER' ?
                                    <FormikInput id='discount_amount' name='discount_amount' label='Discount Amount' type="number" /> : null
                                }
                                {discountType && discountType === 'PERCENTAGE_VALUE_VOUCHER' ?
                                    <><FormikInput id='discount_amount_percentage' name='discount_amount_percentage' label='Discount Value %' type="number" />
                                        <FormikInput id='max_discount_amount' name='max_discount_amount' label='Maximum Discount(BDT)' type="number"/>
                                    </> : null
                                }

                                <FormikInput id='min_amount_to_apply' name='min_amount_to_apply' label='Minimum Amount to apply(BDT)' type="number" />
                                <FormikInput id='total_issued_voucher' name='total_issued_voucher' label='Total Issued Voucher' type="number" />
                            </Box>
                            <Grid item sm={6} sx={{ my: 2 }}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button type='submit' variant='contained'>Submit</Button>
                                </Box>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
