import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function IntroScene() {
  const navigate = useNavigate()
  const [fadeOut, setFadeOut] = useState(false)
  
  useEffect(() => {
    // Después de 3.5 segundos, empieza el fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 3500)
    
    // Después de 4.5 segundos (1 segundo de fade), navega
    const navTimer = setTimeout(() => {
      navigate('/forest')
    }, 4500)
    
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden',
        backgroundColor: '#0a0e1a'
      }}
    >
      
      {/* Neblina 1 - Blanca grande */}
      <motion.div
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          left: '-200px',
          top: '-200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Neblina 2 - Azul media */}
      <motion.div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          right: '-100px',
          top: '20%',
          background: 'radial-gradient(circle, rgba(100,150,255,0.2) 0%, rgba(100,150,255,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 1
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Neblina 3 - Blanca pequeña */}
      <motion.div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          left: '40%',
          bottom: '-100px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Neblina 4 - Verde/amarilla */}
      <motion.div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          left: '20%',
          top: '50%',
          background: 'radial-gradient(circle, rgba(150,255,150,0.12) 0%, rgba(150,255,150,0.04) 40%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 1
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Contenido */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{ textAlign: 'center' }}
        >
          <motion.h1 
            style={{
              fontSize: '72px',
              fontWeight: '300',
              color: 'white',
              marginBottom: '24px',
              letterSpacing: '8px',
              textShadow: '0 0 30px rgba(255,255,255,0.5)'
            }}
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2)",
                "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)",
                "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            GhibliWorld
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: 3,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity 
            }}
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '20px',
              fontWeight: '300',
              letterSpacing: '2px'
            }}
          >
            Loading magic...
          </motion.p>
          
          {/* Puntos de carga animados */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  )
}