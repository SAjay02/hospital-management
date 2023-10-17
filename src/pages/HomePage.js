import React from 'react'
import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import CarouselSlider from '../components/CarouselSlider'
import './HomePage.css';
import About from '../components/About';

const HomePage = () => {
  return (
    <div>
        <Header/>
        <NavigationBar/>
    </div>
  )
}

export default HomePage