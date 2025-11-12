import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useGhibliFilms from '../hooks/useGhibliFilms'
import FilmOrb from '../layerComponents/visuals/FilmOrb'
import GameOrb from '../layerComponents/visuals/GameOrb' 

const FEATURED_FILMS = [
  'Spirited Away',
  'My Neighbor Totoro',
  'Howl\'s Moving Castle',
  'Princess Mononoke',
  'Castle in the Sky',
  'Kiki\'s Delivery Service'
]

const POSITIONS = [
  { left: '20%', top: '25%', delay: 0 },
  { left: '45%', top: '20%', delay: 0.15 },
  { left: '70%', top: '30%', delay: 0.3 },
  { left: '30%', top: '55%', delay: 0.45 },
  { left: '60%', top: '60%', delay: 0.6 },
  { left: '50%', top: '80%', delay: 0.75 },
  { left: '85%', top: '70%', delay: 0.9 }  // ← Posición del orbe de juego
]

export default function ForestScene() {
  const navigate = useNavigate()
  const { films, loading } = useGhibliFilms()
  
  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#1a4d2e'
      }}>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: 'white', fontSize: '20px' }}
        >
          Cargando el bosque mágico...
        </motion.p>
      </div>
    )
  }

  const featuredFilms = []
  
  for(let i = 0; i < films.length; i++) {
    const film = films[i]
    
    if(FEATURED_FILMS.includes(film.title)) {
      featuredFilms.push(film)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden' 
      }}
    >
      
      {/* Fondo de bosque */}
      <img 
        src="/forest.png" 
        alt="Bosque" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      
      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
        zIndex: 1
      }} />
      
      {/* Orbes de películas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10
      }}>
        {featuredFilms.map((film, index) => (
          <FilmOrb
            key={film.id}
            film={film}
            position={POSITIONS[index]}
            onClick={() => navigate(`/film/${film.id}`)}
          />
        ))}
        
        {/* Orbe de juego (7mo orbe) */}
        <GameOrb
          position={POSITIONS[6]}  
          onClick={() => navigate('/ghibli-game')}
        />
      </div>
      
    </motion.div>
  )
}