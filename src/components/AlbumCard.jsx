import React from 'react'

const AlbumCard = ({ album }) => {

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <>
            <div className='w-full hover:scale-105 duration-200 cursor-pointer  rounded-md'>
                <div style={{backgroundImage:`url(./src/assets/images/img${randomNumberInRange(1,13)}.png)`, backgroundSize: 'cover'}} className={`p-3 flex flex-col justify-between items-center w-[70vw] sm:w-[320px] h-[70vw] sm:h-[320px] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}>
                    <div className='w-full'>
                        <div className='rounded-full w-10 h-10 bg-white/70 float-right flex justify-center items-center'>
                            <h2 className=' '>{album.id}</h2>
                        </div>
                    </div>
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