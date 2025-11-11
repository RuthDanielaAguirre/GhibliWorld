import { motion } from 'framer-motion'

export default function FilmOrb({ film, position, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        transform: 'translate(-50%, -50%)',
        width: '180px',
        height: '180px',
        zIndex: 20,
        cursor: 'pointer'
      }}
      // Animación de entrada
      initial={{ opacity: 0, scale: 0.3, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -10, 0]  // ← Entrada + respiración combinadas
      }}
      transition={{ 
        opacity: { duration: 0.8, delay: position.delay },
        scale: { duration: 0.8, delay: position.delay, type: "spring", stiffness: 80 },
        y: { 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: position.delay + 0.8  // Empieza después de la entrada
        }
      }}
      // Hover
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
          opacity: [0.4, 0.7, 0.4]  // Glow pulsante
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
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)',
          position: 'relative',
          backgroundColor: '#1a4d2e'
        }}
      >
        <img 
          src={film.image} 
          alt={film.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            imageRendering: 'high-quality'
          }}
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
      </div>
      
      {/* Título en hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <p style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '300',
          letterSpacing: '0.5px',
          margin: 0
        }}>
          {film.title}
        </p>
      </motion.div>
    </motion.div>
  )
}