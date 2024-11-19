import React from 'react'
import loader from '../assets/loader.gif'

const Loader = () => {
  return (
    <>
        <div className='w-full text-center mt-8'>
            <img className='m-auto w-12' src={loader} alt="Loading..." />
            <h3>Loading...</h3>
        </div>
    </>
  )
}

export default Loader