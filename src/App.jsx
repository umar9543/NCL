import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Car } from './Car'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import gsap from 'gsap'

export default function App() {
  const [carNode, setCarNode] = useState(null)
  const [carStopped, setCarStopped] = useState(false)
  const heroContentRef = useRef()
  const hasAnimated = useRef(false)

  // This function will be called when the Car component is mounted and the ref is set
  const onCarMount = useCallback((node) => {
    if (node) {
      setCarNode(node)
    }
  }, [])

  useEffect(() => {
    if (carNode && !hasAnimated.current) {
      hasAnimated.current = true

      // Drive the car in from the left
      gsap.fromTo(carNode.position,
        { x: -15 },
        {
          x: 4.5,
          duration: 3,
          ease: "power2.inOut",
          onComplete: () => {
            setCarStopped(true)
            // Fade in the hero content
            if (heroContentRef.current) {
              gsap.to(heroContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
              })
            }
          }
        }
      )
    }
  }, [carNode])

  return (
    <div className="landing-container">
      <div className="bg-pattern" />

      <Navbar />
      <Hero ref={heroContentRef} />

      {/* Scroll Indicator - Hidden until car stops */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '15%',
        display: carStopped ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        color: '#22c55e',
        fontSize: '0.8rem',
        fontWeight: '600',
        zIndex: 20
      }}>
        <span>Scroll to explore</span>
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid #22c55e',
          borderRadius: '12px',
          position: 'relative'
        }}>
          <div style={{
            width: '4px',
            height: '8px',
            background: '#22c55e',
            borderRadius: '2px',
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'scroll-anim 1.5s infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scroll-anim {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 15px); opacity: 0; }
        }
      `}</style>

      {/* 3D Scene Layer */}
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 1.5, 10], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={20} castShadow />
          <directionalLight position={[-5, 5, 2]} intensity={2} />

          <Suspense fallback={null}>
            <Car ref={onCarMount} color="#050505" position={[-15, -0.5, 0]} />
            <Environment preset="city" />
          </Suspense>

          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.6}
            scale={20}
            blur={2.5}
            far={10}
            resolution={1024}
          />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.4} />
          </mesh>
        </Canvas>
      </div>

      {/* Footer Info Lines */}

    </div>
  )
}
