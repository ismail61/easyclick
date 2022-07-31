import React from 'react'

export default function SelectOption({ options = [], selected, label, value, name, placeholder, required = false, onChange, type = "text", address = false }) {
  return (
    <div className='grid grid-cols-6 my-2 sm:bg-transparent'>
      {label
        && <label htmlFor={name} className='col-span-1 flex items-center justify-end sm:mr-4'>
          {label} :
        </label>
      }
      {
        address ? <>
          <div className='col-span-5 '>
            <select onChange={onChange} required={required} className='outline-none border w-full sm:p-2 p-1'>
              <option>{selected}</option>
              {
                options?.length && options?.map((option, index) => {
                  return (<option selected={option.value === selected} className='hover:bg-[#D23E41]' key={index} value={option?.value}>{option?.value}</option>)
                })
              }
            </select>
          </div>
        </> : <>
          <div className='col-span-5 '>
            <center>
            <select onChange={onChange} required={required} className='outline-none border w-16 sm:p-2 p-1'>
              <option>Select</option>
              {
                options?.length && options?.map((option, index) => (<option selected={option.key === selected} className='hover:bg-[#D23E41]' key={index} value={option?.value}>{option?.key}</option>))
              }
            </select>
            </center>
          </div>
        </>
      }

    </div>
  )
}
