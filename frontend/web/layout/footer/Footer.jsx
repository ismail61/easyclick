import React from 'react'

export default function Footer() {
  return (
    <div className='bg-white'>
      <div className='container mx-auto mb-4 p-4'>
        {/* Footer section 2 */}
        <div>
          <div className='grid sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-y-8 mt-8 py-8 p-4'>
            <div className='xl:col-span-2 xl:p-4'>
              <div>
                <h4 className='text-xl mb-2 font-semibold text-gray-600'>Stay connected With</h4>
                <div>
                  <ul className='flex'>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer text-blue-500'><i className="fa-brands fa-facebook"></i></li>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer text-fuchsia-500'><i className="fa-brands fa-instagram"></i></li>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer text-[#1DA1F2]'><i className="fa-brands fa-twitter"></i></li>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer text-red-500'><i className="fa-brands fa-youtube"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='pl-8'>
                <h4 className='text-lg font-semibold'>Contact us</h4>
                <ul className='mt-2'>
                  <li className='mt-2 text-sm text-gray-400'>Phone: 0340238668</li>
                  <li className='mt-2 text-sm text-gray-400'>Email: esyclick2022@gmail.com</li>
                  <li className='mt-2 text-sm text-gray-400'>Address: Jln 2/27a, Off jin usahawan, Bdr baru wangsa maju, 53300 kualalampur, Malaysia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer 3 section */}
      <div className='bg-[#333333] py-4'>
        <div className='container mx-auto text-gray-400 flex justify-center items-center'>
          ©️2022-{new Date().getFullYear()} All rights reserved. Developed By Bit Encrypt IT.
        </div>
      </div>
    </div>
  )
}
