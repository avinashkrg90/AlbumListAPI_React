import React, { useRef } from 'react'

const AlbumCard = ({ album, showEditModal, showDeleteModal }) => {

    const cardTextRef = useRef();

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleMouseEnter = () => {
        console.log(cardTextRef.current.classList.add('bg-black/50'))
        console.log(cardTextRef.current.classList.remove('bg-black/10'))
    }

    const handleMouseLeave = () => {
        console.log(cardTextRef.current.classList.remove('bg-black/50'))
        console.log(cardTextRef.current.classList.add('bg-black/10'))
    }

    return (
        <>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='w-full hover:scale-105 duration-200 cursor-pointer  rounded-md'>
                <div style={{backgroundImage:`url(./src/assets/images/img${randomNumberInRange(1,20)}.png)`, backgroundSize: 'cover'}} className={`py-0 flex flex-col justify-between items-center w-[70vw] sm:w-[320px] h-[70vw] sm:h-[320px] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}>
                    <div className='w-full pr-3 py-3'>
                        <div className='rounded-full w-10 h-10 bg-white/70 float-right flex justify-center items-center'>
                            <h2 className=' '>{album.id}</h2>
                        </div>
                    </div>
                    <div ref={cardTextRef} className='text-center w-full py-6 bg-black/10'> 
                        <h2 className='text-white text-lg italic font-semibold'>{album.title}</h2>
                    </div>
                    <div className='flex justify-end gap-4 w-full bg-gradient-to-l from-white/80 to-white/0 p-2'>
                        <button onClick={() => showEditModal(album)} className='p-2 bg-blue-600 border-none hover:bg-blue-700 text-white rounded-md cursor-pointer'>Edit</button>
                        <button onClick={() => showDeleteModal(album)} className='p-2 bg-red-500 border-none hover:bg-red-600 text-white rounded-md cursor-pointer'>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumCard