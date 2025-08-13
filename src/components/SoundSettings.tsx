import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  MusicalNoteIcon,
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';
import { useSound } from '../hooks/useSound';
import PremiumButton from './atoms/PremiumButton';

interface SoundSettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'floating' | 'inline';
}

const SoundSettings: React.FC<SoundSettingsProps> = ({ 
  isOpen = false, 
  onClose,
  position = 'floating' 
}) => {
  const { 
    isEnabled, 
    isMuted, 
    volume, 
    toggleSound, 
    toggleMute, 
    setVolume,
    playSound 
  } = useSound();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // Play a test sound when adjusting volume
    playSound('click');
  };

  const handleTestSound = (effect: 'click' | 'hover' | 'success' | 'notification') => {
    playSound(effect);
  };

  if (position === 'floating') {
    return (
      <>
        {/* Floating Toggle Button */}
        <motion.button
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSound}
          aria-label="Toggle sound"
        >
          <motion.div
            animate={{ rotate: isEnabled ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {isEnabled ? (
              <SpeakerWaveIcon className="w-6 h-6 text-black" />
            ) : (
              <SpeakerXMarkIcon className="w-6 h-6 text-black" />
            )}
          </motion.div>
          
          {/* Pulse animation when enabled */}
          {isEnabled && (
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-400"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
        </motion.button>

        {/* Settings Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed bottom-24 left-6 z-50 w-80 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-amber-400/20 rounded-2xl shadow-2xl p-6"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <MusicalNoteIcon className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-semibold text-white">Sound Settings</h3>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sound Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sound Effects</span>
                  <motion.button
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      isEnabled ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                    onClick={toggleSound}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: isEnabled ? '32px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </motion.button>
                </div>

                {/* Mute Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Mute</span>
                  <motion.button
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      isMuted ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                    onClick={toggleMute}
                    whileTap={{ scale: 0.95 }}
                    disabled={!isEnabled}
                  >
                    <motion.div
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: isMuted ? '32px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </motion.button>
                </div>

                {/* Volume Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Volume</span>
                    <span className="text-amber-400 text-sm">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    disabled={!isEnabled || isMuted}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                    }}
                  />
                </div>

                {/* Test Sounds */}
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 mb-3">Test Sounds</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTestSound('click')}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                      disabled={!isEnabled || isMuted}
                    >
                      Click
                    </button>
                    <button
                      onClick={() => handleTestSound('hover')}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                      disabled={!isEnabled || isMuted}
                    >
                      Hover
                    </button>
                    <button
                      onClick={() => handleTestSound('success')}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                      disabled={!isEnabled || isMuted}
                    >
                      Success
                    </button>
                    <button
                      onClick={() => handleTestSound('notification')}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
                      disabled={!isEnabled || isMuted}
                    >
                      Notify
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Inline version for settings page
  return (
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Audio Preferences</h3>
          <p className="text-sm text-gray-400">Customize your sound experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
          <div>
            <p className="text-white font-medium">Enable Sound Effects</p>
            <p className="text-sm text-gray-400">Play audio feedback for interactions</p>
          </div>
          <motion.button
            className={`relative w-16 h-8 rounded-full transition-colors ${
              isEnabled ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 'bg-gray-600'
            }`}
            onClick={toggleSound}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{ left: isEnabled ? '36px' : '4px' }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className={`p-4 bg-gray-800/50 rounded-xl transition-opacity ${
          !isEnabled ? 'opacity-50 pointer-events-none' : ''
        }`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-medium">Master Volume</p>
            <span className="text-amber-400 font-bold">{Math.round(volume * 100)}%</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between mt-2">
              <SpeakerXMarkIcon className="w-4 h-4 text-gray-500" />
              <SpeakerWaveIcon className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Sound Test Grid */}
        <div className={`p-4 bg-gray-800/50 rounded-xl transition-opacity ${
          !isEnabled ? 'opacity-50 pointer-events-none' : ''
        }`}>
          <p className="text-white font-medium mb-3">Test Sound Effects</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Button Click', effect: 'click' as const, icon: '🔘' },
              { name: 'Hover', effect: 'hover' as const, icon: '👆' },
              { name: 'Success', effect: 'success' as const, icon: '✅' },
              { name: 'Notification', effect: 'notification' as const, icon: '🔔' },
            ].map((sound) => (
              <PremiumButton
                key={sound.effect}
                variant="aluminum"
                size="small"
                onClick={() => handleTestSound(sound.effect)}
                className="w-full"
              >
                <span className="mr-1">{sound.icon}</span>
                <span className="text-xs">{sound.name}</span>
              </PremiumButton>
            ))}
          </div>
        </div>

        {/* Haptic Feedback Info */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <div className="flex items-start space-x-3">
            <MusicalNoteIcon className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <p className="text-amber-200 font-medium text-sm">Enhanced Experience</p>
              <p className="text-amber-200/70 text-xs mt-1">
                Sound effects include haptic feedback on supported devices for a more immersive experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundSettings;