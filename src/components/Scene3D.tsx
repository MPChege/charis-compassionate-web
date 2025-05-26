
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AnimatedSphere({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}>
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </Sphere>
  )
}

function AnimatedBox({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.z += delta * 0.2
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
    </Box>
  )
}

function AnimatedTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Torus ref={meshRef} position={position} args={[0.6, 0.2, 16, 100]}>
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.1} />
    </Torus>
  )
}

const Scene3D = () => {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-charis-gold/30">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#DAA520" />
        
        <AnimatedSphere position={[-2, 1, 0]} color="#8B4513" />
        <AnimatedBox position={[2, -1, 0]} color="#DAA520" />
        <AnimatedTorus position={[0, 0, -2]} color="#CD853F" />
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default Scene3D
