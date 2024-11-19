import React from 'react'

const AlbumCard = ({ album }) => {
    return (
        <>
            <div className='w-full hover:scale-105 duration-200 cursor-pointer  rounded-md'>
                <div className='albumCard p-3 flex flex-col justify-between items-center w-[70vw] sm:w-[320px] h-[70vw] sm:h-[320px] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <div className='w-full'><h2 className='float-right'>{album.id}</h2></div>
                    <div className='text-center w-full'><h2 className='text-white text-lg italic font-semibold'>{album.title}</h2></div>
                    <div className='flex justify-end gap-4 w-full bg-white/70'>
                        <button className='p-2 bg-blue-600 border-none hover:bg-blue-700 text-white rounded-md cursor-pointer'>Edit</button>
                        <button className='p-2 bg-red-600 border-none hover:bg-red-700 text-white rounded-md cursor-pointer'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumCard