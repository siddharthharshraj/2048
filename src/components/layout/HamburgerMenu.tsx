import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Hamburger menu button with animated icon
 * Implements the State Pattern for visual state management
 */
export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="hamburger-menu"
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: isOpen ? 999 : 1001, // Lower z-index when sidebar is open to prevent overlap
        width: '50px',
        height: '50px',
        backgroundColor: '#8f7a66',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        transform: isOpen ? 'translateX(-10px)' : 'translateX(0)',
      }}
    >
      <motion.div
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '24px',
          height: '3px',
          backgroundColor: '#f9f6f2',
          borderRadius: '2px',
        }}
      />
      <motion.div
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '24px',
          height: '3px',
          backgroundColor: '#f9f6f2',
          borderRadius: '2px',
        }}
      />
      <motion.div
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '24px',
          height: '3px',
          backgroundColor: '#f9f6f2',
          borderRadius: '2px',
        }}
      />
    </motion.button>
  );
};
