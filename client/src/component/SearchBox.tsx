import React from 'react'
import SearchBoxPart from './SearchBoxPart'
import SearchBoxPartDate from './SearchBoxPartDate'
import '../style/SearchBox.css'

function SearchBox() {
    return (
        <div className='container'>
            <SearchBoxPart title="Search Event" list={['AOT', 'MH', 'JAZZ']} />
            <SearchBoxPart title="Place" list={['INDO', 'THAI', 'SINGAPORE']} />
            <SearchBoxPartDate />
        </div>
    )
}

export default SearchBox