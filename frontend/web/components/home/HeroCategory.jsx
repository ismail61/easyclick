import Link from 'next/link'
import React from 'react'

export default function HeroCategory({ categories = [] }) {
  return (
    <div className='bg-white my-4 shadow-sm rounded-md p-4 category-slider'>
      <div>
        <div className='text-center text-xl border-b-2 pb-2'><i className="fa-solid fa-list"></i> Categories</div>
      </div>
      <div>
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
                              item.children.length > 0 ? <>
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
                                                  child1?.children.map((child2, index) => {
                                                    return <>
                                                      <li>
                                                        <Link href={`category/${child2?.slug}` || "/"} passHref>{child2.value}</Link>
                                                        {
                                                          child2?.children?.length > 0 ? <>
                                                            <ul>
                                                              {
                                                                child2?.children.map((child3, index) => {
                                                                  return <>
                                                                    <li>
                                                                      <Link href={`category/${child3?.slug}` || "/"} passHref>{child3.value}</Link>
                                                                      {
                                                                        child3?.children?.length > 0 ? <>
                                                                          <ul>
                                                                            {
                                                                              child3?.children.map((child4, index) => {
                                                                                return <>
                                                                                  <li>
                                                                                    <Link href={`category/${child4?.slug}` || "/"} passHref>{child4.value}</Link>
                                                                                    {
                                                                                      child4?.children?.length > 0 ? <>
                                                                                        <ul>
                                                                                          {
                                                                                            child4?.children.map((child5, index) => {
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
          </ul>
        </div>
      </div>
    </div>
  )
}