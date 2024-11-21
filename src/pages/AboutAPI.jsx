import React, { useEffect, useState } from 'react'
import axios from 'axios'
import APIImage from '../assets/APIResponse.png'

const AboutAPI = () => {

  const api_url = "https://jsonplaceholder.typicode.com/albums"
  const options = { headers: { accept: "application/json" } };

  const [APIResponse, setAPIResponse] = useState();

  useEffect(()=>{
    try {
      axios.get(api_url, options)
        .then((response) => {
          console.log(response)
          setAPIResponse(JSON.stringify(response))
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <div className='w-[90%] md:w-[70%] m-auto p-4'>
        <h2 className='underline text-3xl text-center my-4'>About this website</h2>
        <p className='mb-5 text-justify'>This website is simply a demonstration of fetching APIs and displaying the response data is an attractive manner.</p>
        <h2 className='underline text-3xl text-center my-4'>About the API used in this project</h2>
        <p className='mb-5 text-justify'>The API used in this project is coming from <span className='block underline text-blue-700 my-2'><a target="_blank" href="https://jsonplaceholder.typicode.com">https://jsonplaceholder.typicode.com</a></span> which claims to ba a Free fake and reliable API for testing and prototyping.</p>
        <p className='mb-5 text-justify'>The API used is 'album' which is one of the 6 common resouces provided by this website. The album resource has 100 unique data for album which is used for testing and learning purpose.
          The API can be accessed by <span className='block underline text-blue-700 my-2'><a target="_blank" href="https://jsonplaceholder.typicode.com/albums">https://jsonplaceholder.typicode.com/albums</a></span> which claims to ba a Free fake and reliable API for testing and prototyping.</p>
        <p>The response of API request looks like as below</p>
        <img className='m-auto my-2' src={APIImage} alt="API Response" />
        <p className='mb-5 text-justify'>There are 100 album data, each with 3 properties userId, id, and title. Every album has unique Id. And every userId has 10 different albums</p>
        <p className='mb-5 text-justify'>An image is associated with every album in a random manner (using Math.random() method). This is simply done to make the website look attractive.</p>      
      </div>
    </>
  )
}

export default AboutAPI