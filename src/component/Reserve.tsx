import React from 'react'
import '../style/Reserve.css'
import Navbar from './Navbar'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Bottombar from './Bottombar'

function Reserve() {
  return (
    <div>
      <Navbar/>
      <div className='sidebar'>
      <Leftbar/>
      <Rightbar/>
      </div>

      <div className='Bottombar'>
        <Bottombar/>
      </div>
    </div>
  )
}

export default Reserve
