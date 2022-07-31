import React, { useEffect } from 'react'
import Cookies from 'js-cookie';

const Logout = () => {
    useEffect(() => {
        Cookies?.remove('admin', { path: '/' });
        window.location.reload(true);
        window.location.href = ('/#/sign-in')
    }, [])

    return (
        <></>
    )
}

export default Logout