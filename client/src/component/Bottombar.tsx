import React from 'react'
import '../style/Bottombar.css'

interface BottombarProps {
  hideContainer?: boolean; // ประกาศ props hideContainer แบบ optional และเป็น boolean
}

function Bottombar({hideContainer}: BottombarProps) {
  return (
    <div>
            {!hideContainer && (
        <div className='bottombar-container'>
          <input placeholder='RATING'></input>
          <input placeholder='BUDGET'></input>
          <button type='submit'>SORT</button>
        </div>
      )}
    </div>
  );
}

export default Bottombar
