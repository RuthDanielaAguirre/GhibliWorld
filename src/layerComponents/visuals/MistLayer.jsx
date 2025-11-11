import { motion } from "framer-motion";

export default function MistLayer({
  layers = 3,
  baseOpacity = 0.25,
  blur = "blur-3xl",
  direction = "x", // "x" | "y" | "diagonal"
  theme = "forest", // "forest" | "aurora" | "calcifer"
}) {
  const arr = Array.from({ length: layers }, (_, i) => i);

  // paletas según tema
  const colorThemes = {
    forest: {
      from: "from-forest-light/20",
      via: "via-forest-mid/25",
      to: "to-transparent",
    },
    aurora: {
      from: "from-aurora-blue/15",
      via: "via-aurora-pink/20",
      to: "to-transparent",
    },
    calcifer: {
      from: "from-calcifer-core/20",
      via: "via-calcifer-glow/25",
      to: "to-transparent",
    },
  };

  const { from, via, to } = colorThemes[theme] || colorThemes.forest;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {arr.map((i) => {
        const duration = 12 + i * 4;
        const delay = i * 2;
        const opacity = baseOpacity - i * 0.05;

        const move =
          direction === "x"
            ? { x: ["-10%", "10%", "-10%"], y: ["0%", "0%", "0%"] }
            : direction === "y"
            ? { y: ["-5%", "5%", "-5%"], x: ["0%", "0%", "0%"] }
            : { x: ["-10%", "10%", "-10%"], y: ["-5%", "5%", "-5%"] };

        return (
          <motion.div
            key={i}
            className={`
              absolute inset-0 ${blur}
              bg-gradient-to-b ${from} ${via} ${to}
              mix-blend-screen
            `}
            style={{ opacity }}
            animate={{
              ...move,
              opacity: [0, opacity, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
