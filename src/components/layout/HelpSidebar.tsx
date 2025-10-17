import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameMode } from '../../types';
import type { ThemeColors } from '../../utils/themeUtils';

interface HelpSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  gameMode: GameMode;
  themeColors: ThemeColors;
}

/**
 * Help sidebar that slides in from the right (desktop) or bottom (mobile)
 * Similar to the game menu sidebar but for help content
 */
export const HelpSidebar: React.FC<HelpSidebarProps> = ({
  isOpen,
  onClose,
  gameMode,
  themeColors,
}) => {
  const formatGameMode = (mode: GameMode) => {
    switch (mode) {
      case 'timeAttack': return 'Time Attack';
      case 'zen': return 'Zen Mode';
      case 'challenge': return 'Challenge';
      default: return 'Classic';
    }
  };

  // Get crystal clear text color based on theme
  const getTextColor = () => {
    const bgColor = themeColors.background;
    
    // Dark themes (including neon) → Pure white text for maximum contrast
    if (bgColor === '#2d3748' || bgColor === '#1a202c' || bgColor === '#0f0f23' || bgColor === '#16213e') {
      return '#ffffff'; // Pure white for all dark themes including neon
    }
    
    // Light themes → Pure black text for maximum contrast  
    return '#000000'; // Pure black for light themes
  };

  const textColor = getTextColor();

  const sidebarStyle = {
    position: 'fixed' as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: 'min(400px, 35vw)',
    backgroundColor: themeColors.background,
    boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  };

  const mobileSidebarStyle = {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '80vh',
    backgroundColor: themeColors.background,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  };

  const headerStyle = {
    padding: '20px',
    borderBottom: `1px solid ${themeColors.boardBackground}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative' as const,
  };

  const contentStyle = {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '20px',
    color: textColor,
    fontSize: '14px',
    lineHeight: 1.5,
  };

  const headingStyle = {
    color: textColor,
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '0',
    marginBottom: '12px',
    borderBottom: `2px solid ${themeColors.button}`,
    paddingBottom: '8px',
  };

  const subHeadingStyle = {
    color: textColor,
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '18px',
    marginBottom: '10px',
  };

  const listStyle = {
    paddingLeft: '18px',
    margin: '8px 0',
    fontSize: '13px',
    color: textColor,
  };

  const badgeStyle = {
    backgroundColor: themeColors.button,
    color: themeColors.buttonText,
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    display: 'inline-block',
    marginBottom: '12px',
  };

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={isMobile ? mobileSidebarStyle : sidebarStyle}
          >
            {/* Header */}
            <div style={headerStyle}>
              <h2 style={{ margin: 0, color: textColor, fontSize: '20px', paddingRight: '40px' }}>
                Help & Guide
              </h2>
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: textColor,
                  padding: '8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeColors.boardBackground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={contentStyle}>
              <div style={badgeStyle}>
                {formatGameMode(gameMode)} Mode
              </div>
              
              <h3 style={headingStyle}>How to Play</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  backgroundColor: themeColors.score, 
                  padding: '8px', 
                  borderRadius: '4px', 
                  marginBottom: '12px',
                  border: `1px solid ${themeColors.boardBackground}`
                }}>
                  <p style={{ margin: '0', fontSize: '13px', fontWeight: 'bold', color: textColor }}>
                    🎯 <strong>Goal:</strong> Combine tiles to reach 2048!
                  </p>
                </div>
                
                <h4 style={subHeadingStyle}>🎮 Controls</h4>
                <ul style={listStyle}>
                  <li style={{ marginBottom: '4px', color: textColor }}><strong>Arrow Keys</strong> or <strong>WASD</strong> to move</li>
                  <li style={{ marginBottom: '4px', color: textColor }}><strong>Ctrl+Z</strong> to undo</li>
                  <li style={{ marginBottom: '4px', color: textColor }}><strong>Ctrl+Y</strong> to redo</li>
                </ul>
                
                <div style={{ 
                  backgroundColor: themeColors.tileBackground, 
                  padding: '6px', 
                  borderRadius: '4px', 
                  marginBottom: '12px' 
                }}>
                  <p style={{ margin: '0', fontSize: '13px', color: textColor }}>
                    📱 <strong>Mobile:</strong> Swipe in any direction
                  </p>
                </div>
                
                <h4 style={subHeadingStyle}>🔢 Rules</h4>
                <ul style={listStyle}>
                  <li style={{ marginBottom: '4px', color: textColor }}>Tiles slide in chosen direction</li>
                  <li style={{ marginBottom: '4px', color: textColor }}>Identical tiles merge into one</li>
                  <li style={{ marginBottom: '4px', color: textColor }}>New tile appears after each move</li>
                  <li style={{ marginBottom: '4px', color: textColor }}>Game ends when no moves possible</li>
                </ul>
              </div>

              <h3 style={headingStyle}>Features</h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '6px', 
                marginBottom: '18px',
                fontSize: '12px'
              }}>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>🔄 Undo/Redo</span>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>🎮 Game modes</span>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>📊 Statistics</span>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>🎨 Themes</span>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>🔊 Sound</span>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>💾 Auto-save</span>
                <span style={{ backgroundColor: themeColors.tileBackground, padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>⏱️ Smart timer</span>
              </div>

              <h3 style={headingStyle}>Tips</h3>
              <div style={{ 
                backgroundColor: themeColors.score, 
                padding: '8px', 
                borderRadius: '4px', 
                marginBottom: '12px',
                border: `1px solid ${themeColors.boardBackground}`
              }}>
                <ul style={{ margin: '0', paddingLeft: '18px', fontSize: '12px' }}>
                  <li style={{ marginBottom: '3px', color: textColor }}>Keep highest tile in corner</li>
                  <li style={{ marginBottom: '3px', color: textColor }}>Focus moves in 2-3 directions</li>
                  <li style={{ marginBottom: '3px', color: textColor }}>Use undo to learn from mistakes</li>
                  <li style={{ marginBottom: '3px', color: textColor }}>Think ahead before moving</li>
                  <li style={{ marginBottom: '3px', color: textColor }}>Timer pauses after 5min inactivity</li>
                </ul>
              </div>

              <div style={{ 
                marginTop: '12px', 
                padding: '6px', 
                backgroundColor: themeColors.score, 
                borderRadius: '4px',
                textAlign: 'center' as const
              }}>
                <div style={{ color: textColor, fontSize: '12px', fontWeight: 'bold' }}>
                  2048 - Exponent Energy
                </div>
                <div style={{ color: textColor, fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
                  Built by Siddharth Harsh Raj
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
