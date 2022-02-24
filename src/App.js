import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)

  useEffect(() => {
        if (searchTerm) {
            fetchData(searchTerm).result.then((data) => {
              setData(data)
            })
        }
    }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data){
        return (
            <>
            <Suspense fallback={<Spinner />}>
              <Gallery data={data} />
            </Suspense>
            </>
        )
    }
}

  return (
    <div className="App">
    <h2>Search for Music!</h2>
    <Router>
        <Routes>
            <Route path="/" element={<><SearchBar handleSearch={handleSearch}/>{renderGallery()}</>}/>
            <Route path='/album/:id' element={<AlbumView />}/>
            <Route path='/artist/:id' element={<ArtistView />}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;