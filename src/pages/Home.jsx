import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import axios from 'axios'
import AlbumCard from '../components/AlbumCard'


const Home = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [albums, setAlbums] = useState([])
    const [albumsUserIdWise, setAlbumsUserIdWise] = useState({})
    const api_url = "https://jsonplaceholder.typicode.com/albums"
    const options = { headers: { accept: "application/json" } };

    const nestedArray = [
        ['John', 'Doe', 28],
        ['Jane', 'Smith', 34],
        ['Alice', 'Johnson', 25]
    ];

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

                        <div className='w-full lg:w-[70vw] lg:m-auto mt-16'>
                            {
                                Object.entries(albumsUserIdWise).map(([key, value]) => (
                                    <div>
                                        <h3 className='pl-3 text-black/50'>User-{key}</h3>
                                        <div key={key} className='p-3 pb-5 mb-8 flex w-full  overflow-x-auto gap-8'>
                                            {albumsUserIdWise[key].map((album) => (
                                                <AlbumCard key={album.id} album={album} />
                                            ))}
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Home