import { motion } from "motion/react"

interface BackdropProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center md:hidden justify-center bg-black/50 z-40"
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop