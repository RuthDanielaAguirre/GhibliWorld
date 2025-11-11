import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroScene from './scenes/IntroScene'
import ForestScene from './scenes/ForestScene'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroScene />} />
        <Route path="/forest" element={<ForestScene />} />
      </Routes>
    </BrowserRouter>
  )
}