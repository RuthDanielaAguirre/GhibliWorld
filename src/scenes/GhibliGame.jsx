import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import calciferImg from '../assets/imgGhibli/calciferGame.jpg'
import noFaceImg from '../assets/imgGhibli/noFace.jpg'

export default function GhibliGame() {
  const navigate = useNavigate()
  
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isCalciferTurn, setIsCalciferTurn] = useState(true)
  const [scores, setScores] = useState({ calcifer: 0, noface: 0 })
  const [winner, setWinner] = useState(null)
  
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    
    if (squares.every(square => square !== null)) {
      return 'draw'
    }
    
    return null
  }
  
  const handleClick = (index) => {
    if (winner || board[index]) return
    
    const newBoard = [...board]
    newBoard[index] = isCalciferTurn ? 'calcifer' : 'noface'
    setBoard(newBoard)
    
    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
      if (gameWinner === 'calcifer') {
        setScores(prev => ({ ...prev, calcifer: prev.calcifer + 1 }))
      } else if (gameWinner === 'noface') {
        setScores(prev => ({ ...prev, noface: prev.noface + 1 }))
      }
    } else {
      setIsCalciferTurn(!isCalciferTurn)
    }
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setIsCalciferTurn(true)
  }
  
  const resetAll = () => {
    resetGame()
    setScores({ calcifer: 0, noface: 0 })
  }
  
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Imagen de fondo difuminada */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/gameBG.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px) brightness(0.3)',
        zIndex: 0
      }} />
      
      {/* Overlay de gradiente */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(26,26,46,0.7) 0%, rgba(22,33,62,0.7) 50%, rgba(15,52,96,0.7) 100%)',
        zIndex: 1
      }} />
      
      {/* Contenedor del juego */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        
        {/* Partículas */}
        <motion.div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,150,0,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '10%',
            left: '10%'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(100,0,150,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
            bottom: '10%',
            right: '10%'
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 1 }}
        />
        
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
            background: 'rgba(0, 0, 0, 0.7)',
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
          ← Volver al bosque
        </motion.button>
        
        {/* Contenido del juego */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: window.innerWidth < 768 ? '32px' : '48px',
              fontWeight: '300',
              color: 'white',
              marginBottom: '30px',
              textShadow: '0 0 20px rgba(255,255,255,0.5)'
            }}
          >
            Calcifer vs No-Face
          </motion.h1>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginBottom: '30px',
              flexWrap: 'wrap'
            }}
          >
            <ScoreCard
              image={calciferImg}
              name="Calcifer"
              score={scores.calcifer}
              isActive={isCalciferTurn && !winner}
              color="rgba(255, 150, 0, 0.3)"
            />
            
            <ScoreCard
              image={noFaceImg}
              name="No-Face"
              score={scores.noface}
              isActive={!isCalciferTurn && !winner}
              color="rgba(150, 0, 255, 0.3)"
            />
          </motion.div>
          
          {!winner && (
            <motion.p
              key={isCalciferTurn}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                color: 'white',
                fontSize: '18px',
                marginBottom: '20px',
                fontWeight: '300'
              }}
            >
              Turno de: {isCalciferTurn ? '🔥 Calcifer' : '👻 No-Face'}
            </motion.p>
          )}
          
          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                style={{
                  marginBottom: '20px',
                  padding: '20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <p style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: '400',
                  margin: 0
                }}>
                  {winner === 'draw' ? '¡Empate!' : 
                   winner === 'calcifer' ? '🔥 ¡Calcifer gana!' : 
                   '👻 ¡No-Face gana!'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              maxWidth: window.innerWidth < 768 ? '300px' : '400px',
              margin: '0 auto 30px'
            }}
          >
            {board.map((cell, index) => (
              <Cell
                key={index}
                value={cell}
                onClick={() => handleClick(index)}
                disabled={winner || cell}
                calciferImg={calciferImg}
                noFaceImg={noFaceImg}
              />
            ))}
          </motion.div>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <GameButton onClick={resetGame}>
              🔄 Jugar de nuevo
            </GameButton>
            
            <GameButton onClick={resetAll} secondary>
              📊 Resetear marcador
            </GameButton>
          </div>
          
        </motion.div>
      </div>
    </div>
  )
}

function Cell({ value, onClick, disabled, calciferImg, noFaceImg }) {
  const isMobile = window.innerWidth < 768
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{
        width: isMobile ? '90px' : '120px',
        height: isMobile ? '90px' : '120px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence>
        {value && (
          <motion.img
            key={value}
            src={value === 'calcifer' ? calciferImg : noFaceImg}
            alt={value}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{
              width: '80%',
              height: '80%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function ScoreCard({ image, name, score, isActive, color }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 1,
        boxShadow: isActive ? `0 0 30px ${color}` : '0 0 0px transparent'
      }}
      style={{
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: `2px solid ${isActive ? color.replace('0.3', '0.8') : 'rgba(255, 255, 255, 0.2)'}`,
        minWidth: '120px'
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '50%',
          marginBottom: '10px',
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }}
      />
      <p style={{
        color: 'white',
        fontSize: '16px',
        fontWeight: '300',
        margin: '0 0 5px 0'
      }}>
        {name}
      </p>
      <p style={{
        color: 'white',
        fontSize: '32px',
        fontWeight: '400',
        margin: 0
      }}>
        {score}
      </p>
    </motion.div>
  )
}

function GameButton({ onClick, children, secondary }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '12px 24px',
        background: secondary ? 'rgba(100, 100, 100, 0.4)' : 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '300'
      }}
    >
      {children}
    </motion.button>
  )
}