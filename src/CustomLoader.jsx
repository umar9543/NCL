import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

export function CustomLoader() {
    const { active, progress } = useProgress()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (active) {
            setVisible(true)
        } else {
            // Fade out effect
            const timer = setTimeout(() => setVisible(false), 500)
            return () => clearTimeout(timer)
        }
    }, [active])

    if (!visible) return null

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            transition: 'opacity 0.5s ease-out',
            opacity: active ? 1 : 0,
            pointerEvents: active ? 'all' : 'none'
        }}>
            <img
                src="/NCL_Logo.png"
                alt="Loading..."
                style={{
                    width: '150px',
                    marginBottom: '20px',
                    animation: 'pulse 1.5s infinite ease-in-out'
                }}
            />

            {/* <div style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#22c55e', // Using the primary green color
                fontWeight: '600',
                fontSize: '1.2rem',
                marginBottom: '10px'
            }}>
                {progress.toFixed(0)}%
            </div> */}

            <div style={{
                width: '200px',
                height: '4px',
                background: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#22c55e',
                    transition: 'width 0.1s ease'
                }} />
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
        </div>
    )
}
