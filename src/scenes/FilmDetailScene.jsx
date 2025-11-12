import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import useGhibliFilms from '../hooks/useGhibliFilms'

export default function FilmDetailScene() {
  const navigate = useNavigate()
  const { id } = useParams()  // Saca el ID de la URL
  const { films, loading } = useGhibliFilms()
  
  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #0a1f1a, #1a4d2e)'
      }}>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ 
            color: 'white', 
            fontSize: '20px',
            textAlign: 'center',
            padding: '0 20px'
          }}
        >
          Cargando película...
        </motion.p>
      </div>
    )
  }
  
  // Buscar la película con ese ID
  const film = films.find(f => f.id === id)
  
  if (!film) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #0a1f1a, #1a4d2e)',
        padding: '20px'
      }}>
        <p style={{ 
          color: 'white', 
          fontSize: '20px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Película no encontrada
        </p>
        <button
          onClick={() => navigate('/forest')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Volver al bosque
        </button>
      </div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to bottom, #0a1f1a, #1a4d2e)',
        overflow: 'auto'
      }}
    >
      {/* Fondo con imagen difuminada */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${film.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px) brightness(0.3)',
          zIndex: 0
        }}
      />
      
      {/* Contenido */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        padding: '20px',
        paddingTop: '100px'
      }}>
        
        {/* Botón volver */}
        <motion.button
          onClick={() => navigate('/forest')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '300',
            zIndex: 100
          }}
        >
          ← Volver
        </motion.button>
        
        {/* Contenedor principal */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          
          {/*Layout responsive */}
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: '30px',
            alignItems: window.innerWidth < 768 ? 'center' : 'flex-start'
          }}>
            
            {/* Poster */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                width: window.innerWidth < 768 ? '250px' : '300px',
                height: window.innerWidth < 768 ? '375px' : '450px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                flexShrink: 0
              }}
            >
              <img 
                src={film.image} 
                alt={film.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
            
            {/* Info */}
            <div style={{ 
              flex: 1, 
              minWidth: 0,
              width: '100%'
            }}>
              
              {/* Título */}
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                  fontSize: window.innerWidth < 768 ? '32px' : '48px',
                  fontWeight: '300',
                  color: 'white',
                  marginBottom: '20px',
                  textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                  margin: '0 0 20px 0',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left'
                }}
              >
                {film.title}
              </motion.h1>
              
              {/* Datos */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ 
                  marginBottom: '24px',
                  textAlign: window.innerWidth < 768 ? 'center' : 'left'
                }}
              >
                <InfoRow label="Director" value={film.director} />
                <InfoRow label="Año" value={film.releaseDate} />
                <InfoRow label="Puntuación" value={`${film.rtScore}/100`} />
              </motion.div>
              
              {/* Sinopsis */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <h3 style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: '12px',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 12px 0'
                }}>
                  Sinopsis
                </h3>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: window.innerWidth < 768 ? '14px' : '16px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {film.description}
                </p>
              </motion.div>
            </div>
          </div>
          
        </motion.div>
      </div>
      
    </motion.div>
  )
}

// Componente helper
function InfoRow({ label, value }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      marginBottom: '8px',
      alignItems: 'center',
      justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
      flexWrap: 'wrap'
    }}>
      <span style={{ 
        color: 'rgba(255, 255, 255, 0.6)', 
        fontSize: '14px',
        minWidth: window.innerWidth < 768 ? 'auto' : '100px'
      }}>
        {label}:
      </span>
      <span style={{ 
        color: 'white', 
        fontSize: '16px',
        fontWeight: '400'
      }}>
        {value}
      </span>
    </div>
  )
}
