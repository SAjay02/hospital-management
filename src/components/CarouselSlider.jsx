import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import img1 from '../assests/caro1.png';
import img2 from '../assests/caro2.jpeg';
import img3 from '../assests/caro3.jpeg';
const CarouselSlider = () => {
  return (
    <>
        <Carousel>
      <Carousel.Item interval={1000}>
        <img
            className='d-block w-100'
            src={img1}
            // src="https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt='image1'
        />
       
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
            className='d-block w-100'
            src={img2}
            // src="https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt='image2'
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
           className='d-block w-100'
            // src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600"
          src={img3}
            alt='image3'
        />

        
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default CarouselSlider