import Cookies from 'js-cookie';
const ONE_DAY = 1;
const CookieSet = (res) => {
    Cookies.set('vendor', res.data.token, {
        expires: ONE_DAY,
        path: '/',
        secure: true,
        sameSite: 'None'
    })
}
export { CookieSet }