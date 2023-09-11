import React from 'react'
import { Testimonial } from '..'

const HomeTestimonials = () => {
  const data = [...new Array(5)];
  const obj = {
    text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections  "de Finibus Bonorum et Malorum", accompanied by English versions from the translation by H. Rackham.`,
    image: '',
    name: 'Ahmed',
    rating: 4
  }
  return (
    <div className='home-testimonials'>
      <div className="container-mx">

        <h2>WHAT PEOPLE SAY ABOUT US?</h2>
        <div className="home-testimonials-container">
          {
            data.map((e, i) => <Testimonial key={i} text={obj.text} image={obj.image} name={obj.name} rating={obj.rating} />)
          }
        </div>
      </div>
    </div>
  )
}

export default HomeTestimonials