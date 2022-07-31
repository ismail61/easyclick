import React from 'react'
import HeroCategory from './HeroCategory'
import HeroOffer from './HeroOffer'
import HeroSlider from './HeroSlider'

export default function HeroSection({ categories, banners, campaigns }) {
  return (
    <div className='mx-auto px-8'>
      <div className='lg:grid xl:grid-cols-5 lg:grid-cols-4 lg:gap-4 md:grid md:grid-cols-4 md:gap-4 px-2'>
        {/* Category sidebar */}
        <HeroCategory categories={categories} />

        {/* Center contents */}
        <div className='md:col-span-3 lg:col-span-3 xl:col-span-4 sm:mt-10 md:mt-5 rounded-lg mb-4'>
          <HeroSlider banners={banners} />
        </div>
      </div>
    </div>
  )
}
