import Cookies from 'js-cookie';
const ONE_DAY = 1;
const CookieSet = async (res) => {
    await Cookies.set('admin', res?.data?.token, {
        expires: ONE_DAY,
        path: '/',
        secure: true,
        sameSite: 'None'
    })
}
export { CookieSet }