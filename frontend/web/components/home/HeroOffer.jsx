import React from 'react'
import OfferSlider from './HeroOfferSlider'

export default function TopOffer({ campaigns }) {
  return (
    <div className='rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mt-10'>
      <div className='grid grid-cols-3'>
        <div className=' p-4'>
          <h4 className='text-xl font-semibold text-white'>Welcome!</h4>
          <p className='mt-4 text-white'>All Campaigns is Here...</p>
        </div>
        <div className='col-span-2'>
          <OfferSlider campaigns={campaigns} />
        </div>
      </div>
    </div>
  )
}
