// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AlbumView = () => {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/song/${id}`
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    const justSongs = albumData.filter(entry => entry.kind === 'song')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView