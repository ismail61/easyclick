import React, { useState, useContext } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ErrorToast, SuccessToast, CookieSet } from "utils";
import { EmailSignInValidation } from "validations";
import { sendOtp, signIn } from "adapters/auth/signin";
import AuthApi from "store/AuthApi";
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import Loader from "layouts/loader/loader";
const THREE_MINUTES = 3 * 60 * 1000;

const SignIn = () => {
    const [email, setEmail] = useState(''),
        [loader, setLoader] = useState(false),
        context = useContext(AuthApi),
        handleSubmit = async (e) => {
            e.preventDefault();
            setLoader(true);
            try {
                const validation = EmailSignInValidation({ email });
                if (validation.error) return ErrorToast(validation.error?.details[0].message);
                const response = await sendOtp({ email });
                setLoader(false);
                if (response?.data) {
                    const res = await Swal.fire({
                        text: `Enter the Password. Please Check your Email`,
                        input: 'text',
                        confirmButtonText: 'Submit',
                        timer: THREE_MINUTES,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        inputValidator: (value) => {
                            if (!value) {
                                return 'You need to input your Password!'
                            }
                        },
                    })
                    if (res?.isConfirmed && res?.value) {
                        setEmail('');
                        setLoader(true)
                        const tokenResponse = await signIn({ email, password: res?.value });
                        context?.setUser(true);
                        console.log(tokenResponse?.data?.token)
                        CookieSet(tokenResponse);
                        window.location.reload(true);
                        window.location.href = ('/')
                    }
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
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {
                    loader ? < Loader /> : <>
                        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Esy Click
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 3, backgroundColor: '#FA9F34',
                                    color: 'white',
                                    ':hover': {
                                        bgcolor: '#7F1E15',
                                        color: 'white',
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box></>
                }
            </Box>
        </Container>
    );
};
export default SignIn;
