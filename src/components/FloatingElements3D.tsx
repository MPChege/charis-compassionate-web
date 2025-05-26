
import { Canvas } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'

const FloatingElements3D = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <Sphere position={[-8, 4, -5]} args={[0.5, 16, 16]}>
            <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
          </Sphere>
        </Float>
        
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
          <Sphere position={[8, -3, -3]} args={[0.3, 16, 16]}>
            <meshStandardMaterial color="#8B4513" metalness={0.6} roughness={0.3} />
          </Sphere>
        </Float>
        
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.8}>
          <Sphere position={[5, 6, -4]} args={[0.4, 16, 16]}>
            <meshStandardMaterial color="#CD853F" metalness={0.7} roughness={0.2} />
          </Sphere>
        </Float>
        
        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
          <Sphere position={[-5, -5, -6]} args={[0.6, 16, 16]}>
            <meshStandardMaterial color="#B8860B" metalness={0.5} roughness={0.4} />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  )
}

export default FloatingElements3D
