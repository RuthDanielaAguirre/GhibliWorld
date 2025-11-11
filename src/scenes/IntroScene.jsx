import { motion } from "framer-motion";
import MistLayer from "../layerComponents/visuals/MistLayer";

export default function IntroScene({ onNext }) {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-violet-700 to-indigo-900 overflow-hidden">
      {/* 🌫️ niebla mágica */}
      <MistLayer theme="aurora" layers={5} baseOpacity={0.4} direction="y" />

      <motion.h1
        className="text-5xl font-light mb-6 tracking-wide"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Bienvenido al Bosque Ghibli
      </motion.h1>

      <motion.p
        className="text-xl mb-10 text-violet-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        La niebla se disipa en 3 segundos...
      </motion.p>

      <motion.button
        onClick={onNext}
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-violet-100 transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Entrar al bosque
      </motion.button>
    </div>
  );
}
