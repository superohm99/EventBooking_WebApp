import React from 'react'
import '../style/Leftbar.css'

function Leftbar() {
  return (
    <div className='Leftbar-container'>
      <div className='filter-container'>
          <input placeholder='RATING'></input>
          <input placeholder='CATEGORY'></input>
          <input placeholder='BUDGET'></input>
          <input placeholder='LOCATION'></input>
          <button type='submit'>FILTER</button>
      </div>
    </div>
  )
}

export default Leftbar
