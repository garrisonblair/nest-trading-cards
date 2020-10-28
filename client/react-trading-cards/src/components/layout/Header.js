import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header style={headerStyle}>
            <h1>Cards</h1>
            <Link to="/" style={linkStyle}>Home</Link> | 
            <Link to="/cards/create" style={linkStyle}> New Card</Link> | 
            <Link to="/profile" style={linkStyle}> Profile</Link> | 
            <Link to="/login" style={linkStyle}> Log In</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}