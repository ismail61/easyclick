import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { ResetTokenCodeVerify } from '../../adapters/auth/signin';
import { ErrorToast } from '../../utils'

export default function ResetToken({ token }) {
    const router = useRouter();
    const tokenPopup = async () => {
        if (token?.length != 32) {
            router?.push('/')
        }
        else {
            Swal.fire({
                title: 'Secure Password',
                input: 'text',
                confirmButtonText: 'Submit',
                allowOutsideClick: false,
                inputPlaceholder: 'Enter a secure Password',
                inputValidator: (value) => {
                    if (!value) {
                        return 'Please Enter a password!'
                    }
                }
            }).then(async (result) => {
                try {
                    if (result?.value) {
                        await ResetTokenCodeVerify({ password: result?.value, resetPasswordToken: token });
                        await Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Password Reset Successful',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        router.push('/auth/sign-in')
                    }
                } catch (error) {
                    ErrorToast(error?.response?.data?.err || 'Failed!')
                    router.push('/')
                } finally {
                }
            })
        }
    }
    if (token) {
        tokenPopup()
    }

    return (
        <div className='sm:mt-[48px] md:mt-[10px] mobile-page'>

        </div>
    )
}

export async function getServerSideProps(context) {
    if (context.query?.token) {
        return {
            props: {
                token: context.query?.token
            },
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }
}

