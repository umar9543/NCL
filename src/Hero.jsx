import React, { forwardRef } from 'react'

export const Hero = forwardRef((props, ref) => {
    return (
        <section className="hero">
            <div
                className="hero-content"
                ref={ref}
                style={{ opacity: 0, transform: 'translateY(40px)', transition: 'none' }}
            >
                <h1 style={{ marginTop: '50px' }}>Luxury, Safety & <span>Comfort</span>. <br /> All in One Ride.</h1>
                <p>
                    Experience premium chauffeured limousine services designed for corporate executives,
                    hotel partnerships, and VIP transportation. Professional, punctual, and impeccably maintained.
                </p>
                <div className="hero-btns">
                    <a href="#" className="btn-primary">Book Now →</a>
                    <a href="#" className="btn-secondary">Contact Us</a>
                </div>
                <div style={{

                    display: 'flex',
                    gap: '40px',
                    opacity: 0.6,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    zIndex: 20
                }}>
                    <div>✓ SAFE & SECURE</div>
                    <div>✓ 24/7 SERVICE</div>
                    <div>✓ PREMIUM FLEET</div>
                </div>
            </div>

        </section>
    )
})
