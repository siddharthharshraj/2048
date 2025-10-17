import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import type { GameSettings, GameMode, Theme } from '../../types';
import type { GameStatistics } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: Partial<GameSettings>) => void;
  statistics: GameStatistics;
  onResetStats: () => void;
  onGameModeChange: (mode: GameMode) => void;
  currentMode: GameMode;
}

/**
 * Sidebar component implementing the Facade Pattern
 * Provides unified interface for game settings, statistics, and controls
 */
export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  statistics,
  onResetStats,
  onGameModeChange,
  currentMode,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'stats' | 'modes'>('settings');
  const { colors } = useTheme(settings.theme);

  const gameModes = [
    { id: 'classic' as GameMode, name: 'Classic', description: 'Traditional 2048 gameplay' },
    { id: 'timeAttack' as GameMode, name: 'Time Attack', description: '2 minutes to get highest score' },
    { id: 'zen' as GameMode, name: 'Zen Mode', description: 'Relaxed play, no game over' },
    { id: 'challenge' as GameMode, name: 'Challenge', description: 'Reach 4096 to win' },
  ];

  const themes = [
    { id: 'default' as Theme, name: 'Default', color: '#faf8ef' },
    { id: 'dark' as Theme, name: 'Dark', color: '#2d3748' },
    { id: 'neon' as Theme, name: 'Neon', color: '#1a202c' },
    { id: 'minimal' as Theme, name: 'Minimal', color: '#ffffff' },
  ];

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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '320px',
              backgroundColor: colors.background,
              boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px',
              borderBottom: `1px solid ${colors.boardBackground}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
            }}>
              <h2 style={{ margin: 0, color: colors.text, fontSize: '20px', paddingRight: '40px' }}>
                Game Menu
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
                  color: colors.text,
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
                  e.currentTarget.style.backgroundColor = colors.boardBackground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>
            </div>

            {/* Tab Navigation */}
            <div style={{
              display: 'flex',
              borderBottom: `1px solid ${colors.boardBackground}`,
            }}>
              {[
                { id: 'settings', label: 'Settings' },
                { id: 'stats', label: 'Statistics' },
                { id: 'modes', label: 'Game Modes' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? colors.button : 'transparent',
                    color: activeTab === tab.id ? colors.buttonText : colors.text,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = colors.tileBackground;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
              {activeTab === 'settings' && (
                <div>
                  <h3 style={{ color: '#776e65', marginTop: 0 }}>Game Settings</h3>
                  
                  {/* Board Size */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#776e65', fontSize: '14px' }}>
                      Board Size: {settings.boardSize}×{settings.boardSize}
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="8"
                      value={settings.boardSize}
                      onChange={(e) => onSettingsChange({ boardSize: parseInt(e.target.value) })}
                      style={{ width: '100%' }}
                    />
                  </div>

                  {/* Theme Selection */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#776e65', fontSize: '14px' }}>
                      Theme
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {themes.map(theme => (
                        <button
                          key={theme.id}
                          onClick={() => onSettingsChange({ theme: theme.id })}
                          style={{
                            padding: '8px',
                            border: settings.theme === theme.id ? '2px solid #8f7a66' : '1px solid #bbada0',
                            backgroundColor: theme.color,
                            color: theme.id === 'dark' || theme.id === 'neon' ? '#f9f6f2' : '#776e65',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontSize: '12px',
                          }}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Settings */}
                  {[
                    { key: 'soundEnabled', label: 'Sound Effects' },
                    { key: 'autoSave', label: 'Auto Save' },
                  ].map(setting => (
                    <div key={setting.key} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                    }}>
                      <span style={{ color: '#776e65', fontSize: '14px' }}>{setting.label}</span>
                      <label style={{ 
                        position: 'relative', 
                        display: 'inline-block', 
                        width: '50px', 
                        height: '24px' 
                      }}>
                        <input
                          type="checkbox"
                          checked={settings[setting.key as keyof GameSettings] as boolean}
                          onChange={(e) => onSettingsChange({ [setting.key]: e.target.checked })}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: settings[setting.key as keyof GameSettings] ? '#8f7a66' : '#ccc',
                          borderRadius: '24px',
                          transition: '0.2s',
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '""',
                            height: '18px',
                            width: '18px',
                            left: settings[setting.key as keyof GameSettings] ? '29px' : '3px',
                            bottom: '3px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            transition: '0.2s',
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stats' && (
                <div>
                  <h3 style={{ color: '#776e65', marginTop: 0 }}>Statistics</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#bbada0', borderRadius: '4px' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9f6f2' }}>
                        {statistics.gamesPlayed}
                      </div>
                      <div style={{ fontSize: '12px', color: '#eee4da' }}>Games Played</div>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#bbada0', borderRadius: '4px' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9f6f2' }}>
                        {statistics.gamesWon}
                      </div>
                      <div style={{ fontSize: '12px', color: '#eee4da' }}>Games Won</div>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#bbada0', borderRadius: '4px' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9f6f2' }}>
                        {statistics.bestScore.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#eee4da' }}>Best Score</div>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#bbada0', borderRadius: '4px' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f9f6f2' }}>
                        {Math.round(statistics.winRate)}%
                      </div>
                      <div style={{ fontSize: '12px', color: '#eee4da' }}>Win Rate</div>
                    </div>
                  </div>

                  <button
                    onClick={onResetStats}
                    style={{
                      width: '100%',
                      marginTop: '20px',
                      padding: '12px',
                      backgroundColor: '#8f7a66',
                      color: '#f9f6f2',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    Reset Statistics
                  </button>
                </div>
              )}

              {activeTab === 'modes' && (
                <div>
                  <h3 style={{ color: '#776e65', marginTop: 0 }}>Game Modes</h3>
                  
                  {gameModes.map(mode => {
                    const isSelected = currentMode === mode.id;
                    
                    return (
                      <motion.div
                        key={mode.id}
                        onClick={() => onGameModeChange(mode.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: isSelected ? colors.button : colors.score,
                          color: colors.buttonText,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          border: isSelected ? `2px solid ${colors.buttonHover}` : `2px solid transparent`,
                          boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                      <div style={{ 
                        fontWeight: 'bold', 
                        marginBottom: '5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>{mode.name}</span>
                        {isSelected && (
                          <span style={{ 
                            fontSize: '16px', 
                            color: colors.buttonText,
                            fontWeight: 'bold'
                          }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        opacity: 0.9,
                        color: colors.buttonText
                      }}>
                        {mode.description}
                      </div>
                    </motion.div>
                  );
                  })}
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
