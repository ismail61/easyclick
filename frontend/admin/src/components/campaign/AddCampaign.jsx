import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, CardHeader, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import FormikInput from 'components/Input/FormikInput';
import DateRangePicker from 'components/Date/DateRangePicker';
import { ErrorToast, FormDataAppend, SuccessToast } from 'utils';
import { useNavigate } from 'react-router-dom';
import { addCampaign } from 'services/promotions/Promotion.Service';
import { useState } from 'react';
import FormikRichText from 'components/Input/FormikRichText';
import Loader from 'layouts/loader/loader';
import { ImageInput } from 'components';

export default function AddCampaign() {
    const [value, setValue] = useState("");
    const [loader, setLoader] = useState(false)
    const [image, setImage] = useState(null);
    const history = useNavigate();
    const initialValues = {
        title: undefined,
        name: undefined,
        campaign_start_time: undefined,
        campaign_end_time: undefined,
        registration_end_time: undefined,
        discount: undefined,
        description: undefined,
    }
    const onSubmit = async (values) => {
        values.description = value;
        try {
            if (!image) {
                ErrorToast('Please select an image');
            }
            else {
                setLoader(true);
                const formData = new FormData();
                const getFormData = FormDataAppend(formData, values, Object.keys(values));
                getFormData.append('image', image);
                await addCampaign(getFormData);
                SuccessToast("New Campaign Added Successful");
                history('/')
            }
        } catch (error) {
            if (error.response) {
                ErrorToast(error.response?.data?.err);
            }
        }
        finally {
            setLoader(false);
        }
    }
    const ImageHandler = (e) => {
        setImage(e.target.files[0])
    }
    const StartDateHandler = (date, dateString, setFieldValue) => {
        setFieldValue('campaign_start_time', dateString)
    }
    const EndDateAndTimeHandler = (date, dateString, setFieldValue) => {
        setFieldValue('campaign_end_time', dateString)
    }
    const EndDateHandler = (date, dateString, setFieldValue) => {
        setFieldValue('registration_end_time', dateString)
    }

    return (
        <Card>
            <CardHeader
                title="Campaign Details"
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
                                <FormikInput id='name' name='name' label='Campaign Name' placeholder='Use letters and numbers. e.g. EID2022' />
                                <FormikInput id='title' name='title' label='Campaign Title' placeholder='Campaign Title Here' />

                                <ImageInput
                                    id="image"
                                    name="image"
                                    label="Image"
                                    ImageHandler={ImageHandler}
                                />
                                <DateRangePicker id="campaign_start_time" name="campaign_start_time" label='Campaign Start Time' placeholder="Start Date" time={true} setFieldValue={setFieldValue} StartDateHandler={StartDateHandler} />
                                <DateRangePicker id="campaign_end_time" name="campaign_end_time" label='Campaign End Time' placeholder="End Date" time={true} EndDateAndTimeHandler={EndDateAndTimeHandler} setFieldValue={setFieldValue} />
                                <DateRangePicker id="registration_end_time" name="registration_end_time" label='Registration End Time' placeholder="End Date" EndDateHandler={EndDateHandler} setFieldValue={setFieldValue} />
                                <FormikInput id='discount' name='discount' label='Discount(%)' placeholder='Discount Percentage' type="number" />
                                <FormikRichText
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={value}
                                    setValue={setValue}
                                />
                            </Box>
                            <Grid item sm={6} sx={{ my: 2 }}>
                                {
                                    loader ? <Loader /> :
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button type='submit' variant='contained'>Submit</Button>
                                        </Box>
                                }
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
}
