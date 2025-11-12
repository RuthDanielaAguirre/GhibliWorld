import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import calciferImg from '../../assets/imgGhibli/calciferGame.jpg'  
import noFaceImg from '../../assets/imgGhibli/noFace.jpg'

export default function GameOrb({ position, onClick }) {
  const [orbSize, setOrbSize] = useState(180)
  const [currentImage, setCurrentImage] = useState(0)
  
  // Imágenes alternadas
  const images = [calciferImg, noFaceImg]
  
  // Cambiar imagen cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % 2)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Responsive
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
      {/* Glow especial de juego (naranja + morado) */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          background: currentImage === 0 
            ? 'radial-gradient(circle, rgba(255, 150, 0, 0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(150, 0, 255, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          zIndex: -1
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Círculo con imágenes alternadas */}
      <div
        style={{
          position: 'relative',
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)',
          backgroundColor: '#1a1a2e',
          zIndex: 1
        }}
      >
        {/* Imagen con transición */}
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Game"
          initial={{ opacity: 0, scale: 1.2, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        
        {/* Overlay con icono de juego */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}>
          🎮
        </div>
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
          🎮 Tres en Raya
        </p>
      </motion.div>
    </motion.div>
  )
}