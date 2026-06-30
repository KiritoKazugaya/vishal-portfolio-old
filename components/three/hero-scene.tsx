"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Icosahedron, MeshDistortMaterial, Sparkles, Torus } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useRef } from "react"
import * as THREE from "three"

/** Mouse-reactive glowing AI core: distorted shader orb + counter-rotating
 *  wireframe shell + tilted orbital ring, all lit by bloom. */
function Core() {
  const group = useRef<THREE.Group>(null!)
  const shell = useRef<THREE.Mesh>(null!)
  const ring = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    const g = group.current
    if (g) {
      g.rotation.y += delta * 0.1
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.4, 0.04)
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.3, 0.04)
      g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.35, 0.04)
      g.position.y = THREE.MathUtils.lerp(g.position.y, state.pointer.y * 0.22, 0.04)
    }
    if (shell.current) shell.current.rotation.y -= delta * 0.22
    if (ring.current) {
      ring.current.rotation.x += delta * 0.14
      ring.current.rotation.y += delta * 0.09
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.7}>
        {/* glowing distorted core */}
        <Icosahedron args={[1.5, 20]}>
          <MeshDistortMaterial
            color="#3f3aa8"
            emissive="#5b21b6"
            emissiveIntensity={0.62}
            roughness={0.16}
            metalness={0.45}
            distort={0.36}
            speed={1.6}
          />
        </Icosahedron>
        {/* counter-rotating wireframe shell */}
        <Icosahedron ref={shell} args={[1.95, 1]}>
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.14} />
        </Icosahedron>
        {/* tilted orbital ring */}
        <Torus ref={ring} args={[2.7, 0.012, 16, 140]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </Torus>
      </Float>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 4]} intensity={30} color="#22d3ee" />
      <pointLight position={[-6, -2, 3]} intensity={26} color="#a78bfa" />
      <pointLight position={[0, 4, -4]} intensity={18} color="#5b8cff" />
      <Core />
      <Sparkles count={70} scale={[12, 8, 6]} size={2.2} speed={0.25} color="#9db0ff" opacity={0.5} />
      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.5}
          mipmapBlur
          radius={0.68}
        />
      </EffectComposer>
    </Canvas>
  )
}
