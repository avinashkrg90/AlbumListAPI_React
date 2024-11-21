import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import axios from 'axios'
import AlbumCard from '../components/AlbumCard'
import EditModal from '../components/EditModal'
import DeleteModal from '../components/DeleteModal'
import AddAlbumModal from '../components/AddAlbumModal'
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus } from "react-icons/fa6";


const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [albums, setAlbums] = useState([])
    const [albumsUserIdWise, setAlbumsUserIdWise] = useState({})
    const [hoverOverAdd, setHoverOverAdd] = useState(false)

    const [editModal, setEditModal] = useState(false) 
    const [deleteModal, setDeleteModal] = useState(false) 
    const [addAlbumModal, setAddAlbumModal] = useState(false) 
    const [albumToEdit, setAlbumToEdit] = useState({})
    const [albumToDelete, setAlbumToDelete] = useState({})
    const [newAlbumUserId , setNewAlbumUserId] = useState('')

    const api_url = "https://jsonplaceholder.typicode.com/albums"
    const options = { headers: { accept: "application/json" } };

    let prevRandomNumber = 1; //prev random number

    const handleEditClick = (album) => {
        setEditModal(true)
        setAlbumToEdit(album)
    }

    const handleDeleteClick = (album) => {
        setDeleteModal(true)
        setAlbumToDelete(album)
        console.log("in showdete modal")
    }

    const handlePlusClick = (key) => {
        setAddAlbumModal(true)
        setNewAlbumUserId(Number(key))
    }

    useEffect(() => {
        try {
            axios.get(api_url, options)
                .then((response) => {
                    let userIdObject = {};
                    response.data.map((album) => {
                        
                        let randomNumber = Math.floor(Math.random()*20)+1;
                        while(randomNumber == prevRandomNumber){
                            randomNumber = Math.floor(Math.random()*20)+1;
                        }
                        prevRandomNumber = randomNumber;
                        album = {...album, imageId: Number(randomNumber)}
                        if (userIdObject.hasOwnProperty(album.userId)) {
                            userIdObject[album.userId].push(album);
                        } else {
                            userIdObject[album.userId] = [album];
                        }
                    })
                    // console.log("userIdObject", userIdObject)
                    setAlbumsUserIdWise(userIdObject);
                    setAlbums(response.data)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <>

                        <div className='w-full lg:w-[70vw] lg:mx-auto mt-8'>
                            {
                                Object.entries(albumsUserIdWise).map(([key, value]) => (
                                    <div>
                                        <div className='flex justify-between overflow-hidden relative'>
                                            <h3 className='pl-3 text-black/50'> By User-{key}</h3>
                                            <button onClick={()=>handlePlusClick(key)} className='absolute -right-32 hover:right-0 flex items-center text-gray-600 duration-300 hover:text-green-600'><FaPlus className='text-lg text-gray-600 hover mr-1'/>Add new Album</button>
                                        </div>
                                        
                                        <div key={key} className='p-3 pb-5 mb-8 flex w-full justify-start overflow-x-auto gap-8'>
                                            {albumsUserIdWise[key].map((album) => (
                                                <AlbumCard key={album.id} album={album} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
                                            ))}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                        {editModal ? <EditModal albumToEdit={albumToEdit} setEditModal={setEditModal} albumsUserIdWise={albumsUserIdWise} setAlbumsUserIdWise={setAlbumsUserIdWise} /> : ""}
                        {deleteModal ? <DeleteModal albumToDelete={albumToDelete} setDeleteModal={setDeleteModal} albumsUserIdWise={albumsUserIdWise} setAlbumsUserIdWise={setAlbumsUserIdWise} /> : ""}  
                        {addAlbumModal ? <AddAlbumModal userId={newAlbumUserId} setAddAlbumModal={setAddAlbumModal} albumsUserIdWise={albumsUserIdWise} setAlbumsUserIdWise={setAlbumsUserIdWise} /> : ""}
                        <Toaster />
                    </>
                    
            }
        </>
    )
}

export default Home