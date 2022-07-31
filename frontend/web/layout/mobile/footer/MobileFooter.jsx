import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getCustomerCart } from '../../../adapters/cart';
import { getCustomerAllOrders } from '../../../adapters/order';
import { getUserData } from '../../../adapters/user';
import Cookies from "js-cookie";

export default function MobileFooter() {
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState(null);
  const [user, setUser] = useState(null)
  const router = useRouter();
  const fetcher = async () => {
    try {
      const userResponse = await getUserData();
      setUser(userResponse?.data);
      const cartResponse = await getCustomerCart();
      setCart(cartResponse?.data);
      const orderResponse = await getCustomerAllOrders();
      if (orderResponse.data?.length) {
        setOrders(orderResponse?.data[0]?.orders)
      }
    } catch (error) { }
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    Object.keys(Cookies.get()).forEach(function (cookieName) {
      var neededAttributes = {};
      Cookies.remove(cookieName, neededAttributes);
    });
    location.href = "/auth/sign-in";
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white py-2 shadow-lg border-t-2 border-[#d23e41]'>
      <div className='flex justify-around'>
        <Link passHref href="/" className='flex flex-col items-center'>
          <div className={`flex flex-col items-center text-sm ${router.pathname === '/' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-house text-2xl"></i></div>
            Home
          </div>
        </Link>
        <Link passHref href='/cart'>
          <div className={`flex flex-col items-center text-sm relative ${router.pathname === '/cart' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-bag-shopping text-2xl"></i></div>
            Cart
            <div className='bg-[#d23e41] absolute -top-0 -right-2 shadow-lg text-xs text-white px-1 rounded-full'>
              {cart?.items?.length || 0}
            </div>
          </div>
        </Link>

        <Link passHref href="/categories">
          <div className={`flex flex-col items-center text-sm ${router.pathname === '/categories' && 'text-[#d23e41]'}`}>
            <div><i className="fa-solid fa-bars text-2xl"></i></div>
            Categories
          </div>
        </Link>
        {
          orders?.length > 0 ? <>
            <Link passHref href='/orders'>
              <div className={`flex flex-col items-center text-sm relative ${router.pathname === '/orders' && 'text-[#d23e41]'}`}>
                <div><i className="fa-brands fa-first-order text-2xl"></i></div>
                Orders
                <div className='bg-[#d23e41] absolute -top-0 -right-2 shadow-lg text-xs text-white px-1 rounded-full'>
                  {orders?.length || 0}
                </div>
              </div>
            </Link>
          </> : null
        }
        <Link passHref href='/account'>
          <div className={`flex flex-col items-center text-sm ${router.pathname === '/account' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-user text-2xl"></i></div>
            Account
          </div>
        </Link>
        {
          user && user.merchant ?
            <Link passHref href='/wallet'>
              <div className={`flex flex-col items-center text-sm ${router.pathname === '/wallet' && 'text-[#d23e41]'}`}>
                <div><i className="fas fa-money-bill-alt text-2xl"></i> </div>
                Wallet
              </div>
            </Link> : null
        }
        {
          user ?
            <Link passHref href='/log-out'>
              <div onClick={handleLogout} className={`flex flex-col items-center text-sm ${router.pathname === '/log-out' && 'text-[#d23e41]'}`}>
                <div><i className="fas fa-sign-out-alt text-2xl"></i></div>
                Log Out
              </div>
            </Link> : null
        }
      </div>
    </div>
  )
}
