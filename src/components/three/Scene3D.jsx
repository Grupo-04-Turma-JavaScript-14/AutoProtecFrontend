import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  MeshTransmissionMaterial, 
  ContactShadows,
  Lightformer
} from '@react-three/drei';

function ShieldCore() {
  const mesh = useRef();
  const innerMesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.3;
    
    innerMesh.current.rotation.x -= delta * 0.4;
    innerMesh.current.rotation.y += delta * 0.1;
  });

  return (
    <Float floatIntensity={2} speed={2} rotationIntensity={0.5}>
      {/* Outer Glass Shield */}
      <mesh ref={mesh} scale={1.8}>
        <octahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={1}
          thickness={0.5}
          chromaticAberration={0.06}
          anisotropicBlur={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          color="#1E5BFF"
        />
      </mesh>
      
      {/* Inner Energy Core */}
      <mesh ref={innerMesh} scale={0.7}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#FF2C2C" 
          emissive="#FF2C2C" 
          emissiveIntensity={2} 
          toneMapped={false} 
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const group = useRef();
  
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group}>
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 8, 
            (Math.random() - 0.5) * 8, 
            (Math.random() - 0.5) * 8
          ]}
          scale={Math.random() * 0.03 + 0.01}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#1E5BFF" opacity={Math.random() * 0.7 + 0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        {/* Environment lighting */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 2, 1]} />
            <Lightformer color="#1E5BFF" intensity={5} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
            <Lightformer color="#FF2C2C" intensity={3} rotation-y={-Math.PI / 2} position={[5, -1, -1]} scale={[10, 2, 1]} />
          </group>
        </Environment>

        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

        <ShieldCore />
        <FloatingParticles />
        
        {/* Soft shadow below the floating object */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.8} 
          scale={15} 
          blur={2.5} 
          far={4} 
          color="#0A1230"
        />
      </Canvas>
    </div>
  );
}
