import React from 'react'

export default function InputField({ label, value, name, placeholder, required = false, onChange, type = "text" , fixed = false}) {
  return (
    <div className='grid grid-cols-6 my-3 sm:my-2'>
      <label htmlFor={name} className='col-span-6 sm:col-span-1 flex items-center mb-2 sm:mb-0 sm:justify-end mr-4'>
        {label}:
      </label>
      <div className='col-span-6 sm:col-span-5'>
        {
          fixed ? <span className='p-1'>{value}</span>: <input id={name} name={name} onChange={onChange} defaultValue={value} placeholder={placeholder} required={required} className='border w-full p-2 outline-[#D23E41]' type={type} />
        }
      </div>
    </div>
  )
}
