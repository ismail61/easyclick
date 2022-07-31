import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import Link from "next/link";
import Cookies from "js-cookie";
import { getUserData } from "../../adapters/user";
import { getCustomerCart } from "../../adapters/cart";
import { getAllCategories } from "../../adapters/category";
import { useRouter } from 'next/router'

export default function Header() {

  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [cart, setCart] = useState(null);
  const [selected, setSelected] = useState("");
  const router = useRouter()

  useEffect(() => {
    const fetcher = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories?.data)
        const userResponse = await getUserData();
        setUser(userResponse?.data);
        const cartResponse = await getCustomerCart();
        setCart(cartResponse?.data);
      } catch (error) { }
    };
    fetcher();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    setUser(null);
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      var neededAttributes = {
      };
      Cookies.remove(cookieName, neededAttributes);
    });
    location.href = "/auth/sign-in";
  };

  const searchEnterButtonHandle = (event) => {
    if (event.keyCode === 13 && searchValue) {
      router.push({
        pathname: '/products',
        query: { value: searchValue }
      })
    }
  }
  const searchHandle = () => {
    router.push({
      pathname: '/products',
      query: { value: searchValue }
    })
  };

  const account = {
    title: (
      <>
        <i className="fa-solid fa-user-alien"></i>
        <span className="mx-2">Profile</span>
      </>
    ),
    options: [
      {
        title: (
          <>
            <Link passHref href="/orders">
              <div className={`py-2 transition-all duration-200 hover:underline ${router?.pathname === '/orders' && 'text-[#d23e41]'}`}>
                <i className="fa-brands fa-jedi-order"></i> Orders
              </div>
            </Link>
          </>
        ),
      },
      {
        title: (
          <>
            <Link passHref href="/vouchers">
              <div className={`py-2 transition-all duration-200 hover:underline ${router?.pathname === '/vouchers' && 'text-[#d23e41]'}`}>
                <i className="fa-solid fa-gift-card"></i> Vouchers
              </div>
            </Link>
          </>
        ),
      },
      {
        title: (
          <>
            <Link passHref href="/account">
              <div className={`py-2 transition-all duration-200 hover:underline ${router?.pathname === '/account' && 'text-[#d23e41]'}`}>
                <i className="fa-solid fa-user"></i> Account
              </div>
            </Link>
          </>
        ),
      },
      {
        title: (
          <>
            {
              user && user.merchant ? <>
                <Link passHref href="/wallet">
                  <div className={`py-2 transition-all duration-200 hover:underline ${router?.pathname === '/wallet' && 'text-[#d23e41]'}`}>
                    <i className="fa-solid fa-wallet"></i> My Wallet
                  </div>
                </Link>
              </> : null
            }
          </>
        ),
      },
      {
        title: (
          <>
            <Link passHref href="#">
              <div onClick={handleLogout} className="py-2">
                <i className="fa-solid fa-right-from-bracket"></i> Log Out
              </div>
            </Link>
          </>
        ),
      },
    ],
  };

  return (
    <div className="shadow w-full">
      {/* <TopHeader/> */}
      <div className="bg-[#fafafa] hidden sm:block">
        <div className="flex h-[42px] container mx-auto">
          <ul className="flex ml-auto hover:cursor-pointer">
            {user && (
              <li className="px-4 my-auto border-x-2">
                <i className="fa-light fa-heart mr-2" style={{ color: 'red' }}></i>
                <Link href="/wishlist">Wishlist</Link>
              </li>
            )}
            {!user && (
              <li className="px-4 my-auto border-x-2">
                <Link href="/auth/register">Register</Link>
              </li>
            )}
            <li className="px-4 my-auto ">
              {user ? (
                <Dropdown data={account} />
              ) : (
                <Link href="/auth/sign-in">Sign in</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Main Header */}
      <div className="bg-white shadow-sm md:mt-0 sm:shadow-none fixed top-0 z-50 sm:z-40 sm:relative sm:h-[96px] w-full">
        <div className="container py-2 mx-auto">
          <div className="grid grid-cols-5 gap-4">
            <div className="h-100 flex justify-center items-center cursor-pointer">
              <Link passHref href="/">
                <div>
                  <Image
                    src="/images/logo.png"
                    width="120px"
                    height="100px"
                    alt="esyclick"
                  />
                </div>
              </Link>
            </div>

            {/* Search section */}
            <div className="col-span-4 sm:col-span-3 mr-2 sm:mr-0 my-auto sm:mb-12 mb-6 pr-6">
              <div className="flex border-2 border-[blue] box-border h-[38px]">
                <div className="flex w-full">
                  <input
                    className="w-full px-4 outline-none"
                    type="text"
                    placeholder="Search Here"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => searchEnterButtonHandle(e)}
                  />
                  <div className="bg-[green] px-4 py-2 hover:cursor-pointer" onClick={searchHandle}>
                    <strong><i className="fa-light fa-magnifying-glass text-black"></i></strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart section */}
            <div className="justify-start items-center hidden sm:flex mb-6">
              <Link passHref href="/cart">
                <div className="relative hover:cursor-pointer">
                  <i className="fa-light fa-cart-shopping text-2xl"></i>
                  {cart?.items && (
                    <small className="bg-[yellow] p-1 rounded-full text-black text-xs absolute top-[-8px] right-[-5px]">
                      <b>{cart?.items?.length || 0}</b>
                    </small>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <ul className="w-24 category-hide-plz flex sm:block md:hidden lg:hidden xl:hidden mt-2">
          <li className="group relative dropdown px-4 cursor-pointer font-bold text-base tracking-wide mt-3">
            <u className="text-xl">
              <i className="fa fa-xl text-orange-900 m-3 fa-th-list"></i>
            </u>
            <div className="w-[220px] group-hover:block dropdown-menu absolute hidden h-auto mt-3 relative">
              <div className="nestedsidemenu">
                <ul>
                  {
                    categories?.length > 0 ? <>
                      {
                        categories?.map(item => {
                          return <>
                            {
                              item?.root === 'undefined' ? <>
                                <li>
                                  <Link href={`category/${item?.slug}` || "/"} passHref>
                                    {item.value}
                                  </Link>
                                  {
                                    item?.children?.length > 0 ? <>
                                      <ul>
                                        {
                                          item?.children?.map((child1, index) => {
                                            return <>
                                              <li>
                                                <Link href={`category/${child1?.slug}` || "/"} passHref>{child1.value}</Link>
                                                {
                                                  child1?.children?.length > 0 ? <>
                                                    <ul>
                                                      {
                                                        child1?.children?.map((child2, index) => {
                                                          return <>
                                                            <li>
                                                              <Link href={`category/${child2?.slug}` || "/"} passHref>{child2.value}</Link>
                                                              {
                                                                child2?.children?.length > 0 ? <>
                                                                  <ul>
                                                                    {
                                                                      child2?.children?.map((child3, index) => {
                                                                        return <>
                                                                          <li>
                                                                            <Link href={`category/${child3?.slug}` || "/"} passHref>{child3.value}</Link>
                                                                            {
                                                                              child3?.children?.length > 0 ? <>
                                                                                <ul>
                                                                                  {
                                                                                    child3?.children?.map((child4, index) => {
                                                                                      return <>
                                                                                        <li>
                                                                                          <Link href={`category/${child4?.slug}` || "/"} passHref>{child4.value}</Link>
                                                                                          {
                                                                                            child4?.children?.length > 0 ? <>
                                                                                              <ul>
                                                                                                {
                                                                                                  child4?.children?.map((child5, index) => {
                                                                                                    return <>
                                                                                                      <li>
                                                                                                        <Link href={`category/${child5?.slug}` || "/"} passHref>{child5.value}</Link>
                                                                                                      </li>
                                                                                                    </>
                                                                                                  })
                                                                                                }
                                                                                              </ul>
                                                                                            </> : null
                                                                                          }
                                                                                        </li>
                                                                                      </>
                                                                                    })
                                                                                  }
                                                                                </ul>
                                                                              </> : null
                                                                            }
                                                                          </li>
                                                                        </>
                                                                      })
                                                                    }
                                                                  </ul>
                                                                </> : null
                                                              }
                                                            </li>
                                                          </>
                                                        })
                                                      }
                                                    </ul>
                                                  </> : null
                                                }
                                              </li>
                                            </>
                                          })
                                        }
                                      </ul>
                                    </> : null
                                  }
                                </li>
                              </>
                                : null
                            }
                          </>
                        })
                      }
                    </> : null
                  }
                </ul></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

