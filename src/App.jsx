import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroScene from './scenes/IntroScene'
import ForestScene from './scenes/ForestScene'
import FilmDetailScene from './scenes/FilmDetailScene'
import GhibliGame from './scenes/GhibliGame'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroScene />} />
        <Route path="/forest" element={<ForestScene />} />
        <Route path="/film/:id" element={<FilmDetailScene />} />
        <Route path="/ghibli-game" element={<GhibliGame />} />
      </Routes>
    </BrowserRouter>
  )
}