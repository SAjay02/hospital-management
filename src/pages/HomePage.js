import React from 'react'
import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import CarouselSlider from '../components/CarouselSlider'
import './HomePage.css';
const HomePage = () => {
  return (
    <div>
        <Header/>
        <NavigationBar/>
        <CarouselSlider/>
    </div>
  )
}

export default HomePage