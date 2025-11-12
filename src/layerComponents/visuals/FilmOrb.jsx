import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function FilmOrb({ film, position, onClick }) {
  // Detectar tamaño de pantalla
  const [orbSize, setOrbSize] = useState(180)
  
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setOrbSize(100)  
      } else if (window.innerWidth < 768) {
        setOrbSize(120)  
      } else if (window.innerWidth < 1024) {
        setOrbSize(140)  
      } else {
        setOrbSize(180)  
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
        cursor: 'pointer',
        width: `${orbSize}px`,       
        height: `${orbSize}px`      
      }}
      initial={{ opacity: 0, scale: 0.3, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -10, 0]
      }}
      transition={{ 
        opacity: { duration: 0.8, delay: position.delay },
        scale: { duration: 0.8, delay: position.delay, type: "spring", stiffness: 80 },
        y: { 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: position.delay + 0.8
        }
      }}
      whileHover={{ 
        scale: 1.15,
        transition: { duration: 0.3 }
      }}
    >
      {/* Glow externo */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          background: 'radial-gradient(circle, rgba(255, 220, 100, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: position.delay
        }}
      />
      
      {/* Círculo con imagen */}
      <div
        style={{
          position: 'relative',
          width: `${orbSize}px`,      
          height: `${orbSize}px`,      
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)',
          backgroundColor: '#1a4d2e',
          zIndex: 1
        }}
      >
        <img 
          src={film.image} 
          alt={film.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
      
      {/* Título en hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: `${orbSize + 20}px`,  
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          zIndex: 2
        }}
      >
        <p style={{
          color: 'white',
          fontSize: orbSize > 140 ? '14px' : '12px',  
          fontWeight: '300',
          margin: 0
        }}>
          {film.title}
        </p>
      </motion.div>
    </motion.div>
  )
}