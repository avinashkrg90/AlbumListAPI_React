import React from 'react'
import { FaXmark } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios'
import imageArray from './allImages.js'

const DeleteModal = ({ albumToDelete, albumsUserIdWise, setAlbumsUserIdWise, setDeleteModal }) => {

    const api_url = "https://jsonplaceholder.typicode.com/albums"

    const handleDeleteClick = () => {
        try {
            axios.delete(api_url + '/' + albumToDelete.id)
                .then((response) => {
                    if (response.status === 200) {
                        const index = albumsUserIdWise[albumToDelete.userId].indexOf(albumToDelete);
                        let newAlbumList = albumsUserIdWise;
                        newAlbumList[albumToDelete.userId].splice(index, 1);
                        setAlbumsUserIdWise(newAlbumList)

                        setDeleteModal(false)
                        toast.success("Album deleted successfully")
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center'>
                <div className='w-[90%] max-w-[500px] min-h-[400px]'>
                    <div className='w-full'><FaXmark onClick={() => setDeleteModal(false)} className='mb-1 text-white float-right text-lg cursor-pointer hover:text-green-400' /></div>
                    <div className='border-red-500 border-8 select-none rounded-lg bg-white/80 flex p-8 gap-4 w-full flex-col max-h-[80vh]'>
                        <div>
                            <h3>Are you sure, you want to delete below album?</h3>
                        </div>
                        <div className='flex gap-4'>
                            <div className=' flex-[1] max-h-[40%] aspect-square rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden'>
                                <img className='w-full h-full object-cover' src={`${imageArray[Number(`${albumToDelete.imageId}`)-1]}`} alt="" />
                            </div>
                            <div className='flex flex-col flex-[2] w-full select-none'>
                                <h4 className='text-indigo-700'>Album Id: <span className='text-black'>{albumToDelete.id}</span></h4>
                                <h4 className='text-indigo-700'>User Id: <span className='text-black'>{albumToDelete.userId}</span></h4>
                                <h4 className='text-indigo-700'>Title: <span className='text-black'>{albumToDelete.title}</span></h4>
                            </div>
                        </div>

                        <div className='flex justify-center gap-8'>
                            <button onClick={() => handleDeleteClick()} className='bg-red-500 text-white rounded-lg p-2 px-5 hover:bg-red-600'>Delete</button>
                            <button onClick={() => setDeleteModal(false)} className='bg-indigo-500 text-white rounded-lg p-2 px-5 hover:bg-indigo-600'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteModal