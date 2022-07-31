import Head from 'next/head'
import Toast from '../components/toast/Toast'
import axios from 'axios'
import { customer } from '../constants'
import Footer from '../layout/footer/Footer'
import Header from '../layout/header/Header'
import '../styles/globals.css'
import React, { useEffect, useState } from 'react'
import MobileFooter from '../layout/mobile/footer/MobileFooter'
import https from 'https'
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../components/auth/context"
import { Auth } from '../adapters/auth/auth'
import { TryCatch } from '../utils'
axios.defaults.headers.common['Authorization'] = customer || ""
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(customer ? true : false),
    readCookie = async () => {
      if (customer && isAuthenticate()) {
        setUser(true);
      } else {
        setUser(false);
      }
    }
  const isAuthenticate = async () => {
    TryCatch(async () => {
      const res = await Auth(customer);
      return (((res?.data) === true) ? true : false)
    })
  }

  useEffect(() => {
    readCookie();
  }, [])

  return (
    <>
      <UserContext.Provider value={user}>
        <div className='relative scroll-smooth'>
          <Head>
            <title>Esyclick</title>
            <link rel="icon" href="/images/logo.png" />
          </Head>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
          <div className='sm:hidden'>
            <MobileFooter />
          </div>
        </div>
      </UserContext.Provider>
      <Toast />
    </>
  )
}

export default MyApp
