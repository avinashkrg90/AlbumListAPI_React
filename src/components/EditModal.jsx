import React from 'react'
import { FaXmark } from "react-icons/fa6";

const EditModal = ({albumToEdit, setEditModal}) => {


    return (
        <>
            <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center'>
                <div className='w-[90%] max-w-[600px] min-h-[400px]'>
                    <div className='w-full'><FaXmark onClick={()=>setEditModal(false)} className='mb-1 text-white float-right text-lg cursor-pointer hover:text-green-400'/></div>
                    <div className='rounded-lg bg-white/80 flex p-8 gap-4 w-full flex-col sm:flex-row max-h-[80vh]'>
                        <div className='select-none flex-[1] max-h-[40%] aspect-square rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden'>
                            <img className='w-full h-full object-cover' src={`./src/assets/images/img${Math.floor(Math.random()*20)+1}.png`} alt="" />
                        </div>
                        <div className='flex flex-col flex-[1] w-full select-none'>
                            <label htmlFor="albumId" className='mb-0'>Enter Album Id</label>
                            <input className='rounded-md mb-4 p-2 px-3 w-full' value={albumToEdit.id} type="text" id='albumId'/>
                            <label htmlFor="albumTitle" className='mb-0'>Title</label>
                            <textarea className='rounded-md p-2 px-3 w-full h-24' value={albumToEdit.title} name="albumTitle" id="albumTitle"></textarea>
                            <button className='bg-green-500 rounded-lg p-2 mt-6 hover:bg-green-600'>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditModal