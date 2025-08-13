import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  opacity?: number;
}

// Advanced Particle System with Physics
export const AdvancedParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1500,
  size = 0.03,
  color = '#d4af37',
  speed = 0.5,
  opacity = 0.6
}) => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Generate particle positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Size variation
      sizes[i] = Math.random() * 0.5 + 0.5;
    }
    
    return { positions, velocities, sizes };
  }, [count]);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Update positions with velocity
        positions[i3] += particles.velocities[i3] * speed;
        positions[i3 + 1] += particles.velocities[i3 + 1] * speed;
        positions[i3 + 2] += particles.velocities[i3 + 2] * speed;
        
        // Add some wave motion
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + positions[i3]) * 0.001;
        
        // Boundary conditions - wrap around
        if (positions[i3] > 12.5) positions[i3] = -12.5;
        if (positions[i3] < -12.5) positions[i3] = 12.5;
        if (positions[i3 + 1] > 12.5) positions[i3 + 1] = -12.5;
        if (positions[i3 + 1] < -12.5) positions[i3 + 1] = 12.5;
        if (positions[i3 + 2] > 12.5) positions[i3 + 2] = -12.5;
        if (positions[i3 + 2] < -12.5) positions[i3 + 2] = 12.5;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate the entire system slowly
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={particles.sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
};

// Interactive Particle Swarm
export const InteractiveParticleSwarm: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // React Spring animation for the group
  const { rotation } = useSpring({
    rotation: [0, Math.PI * 2, 0],
    config: { duration: 20000 },
    loop: true,
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Mouse interaction
      mousePosition.current.x = state.mouse.x * 0.5;
      mousePosition.current.y = state.mouse.y * 0.5;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.current.y * 0.1,
        0.02
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.current.x * 0.1,
        0.02
      );
    }
  });

  return (
    <animated.group ref={groupRef} rotation={rotation as any}>
      <AdvancedParticleSystem count={800} color="#d4af37" size={0.04} />
      <AdvancedParticleSystem count={600} color="#8a9ba8" size={0.02} opacity={0.4} />
      <AdvancedParticleSystem count={400} color="#ffffff" size={0.01} opacity={0.2} />
    </animated.group>
  );
};

// Energy Field Effect
export const EnergyField: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial
        transparent
        opacity={0.05}
        color="#d4af37"
        wireframe
      />
    </mesh>
  );
};

export default AdvancedParticleSystem;