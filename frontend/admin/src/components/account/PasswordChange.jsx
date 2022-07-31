import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, CardHeader, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import FormikInput from 'components/Input/FormikInput';
import { ChangePassword } from 'services/account/AcountInformation';
import { SuccessToast, TryCatch } from 'utils';
import { useNavigate } from 'react-router-dom';

export default function PasswordChangeCard() {
    const history = useNavigate();
    const initialValues = {
        old_password: '',
        new_password: '',
        repeat_password: ''
    }
    const onSubmit = async (values) => {
        TryCatch(async () => {
            await ChangePassword(values);
            SuccessToast('Password Changed Successful');
            history('/log-out')
        });
    }
    return (
        <Card>
            <CardHeader
                title="Change Password"
            />
            <CardContent item md={9} xs={12}>
                <Typography sx={{ color: 'red' }}>
                    Password must be minimum 6 Characters with one special character and one number!
                </Typography>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    <Form>
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                boxShadow: 2,
                                p: 2
                            }}
                        >
                            <FormikInput id='old_password' name='old_password' label='Old Password' type="password" />
                            <FormikInput id='new_password' name='new_password' label='New Password' type="password"/>
                            <FormikInput id='repeat_password' name='repeat_password' label='Repeat Password'type="password" />

                        </Box>
                        <Grid item sm={6} sx={{ my: 2 }}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button type='submit' variant='contained'>Submit</Button>
                            </Box>
                        </Grid>
                    </Form>
                </Formik>
            </CardContent>
        </Card>
    );
}
