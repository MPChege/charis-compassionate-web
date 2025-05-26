
import { Canvas } from '@react-three/fiber'

const FloatingElements3D = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        
        <mesh position={[-8, 4, -5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
        </mesh>
        
        <mesh position={[8, -3, -3]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#8B4513" metalness={0.6} roughness={0.3} />
        </mesh>
        
        <mesh position={[5, 6, -4]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#CD853F" metalness={0.7} roughness={0.2} />
        </mesh>
        
        <mesh position={[-5, -5, -6]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#B8860B" metalness={0.5} roughness={0.4} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default FloatingElements3D
