import React, { useRef, useLayoutEffect, forwardRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb'

export const Car = forwardRef(({ color = '#050505', ...props }, ref) => {
    const { scene } = useGLTF(MODEL_URL)

    // Clone to avoid shared state issues
    const clonedScene = useMemo(() => scene.clone(), [scene])

    const wheels = useRef([])

    useLayoutEffect(() => {
        wheels.current = []

        // The Ferrari model has specific groups for wheels:
        // 'wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr'
        // These groups contain the tires, rims, and brake discs.
        const wheelNames = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr']

        clonedScene.traverse((obj) => {
            // Setup body material
            if (obj.isMesh) {
                obj.castShadow = true
                obj.receiveShadow = true

                if (obj.name.toLowerCase().includes('body') || (obj.material && obj.material.name.toLowerCase().includes('body'))) {
                    obj.material = obj.material.clone()
                    obj.material.color.set(color)
                    obj.material.metalness = 1
                    obj.material.roughness = 0.1
                }
            }

            // Specifically target wheel groups for rotation
            // Rotating the group will rotate everything inside (tire + rim)
            if (wheelNames.includes(obj.name)) {
                wheels.current.push(obj)
            }
        })

        // If exact name matching didn't work (unlikely for this model), 
        // fallback to fuzzy matching for groups
        if (wheels.current.length === 0) {
            clonedScene.traverse((obj) => {
                if (obj.isGroup && obj.name.toLowerCase().includes('wheel')) {
                    wheels.current.push(obj)
                }
            })
        }
    }, [clonedScene, color])

    // Use an internal ref to track the group, because the forwarded ref might be a function (callback ref)
    const internalRef = useRef()

    // Sync the internal ref with the forwarded ref
    useLayoutEffect(() => {
        if (typeof ref === 'function') {
            ref(internalRef.current)
        } else if (ref) {
            ref.current = internalRef.current
        }
    }, [ref])

    // Precise movement tracking
    const lastX = useRef(props.position ? props.position[0] : -15)

    useFrame(() => {
        // Always read from the internal ref which is attached to the group
        const group = internalRef.current

        if (group) {
            const currentX = group.position.x
            const deltaX = currentX - lastX.current
            lastX.current = currentX

            // Rotate wheel groups
            if (Math.abs(deltaX) > 0.0001) {
                // For the Ferrari model, X is the rotation axis.
                // We multiply by a factor to match the visual speed of the road.
                const rotationAmount = deltaX * 4

                wheels.current.forEach((wheel) => {
                    wheel.rotation.x += rotationAmount
                })
            }
        }
    })

    return (
        <group ref={internalRef} {...props} dispose={null}>
            <primitive object={clonedScene} scale={2} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
})

useGLTF.preload(MODEL_URL)
