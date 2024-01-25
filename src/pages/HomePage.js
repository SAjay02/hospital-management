import React from 'react'
import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import CarouselSlider from '../components/CarouselSlider'
import './HomePage.css';
import About from '../components/About';

const HomePage = ({onLogout, currentUser}) => {
  return (
    <div>
        <Header currentUser={currentUser}/>
        <NavigationBar onLogout={onLogout}/>

    </div>
  )
}

export default HomePage