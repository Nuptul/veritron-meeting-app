import { useCallback, useEffect, useRef, useState } from 'react';

// Sound effect configurations
const SOUND_EFFECTS = {
  click: {
    frequency: 600,
    duration: 50,
    volume: 0.3,
    type: 'sine' as OscillatorType,
  },
  hover: {
    frequency: 800,
    duration: 30,
    volume: 0.1,
    type: 'triangle' as OscillatorType,
  },
  success: {
    frequency: 1000,
    duration: 150,
    volume: 0.4,
    type: 'sine' as OscillatorType,
    modulation: true,
  },
  error: {
    frequency: 200,
    duration: 200,
    volume: 0.4,
    type: 'sawtooth' as OscillatorType,
  },
  notification: {
    frequency: 440,
    duration: 100,
    volume: 0.3,
    type: 'square' as OscillatorType,
    decay: true,
  },
  swoosh: {
    frequency: 1200,
    duration: 80,
    volume: 0.2,
    type: 'sine' as OscillatorType,
    sweep: true,
  },
};

type SoundEffect = keyof typeof SOUND_EFFECTS;

interface UseSoundOptions {
  enabled?: boolean;
  volume?: number;
  muted?: boolean;
}

// Web Audio API context manager
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined' && window.AudioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

export const useSound = (options: UseSoundOptions = {}) => {
  const { enabled = true, volume = 1, muted = false } = options;
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [isMuted, setIsMuted] = useState(muted);
  const [globalVolume, setGlobalVolume] = useState(volume);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Check if sound is enabled in localStorage
    const savedPreference = localStorage.getItem('veritron-sound-enabled');
    if (savedPreference !== null) {
      setIsEnabled(savedPreference === 'true');
    }

    const savedVolume = localStorage.getItem('veritron-sound-volume');
    if (savedVolume !== null) {
      setGlobalVolume(parseFloat(savedVolume));
    }
  }, []);

  const playSound = useCallback(
    (effect: SoundEffect) => {
      if (!isEnabled || isMuted) return;

      const ctx = getAudioContext();
      if (!ctx) return;

      const config = SOUND_EFFECTS[effect];
      if (!config) return;

      try {
        // Resume audio context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = config.type;
        oscillator.frequency.value = config.frequency;
        
        // Apply volume
        const effectiveVolume = config.volume * globalVolume;
        gainNode.gain.value = effectiveVolume;
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        const currentTime = ctx.currentTime;
        const duration = config.duration / 1000; // Convert to seconds
        
        // Apply special effects
        if (config.modulation) {
          // Create frequency modulation for success sound
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 8;
          lfoGain.gain.value = 50;
          lfo.connect(lfoGain);
          lfoGain.connect(oscillator.frequency);
          lfo.start(currentTime);
          lfo.stop(currentTime + duration);
        }
        
        if (config.sweep) {
          // Frequency sweep for swoosh effect
          oscillator.frequency.setValueAtTime(config.frequency, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            config.frequency * 0.2,
            currentTime + duration
          );
        }
        
        if (config.decay) {
          // Volume decay for notification
          gainNode.gain.setValueAtTime(effectiveVolume, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            currentTime + duration
          );
        }
        
        // Start and stop
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        
        // Store gain node reference for volume control
        gainNodeRef.current = gainNode;
        
        // Cleanup
        oscillator.onended = () => {
          oscillator.disconnect();
          gainNode.disconnect();
          if (config.modulation) {
            // Additional cleanup for modulated sounds
          }
        };
      } catch (error) {
        console.warn('Failed to play sound effect:', error);
      }
    },
    [isEnabled, isMuted, globalVolume]
  );

  const toggleSound = useCallback(() => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('veritron-sound-enabled', String(newState));
  }, [isEnabled]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setGlobalVolume(clampedVolume);
    localStorage.setItem('veritron-sound-volume', String(clampedVolume));
  }, []);

  // Haptic feedback for mobile devices
  const playHaptic = useCallback((pattern: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!isEnabled || isMuted) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 30,
      };
      navigator.vibrate(patterns[pattern]);
    }
  }, [isEnabled, isMuted]);

  return {
    playSound,
    playHaptic,
    toggleSound,
    toggleMute,
    setVolume,
    isEnabled,
    isMuted,
    volume: globalVolume,
  };
};

// Sound provider hook for button clicks
export const useButtonSound = () => {
  const { playSound, playHaptic, isEnabled } = useSound();
  
  return useCallback(() => {
    if (isEnabled) {
      playSound('click');
      playHaptic('light');
    }
  }, [playSound, playHaptic, isEnabled]);
};

// Sound provider hook for hover effects
export const useHoverSound = () => {
  const { playSound, isEnabled } = useSound();
  const lastPlayedRef = useRef<number>(0);
  
  return useCallback(() => {
    if (isEnabled) {
      const now = Date.now();
      // Debounce hover sounds to prevent spam
      if (now - lastPlayedRef.current > 100) {
        playSound('hover');
        lastPlayedRef.current = now;
      }
    }
  }, [playSound, isEnabled]);
};

// Sound provider hook for form interactions
export const useFormSound = () => {
  const { playSound, playHaptic, isEnabled } = useSound();
  
  return {
    playSuccess: useCallback(() => {
      if (isEnabled) {
        playSound('success');
        playHaptic('medium');
      }
    }, [playSound, playHaptic, isEnabled]),
    
    playError: useCallback(() => {
      if (isEnabled) {
        playSound('error');
        playHaptic('heavy');
      }
    }, [playSound, playHaptic, isEnabled]),
    
    playNotification: useCallback(() => {
      if (isEnabled) {
        playSound('notification');
        playHaptic('light');
      }
    }, [playSound, playHaptic, isEnabled]),
  };
};

// Sound provider hook for navigation
export const useNavigationSound = () => {
  const { playSound, isEnabled } = useSound();
  
  return useCallback(() => {
    if (isEnabled) {
      playSound('swoosh');
    }
  }, [playSound, isEnabled]);
};