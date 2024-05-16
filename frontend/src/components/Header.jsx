import React from 'react'

function Header({title}) {
  return (
    <div className = " font-bold content-center text-2xl">
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Header
