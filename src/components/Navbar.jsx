import React from 'react'
import { FaBluesky } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className='z-10 bg-gradient-to-l from-purple-100 to-pink-400  shadow-[rgba(0,_0,_0,_0.25)_0px_15px_20px_-12px]'>
                <div className='text-gelasio flex mx-auto w-full px-4 lg:w-8/12 py-4 justify-between items-center '>
                    <div className='flex justify-center items-center relative'>
                        <FaBluesky className='text-3xl md:text-4xl mr-3 pt-1 text-black-700' />
                        <h3 onClick={() => navigate('/')} className='cursor-pointer mr-6 text-3xl md:text-4xl font-semibold text-purple-700 italic '>Albums</h3>
                        <FaBluesky className=' absolute rotate-45 text-lg md:text-xl text-pink-700 -top-2 right-0' />
                    </div>
                    <ul className='flex gap-3 md:gap-5'>
                        <li className='text-black/70 text-sm md:text-md font-semibold no-underline cursor-pointer hover:text-black/90'>Load albums</li>
                        <li className='text-black/70 text-sm md:text-md font-semibold no-underline cursor-pointer hover:text-black/90'>Know more</li>
                    </ul>
                    
                </div>
                
            </div>

        </>
    )
}

export default Navbar