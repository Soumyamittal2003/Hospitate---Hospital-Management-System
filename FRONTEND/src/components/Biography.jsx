import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography' >
        <div className='banner'>
            <img src={imageUrl} alt="aboutImg" />

        </div>
        <div className="banner">
            <p>Biography</p>
            <h3>Who Are we</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui veniam dicta, quos repudiandae delectus dolore. Vero, velit minus error facilis nostrum animi voluptatibus labore nobis earum, nihil nisi excepturi repudiandae reprehenderit odio corrupti at eveniet assumenda ullam quo ea similique maiores accusamus tempore magnam. Recusandae nesciunt illum aspernatur reiciendis molestiae.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, aut!</p>
            <p>Lorem ipsum dolor sit amet.</p>

        </div>

    </div>
  )
}

export default Biography