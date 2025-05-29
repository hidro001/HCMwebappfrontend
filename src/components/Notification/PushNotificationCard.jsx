// PushNotificationCard.jsx
import { motion } from "framer-motion";
import { 
  FiBell, 
  FiX, 
  FiChevronRight,
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertCircle 
} from "react-icons/fi";

const PushNotificationCard = ({ 
  title, 
  body, 
  type = "info", // info, success, warning, error
  onClose, 
  onClick,
  showProgress = false // Disabled by default since no auto-close
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="w-5 h-5" />;
      case "warning":
        return <FiAlertTriangle className="w-5 h-5" />;
      case "error":
        return <FiAlertCircle className="w-5 h-5" />;
      default:
        return <FiBell className="w-5 h-5" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-emerald-500 dark:text-emerald-400";
      case "warning":
        return "text-amber-500 dark:text-amber-400";
      case "error":
        return "text-red-500 dark:text-red-400";
      default:
        return "text-blue-500 dark:text-blue-400";
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case "success":
        return "from-emerald-500/20 to-emerald-600/20 dark:from-emerald-400/20 dark:to-emerald-500/20";
      case "warning":
        return "from-amber-500/20 to-amber-600/20 dark:from-amber-400/20 dark:to-amber-500/20";
      case "error":
        return "from-red-500/20 to-red-600/20 dark:from-red-400/20 dark:to-red-500/20";
      default:
        return "from-blue-500/20 to-blue-600/20 dark:from-blue-400/20 dark:to-blue-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.8
      }}
      className="group relative overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Main notification card */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl shadow-gray-900/10 dark:shadow-black/30 p-4 min-w-[320px] max-w-[400px]">
        
        {/* Animated gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getAccentColor()} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
        
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        
        {/* Content container */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {/* Icon with pulse animation */}
              <div className={`${getIconColor()} relative`}>
                {getIcon()}
                <motion.div
                  className={`absolute inset-0 ${getIconColor()} rounded-full`}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                {title}
              </h3>
            </div>
            
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FiX className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Body text */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3 pr-2">
            {body}
          </p>
          
          {/* Action indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Persistent notification</span>
            </div>
            
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-400 dark:text-gray-500"
            >
              <FiChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
        
        {/* Progress bar - only show if explicitly enabled */}
        {showProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-2xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 w-full" />
          </div>
        )}
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 dark:bg-blue-300/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PushNotificationCard;