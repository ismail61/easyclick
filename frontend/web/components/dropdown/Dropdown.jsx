import React from "react";

export default function Dropdown({ data }) {

  const { title, options } = data
  return (
    <div className="group">
      <span>
        {title}<i className={`ml-1 fa-light fa-chevron-right transition-all duration-300 rotate-90 group-hover:-rotate-90`}></i>
      </span>
      <div className={`transition-all duration-500 relative hidden group-hover:block`}>
        <div className='absolute right-0 top-0 bg-white shadow-lg p-4 whitespace-nowrap z-50'>
          {options?.map((option, index) => {
            return <div key={index}>{option?.title}</div>
          })}
        </div>
      </div>
    </div>
  )
}
