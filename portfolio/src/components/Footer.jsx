import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-nome">Edson Júnior</span>
        <span className="footer-sep">·</span>
        <span className="footer-texto">Sistemas de Informação — CIn/UFPE</span>
        <div className="footer-links">
          <a href="https://github.com/edsonpjr" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:ejapj@cin.ufpe.br">E-mail</a>
          <a href="https://linkedin.com/in/edson-junior-a91b09417" target="_blank" rel="noreferrer" >LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}