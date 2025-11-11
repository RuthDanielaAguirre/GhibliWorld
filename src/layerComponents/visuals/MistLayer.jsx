import { motion } from 'framer-motion'

export default function MistLayer({ children }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      
      {/* Neblina capa 1 - grande y lenta */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          backdropFilter: 'blur(60px)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Neblina capa 2 - media */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 60%, rgba(200,200,255,0.1) 0%, transparent 40%)',
          backdropFilter: 'blur(40px)'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Neblina capa 3 - pequeña y rápida */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 30%)',
          backdropFilter: 'blur(20px)'
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Contenido encima de la neblina */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}