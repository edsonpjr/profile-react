import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          ejapj<span className="navbar-cursor">_</span>
        </NavLink>

        <button
          className="navbar-toggle"
          onClick={() => setAberto(!aberto)}
          aria-label="Abrir menu"
          aria-expanded={aberto}
        >
          <span /><span /><span />
        </button>

        <nav className={`navbar-links ${aberto ? 'aberto' : ''}`}>
          <NavLink to="/" onClick={() => setAberto(false)} end>Início</NavLink>
          <NavLink to="/sobre" onClick={() => setAberto(false)}>Sobre</NavLink>
          <NavLink to="/portfolio" onClick={() => setAberto(false)}>Portfólio</NavLink>
        </nav>
      </div>
    </header>
  )
}