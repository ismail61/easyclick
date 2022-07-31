import React from 'react'
import Link from 'next/link'

export default function HeroCategory() {
  return (
    <div className='grid grid-cols-5 gap-2 p-4 mt-5'>
      <div>
        <Link passHref href="/category/mens-fashion">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-cyan-600'>
              <i className="fa-duotone fa-shuttlecock"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Badminton
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/womens-fashion">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-red-600'>
              <i className="fa-solid fa-table-tennis-paddle-ball"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Tennis
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/computer-accessories">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-pink-600'>
              <i className="fa-solid fa-cricket-bat-ball"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Cricket
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/phones-accessories">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-yellow-600'>
              <i className="fa-duotone fa-futbol"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Football
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/consumer-electronics">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-amber-600'>
              <i className="fa-duotone fa-racquet"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Racket
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/jewelry-watches">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-blue-600'>
              <i className="fa-duotone fa-person-digging"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Kabaddi
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/toys-kids-babies">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-orange-600'>
              <i className="fa-duotone fa-dumbbell"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Gymnasium
            </div>
          </div>
        </Link>
      </div>

      <div>
        <Link passHref href="/category/outdoor-fun-and-sportss">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-orange-500'>
              <i className="fa-duotone fa-person-walking"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Fitness
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/beauty-health-hair">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-blue-600'>
              <i className="fa-duotone fa-person-swimming"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Swimming
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link passHref href="/category/home-improvement-tools">
          <div className='flex flex-col items-center'>
            <div className='text-xl h-12 w-12 flex justify-center items-center rounded-full text-white bg-orange-600'>
              <i className="fa-duotone fa-field-hockey-stick-ball"></i>
            </div>
            <div className='text-xs mt-1 text-center'>
              Hockey
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
