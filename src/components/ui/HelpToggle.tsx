import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HelpToggleProps {
  onClick: () => void;
  isHelpOpen: boolean;
}

/**
 * Help toggle button that appears on the right side on desktop
 * and below the game on mobile
 */
export const HelpToggle: React.FC<HelpToggleProps> = ({ onClick, isHelpOpen }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-highlight for 15 seconds on mount (page load/refresh)
    setIsHighlighted(true);
    setShowPulse(true);
    
    const timer = setTimeout(() => {
      setIsHighlighted(false);
      setShowPulse(false);
    }, 15000); // 15 seconds

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Desktop: Fixed right side button with animated border
  if (!isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: isHelpOpen ? 'min(420px, calc(35vw + 20px))' : '20px',
          transform: 'translateY(-50%)',
          zIndex: 1001,
        }}
      >
        <motion.button
          onClick={onClick}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 6px 25px rgba(255, 107, 53, 0.3)'
          }}
          whileTap={{ scale: 0.95 }}
          className="help-toggle-desktop"
          style={{
            position: 'relative',
            padding: '12px 20px',
            backgroundColor: isHighlighted ? '#ff6b35' : '#8f7a66',
            border: isHighlighted ? '2px solid #ff9500' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#f9f6f2',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: isHighlighted 
              ? '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 0 3px rgba(255, 149, 0, 0.2)' 
              : '0 2px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            minWidth: '80px',
            writingMode: 'horizontal-tb',
            overflow: 'hidden',
          }}
          animate={showPulse ? {
            boxShadow: [
              '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 0 3px rgba(255, 149, 0, 0.2)',
              '0 6px 30px rgba(255, 107, 53, 0.6), 0 0 0 6px rgba(255, 149, 0, 0.3)',
              '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 0 3px rgba(255, 149, 0, 0.2)'
            ]
          } : {}}
          transition={{
            duration: 2,
            repeat: showPulse ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Subtle shine effect */}
          {isHighlighted && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                pointerEvents: 'none',
              }}
              animate={{
                left: ['100%', '100%', '-100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
          )}
          {isHelpOpen ? 'HIDE' : 'HELP'}
        </motion.button>
      </div>
    );
  }

  // Mobile: Below game button with professional highlighting
  return (
    <div
      style={{
        position: 'relative',
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 6px 25px rgba(255, 107, 53, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
        className="help-toggle-mobile"
        style={{
          position: 'relative',
          padding: '12px 24px',
          backgroundColor: isHighlighted ? '#ff6b35' : '#8f7a66',
          border: isHighlighted ? '2px solid #ff9500' : '2px solid transparent',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#f9f6f2',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: isHighlighted 
            ? '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 0 3px rgba(255, 149, 0, 0.2)' 
            : '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: '140px',
          overflow: 'hidden',
        }}
        animate={showPulse ? {
          boxShadow: [
            '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 0 3px rgba(255, 149, 0, 0.2)',
            '0 6px 30px rgba(255, 107, 53, 0.6), 0 0 0 6px rgba(255, 149, 0, 0.3)',
            '0 4px 20px rgba(255, 107, 53, 0.4), 0 0 0 3px rgba(255, 149, 0, 0.2)'
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: showPulse ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Subtle shine effect */}
        {isHighlighted && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              pointerEvents: 'none',
            }}
            animate={{
              left: ['100%', '100%', '-100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        )}
        {isHelpOpen ? '← HIDE HELP' : 'GET HELP →'}
      </motion.button>
    </div>
  );
};
