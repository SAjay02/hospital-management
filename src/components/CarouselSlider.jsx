import React from 'react'
import {Carousel} from 'react-bootstrap'
import img1 from '../assests/caro1.png';
import img2 from '../assests/caro2.jpeg';
import img3 from '../assests/caro3.jpeg';
const CarouselSlider = () => {

  let carousel = [
    {
      id : 1,
      image : img1
    },
    {
      id : 2,
      image : img2
    },
    {
      id : 3,
      image : img3
    }
  ]
  return (
    <>
        <Carousel>
          {
            carousel.map(carousel =>{
              return(
                <Carousel.Item key={carousel.id} interval={3000}>
                <img
                    className='d-block w-100'
                    src={carousel.image}
                    alt={carousel.id}
                />
              </Carousel.Item>
              )
            })
          }
        </Carousel>
    </>
  )
}

export default CarouselSlider