
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import KnowMore from './pages/KnowMore'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/knowmore' element={<KnowMore />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
