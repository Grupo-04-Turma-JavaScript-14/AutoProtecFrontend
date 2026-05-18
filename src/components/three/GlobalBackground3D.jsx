import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 3D Digital Silk Weave Component (Undulating tactile mesh sheet responsive to mouse & scroll scroll)
function DigitalSilkWeave({ scrollY }) {
  const meshRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geom = meshRef.current.geometry;
    const position = geom.attributes.position;
    const scrollFactor = scrollY.current * 0.0012; // Improvement 10: Scroll parallax factor

    // Apply continuous smooth sine waves to create organic digital satin sheet motion
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      const z = Math.sin(x * 0.16 + time * 0.5 + scrollFactor) * Math.cos(y * 0.16 + time * 0.4) * 0.65
              + Math.sin(x * 0.05 - time * 0.15) * 0.45;

      position.setZ(i, z);
    }
    position.needsUpdate = true;

    // Smooth responsive inertia rotation with mouse cursor & scroll parallax shift
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -Math.PI / 2.2 + mouse.y * 0.12 + scrollFactor * 0.1,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.12,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} position={[0, -1.2, -1]}>
      <planeGeometry args={[42, 42, 48, 48]} />
      <meshBasicMaterial
        color="#6B7280" // refined zinc gray
        wireframe
        transparent
        opacity={0.09}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Drifting Silver Stardust points
function PremiumSilverStardust({ count = 240 }) {
  const pointsRef = useRef();
  const { mouse } = useThree();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // X
      pos[i * 3 + 1] = Math.random() * 12 - 6;      // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1; // Z
      sp[i] = Math.random() * 0.12 + 0.04;          // Extremely slow drift speed
    }
    return [pos, sp];
  }, [count]);

  useFrame((state, delta) => {
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      let x = posAttr.getX(i);

      y -= delta * speeds[i];
      x += Math.sin(time * 0.15 + i) * 0.0015;

      if (y < -6) {
        y = 6;
        x = (Math.random() - 0.5) * 20;
      }

      posAttr.setY(i, y);
      posAttr.setX(i, x);
    }
    posAttr.needsUpdate = true;

    // Subtle drift with mouse parallax
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      mouse.x * 0.06,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F3F4F6" // silver-white dust
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function GlobalBackground3D() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#141519]">
      {/* Premium deep slate concrete vignetting gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(18,19,23,0.92)_95%)] z-10 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#141519"]} />
        <ambientLight intensity={0.6} />
        
        {/* Soft, tactical directional lighting */}
        <directionalLight position={[5, 5, 2]} intensity={0.4} color="#1E5BFF" />
        <directionalLight position={[-5, -5, -2]} intensity={0.2} color="#0891B2" />

        <DigitalSilkWeave scrollY={scrollY} />
        <PremiumSilverStardust count={250} />
      </Canvas>
    </div>
  );
}
