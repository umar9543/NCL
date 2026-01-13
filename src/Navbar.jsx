import React from 'react'

export function Navbar() {
    return (
        <nav>
            <div className="logo">
                <img src='/NCL_Logo.png' alt="" width={100} />
            </div>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Fleet</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <a href="#" className="btn-book">Book Now</a>
        </nav>
    )
}
