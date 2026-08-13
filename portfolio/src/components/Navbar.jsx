import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      <nav>
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/portfolio">Portfólio</NavLink>
      </nav>
    </header>
  )
}