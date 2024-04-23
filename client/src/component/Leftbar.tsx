import React from 'react'
import '../style/Leftbar.css'

function Leftbar() {
  return (
    <div className='Leftbar-container'>
      <div className='filter-container'>
          <input placeholder='Rating'></input>
          <input placeholder='Category'></input>
          <input placeholder='Budget'></input>
          <input placeholder='Country'></input>
          <input placeholder='Province'></input>
          <button type='submit'>FILTER</button>
      </div>
    </div>
  )
}

export default Leftbar
