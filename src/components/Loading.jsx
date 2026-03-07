import { motion } from "framer-motion";

function LoadingDots() {
  return (
    <div>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut",
          }}
        >
          .
        </motion.span>
      ))}
    </div>
  );
}

export { LoadingDots };
