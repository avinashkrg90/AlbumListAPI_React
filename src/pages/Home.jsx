import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import axios from 'axios'
import AlbumCard from '../components/AlbumCard'
import EditModal from '../components/EditModal'
import DeleteModal from '../components/DeleteModal'
import AddAlbumModal from '../components/AddAlbumModal'


const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [albums, setAlbums] = useState([])
    const [albumsUserIdWise, setAlbumsUserIdWise] = useState({})

    const [editModal, setEditModal] = useState(false) 
    const [deleteModal, setDeleteModal] = useState(false) 
    const [addAlbumModal, setAddAlbumModal] = useState(false) 
    const [albumToEdit, setAlbumToEdit] = useState({})
    const [albumToDelete, setAlbumToDelete] = useState({})

    const api_url = "https://jsonplaceholder.typicode.com/albums"
    const options = { headers: { accept: "application/json" } };

    const showEditModal = (album) => {
        setEditModal(true)
        setAlbumToEdit(album)
    }

    const showDeleteModal = (album) => {
        setDeleteModal(true)
        setAlbumToDelete(album)
        console.log("in showdete modal")
    }

    useEffect(() => {
        try {
            axios.get(api_url, options)
                .then((response) => {
                    let userIdObject = {};
                    response.data.map((album) => {
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
                                        <h3 className='pl-3 text-black/50'> By User-{key}</h3>
                                        <div key={key} className='p-3 pb-5 mb-8 flex w-full  overflow-x-auto gap-8'>
                                            {albumsUserIdWise[key].map((album) => (
                                                <AlbumCard key={album.id} album={album} showEditModal={showEditModal} showDeleteModal={showDeleteModal} />
                                            ))}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                        {editModal ? <EditModal albumToEdit={albumToEdit} setEditModal={setEditModal} /> : ""}
                        {deleteModal ? <DeleteModal albumToDelete={albumToDelete} setDeleteModal={setDeleteModal} /> : ""}
                    </>
                    
            }
        </>
    )
}

export default Home