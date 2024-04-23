import React from 'react'
import '../style/Reserve.css'
import Navbar from './Navbar'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Bottombar from './Bottombar'
import Reserve_container from './Reserve_container'

function Reserve() {
  return (
    <div>
      <Navbar/>
      <div className='sidebar'>
      <Leftbar/>
      
        <div className='colunm-container'>
          <Reserve_container/>
          <div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
          </div>
        </div>

      <Rightbar/>
      </div>

      <div className='Bottombar'>
        <Bottombar/>
      </div>
    </div>
  )
}

export default Reserve
