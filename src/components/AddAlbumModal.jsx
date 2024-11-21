import React, { useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios'

const AddAlbumModal = ({ userId, albumsUserIdWise, setAlbumsUserIdWise, setAddAlbumModal }) => {

    const [newValue, setNewValue] = useState({ id: '', title: '', userId: userId, imageId: (Math.floor(Math.random() * 20) + 1) })

    const api_url = "https://jsonplaceholder.typicode.com/albums"
    const options = { headers: { accept: "application/json" } };

    const isIdAlreadyExist = (id) => {
        let result = false;

        Object.entries(albumsUserIdWise).map(([key, value]) => {
            value.map((album) => {
                if (album.id === Number(id))
                    result = true;
            })
        })

        return result;
    }

    const handleAddClick = () => {
        if (!newValue.id) {
            toast.error("Id can not be empty")
        } else if (!newValue.title) {
            toast.error("Title can not be empty")
        } else {
            if (isIdAlreadyExist(newValue.id)) {
                toast.error("Id already exist")
            } else {
                try {
                    axios.post(api_url, newValue, options)
                        .then((response) => {
                            if (response.status === 201) {
                                let newAlbumList = albumsUserIdWise;
                                newAlbumList[userId].unshift(newValue);
                                setAlbumsUserIdWise(newAlbumList)
                                setAddAlbumModal(false)
                                toast.success("Album added successfully")
                            }
                        })
                } catch (error) {
                    console.log(error.message)
                }

            }
        }

    }

    return (
        <>
            <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center'>
                <div className='w-[90%] max-w-[500px] min-h-[400px]'>
                    <div className='w-full'><FaXmark onClick={() => setAddAlbumModal(false)} className='mb-1 text-white float-right text-lg cursor-pointer hover:text-green-400' /></div>
                    <div className='rounded-lg bg-white/80 flex p-8 gap-4 w-full flex-col sm:flex-row max-h-[80vh]'>
                        <div className='select-none flex-[1] max-h-[40%] aspect-square rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden'>
                            <img className='w-full h-full object-cover' src={`./public/images/img${newValue.imageId}.png`} alt="" />
                        </div>
                        <div className='flex flex-col flex-[1] w-full select-none'>
                            <label htmlFor="User Id" className='mb-3'>User Id : {userId}</label>
                            <label htmlFor="albumId" className='mb-0'>Enter Album Id</label>
                            <input className='rounded-md mb-3 p-2 px-3 w-full' onChange={(e) => setNewValue({ ...newValue, id: e.target.value })} value={newValue.id} type="text" id='albumId' />
                            <label htmlFor="albumTitle" className='mb-0'>Title</label>
                            <textarea className='rounded-md p-2 px-3 w-full' onChange={(e) => setNewValue({ ...newValue, title: e.target.value })} value={newValue.title} name="albumTitle" id="albumTitle"></textarea>
                            <button onClick={handleAddClick} className='bg-green-500 rounded-lg p-2 mt-6 hover:bg-green-600'>Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddAlbumModal