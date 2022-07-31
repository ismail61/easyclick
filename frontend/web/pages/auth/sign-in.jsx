import React from 'react'
import LogInForm from '../../components/auth/sign-in/LogInForm'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { ErrorToast } from '../../utils'
import { ResetTokenCodeSend } from '../../adapters/auth/signin'

export default function signIn({ prev }) {
  const handleLoginWithGoogleSuccess = () => {

  }

  const handleLoginWithGoogleFailure = () => {

  }

  const forgotPasswordHandle = async () => {
    const res = await Swal.fire({
      title: 'Reset Password',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      inputPlaceholder: 'Email Address',
      inputValidator: (value) => {
        if (!value) {
          return 'Enter your email!'
        }
        if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)?.test(value)) {
          return 'Enter your valid email!'
        }
      }
    })
    if (res?.isConfirmed && res?.value) {
      try {
        await ResetTokenCodeSend({ email: res?.value });
        await Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'New Password has been send in you Email.',
          showConfirmButton: false,
          timer: 5000
        })
      } catch (error) {
        ErrorToast('Email Send Failed!.Please Try Again')
      } finally {
      }
    }
  }

  return (
    <div className='container mx-auto sm:mt-[48px] md:mt-[10px] mobile-page p-8'>
      <div className='flex justify-center items-center'>
        <div className='bg-white p-4 shadow-lg w-full sm:w-[360px]'>
          <div>
            <h4 className='text-center text-xl font-semibold mb-4'>Sign in <i className="fas fa-sign-in-alt"></i></h4>
          </div>
          <LogInForm prev={prev} />
          <div className='flex'>
            <div className='underline hover:cursor-pointer text-gray-500 mt-2 flex-1'>
              <Link href="/auth/register">Don’t have an account?</Link>
            </div>
            <div className='underline hover:cursor-pointer text-gray-500 mt-2'>
              <div onClick={forgotPasswordHandle}>Trouble SignIn?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const referer = context.req.headers.referer;
  const slice = referer?.split('https://esyclick.com/');
  // const slice = referer?.split('http://localhost:3000/');
  if (slice && slice?.length > 0 && slice[1] !== 'auth/sign-in' && slice[1] !== 'auth/register') {
    return {
      props: {
        prev: `/${slice[1]}`
      }
    }
  } else {
    return {
      props: {
        prev: '/'
      }
    }
  }


}
