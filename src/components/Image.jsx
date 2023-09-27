import { motion } from "framer-motion";

export default function Image({ src, className, style, ...props }) {
  const imageSrc = require(`../assets/images/${src}`);
  return (
    <motion.img
      alt={src}
      src={imageSrc}
      className={className}
      style={style}
      {...props}
    />
  );
}
