'use client'

import { Float, Text3D } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { ReactNode, Suspense, useContext, useEffect, useRef } from 'react'
import { MathUtils } from 'three'
import type { Group } from 'three'

import { ThemeContext } from '@/contexts/ThemeContext'

const FONT_URL = '/fonts/helvetiker_bold.typeface.json'

const symbols = [
  { text: '{', position: [-4.6, 1.4, -1], size: 1.5, accent: false },
  { text: '}', position: [4.5, -1.3, -1.5], size: 1.4, accent: true },
  { text: '</>', position: [2.6, 2.2, -2], size: 0.9, accent: false },
  { text: '$', position: [-3.7, -1.9, -1], size: 1.1, accent: true },
  { text: ';', position: [-2.7, 2.4, -3.5], size: 0.9, accent: false },
] as const

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.25,
      3,
      delta,
    )
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.15,
      3,
      delta,
    )
  })

  return <group ref={group}>{children}</group>
}

interface SceneProps {
  active: boolean
  onFail: () => void
}

const Scene = ({ active, onFail }: SceneProps) => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const accent = isDark ? '#ff7a1a' : '#c2410c'
  const neutral = isDark ? '#6a6a74' : '#b9b1a5'

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault()
          onFail()
        })
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={accent} />

      <Suspense fallback={null}>
        <Rig>
          {symbols.map((symbol) => (
            <Float
              key={symbol.text}
              speed={1.2}
              rotationIntensity={0.6}
              floatIntensity={0.8}
            >
              <Text3D
                font={FONT_URL}
                position={[...symbol.position]}
                size={symbol.size}
                height={symbol.size * 0.35}
                curveSegments={8}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.03}
              >
                {symbol.text}
                <meshStandardMaterial
                  color={symbol.accent ? accent : neutral}
                  roughness={0.35}
                  metalness={0.4}
                />
              </Text3D>
            </Float>
          ))}
        </Rig>
      </Suspense>
    </Canvas>
  )
}

export default Scene
