import React from 'react'

export const InnerMenuComponent = ({name,onClick}) => {
  return (
    <div
    onClick={onClick}
    className='text-black flex justify-center py-2 cursor-pointer'
    >{name}</div>
  )
}


