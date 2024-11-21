import React, { useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios'

const EditModal = ({ albumToEdit, albumsUserIdWise, setAlbumsUserIdWise, setEditModal }) => {
    const [editValue, setEditValue] = useState({ id: albumToEdit.id, title: albumToEdit.title, userId: albumToEdit.userId, imageId: albumToEdit.imageId })

    const api_url = "https://jsonplaceholder.typicode.com/albums"

    const isIdAlreadyExist = (id) => {
        let result = false;
        if (id !== Number(albumToEdit.id)) {
            Object.entries(albumsUserIdWise).map(([key, value]) => {
                value.map((album) => {
                    if (album.id === Number(id))
                        result = true;
                })
            })
        }
        return result;
    }

    const handleUpdateClick = () => {
        if (!editValue.id) {
            toast.error("Id can not be empty")
        } else if (!editValue.title) {
            toast.error("Title can not be empty")
        } else {
            if (isIdAlreadyExist(Number(editValue.id))) {
                toast.error("Id already exist")
            }
            else {
                try {
                    axios.put(api_url + '/'+ albumToEdit.id, editValue)
                        .then((response) => {
                            if (response.status === 200) {
                                const index = albumsUserIdWise[albumToEdit.userId].indexOf(albumToEdit);
                                let newAlbumList = albumsUserIdWise;

                                newAlbumList[albumToEdit.userId].splice(index, 1, editValue);
                                setAlbumsUserIdWise(newAlbumList)
                                setEditModal(false)
                                toast.success("Album updated successfully")
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
                <div className='w-[90%] max-w-[600px] min-h-[400px]'>
                    <div className='w-full'><FaXmark onClick={() => setEditModal(false)} className='mb-1 text-white float-right text-lg cursor-pointer hover:text-green-400' /></div>
                    <div className='rounded-lg bg-white/80 flex p-8 gap-4 w-full flex-col sm:flex-row max-h-[80vh]'>
                        <div className='select-none flex-[1] max-h-[40%] aspect-square rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden'>
                            <img className='w-full h-full object-cover' src={`./src/assets/images/img${albumToEdit.imageId}.png`} alt="" />
                        </div>
                        <div className='flex flex-col flex-[1] w-full select-none'>
                            <label htmlFor="albumId" className='mb-0'>Enter Album Id</label>
                            <input onChange={(e) => setEditValue({ ...editValue, id: e.target.value })} className='rounded-md mb-4 p-2 px-3 w-full' value={editValue.id} type="text" id='albumId' />
                            <label htmlFor="albumTitle" className='mb-0'>Title</label>
                            <textarea onChange={(e) => setEditValue({ ...editValue, title: e.target.value })} className='rounded-md p-2 px-3 w-full h-24' value={editValue.title} name="albumTitle" id="albumTitle"></textarea>
                            <button onClick={() => handleUpdateClick()} className='bg-green-500 rounded-lg p-2 mt-6 hover:bg-green-600'>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EditModal