import React from 'react'
import Logo from './Logo'
import { useState } from 'react'
import SearchBar from './SearchBar';
import Button from './Button';
import CarouselSlider from './CarouselSlider';
const Header = () => {
    const [color, setColor] = useState("#00806B");
  return (
    <div style={{backgroundColor:`${color}`}}>
    <div className="container">
        <header className="d-flex  justify-content-sm-around">
           <Logo/>
           <SearchBar/>
           <Button/>
        </header> 
    </div>
    </div>
  )
}

export default Header