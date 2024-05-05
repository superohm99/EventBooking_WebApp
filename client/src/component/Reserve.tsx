import '../style/Reserve.css'
import Navbar from './Navbar'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Bottombar from './Bottombar'
import Reserve_container from './Reserve_container'
import { useState } from 'react'



function Reserve() {
  
  const [filter, setFilter] = useState('');
  
  const handleButton = (data: string) => {
    console.log("fuck");
    console.log(data)
    setFilter(data);
  };

  
  return (
    <div>
      <Navbar/>
      <div className='sidebar'>
      <Leftbar result={handleButton}/>
      
        <div className='colunm-container'>
          <Reserve_container filter={filter}/>
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
