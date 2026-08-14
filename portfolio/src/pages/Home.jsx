import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NOME = 'Edson Júnior'

const interesses = [
  {
    icone: '⬡',
    titulo: 'Inteligência Artificial',
    texto: 'Explorar modelos de linguagem, APIs de IA e suas aplicações práticas no desenvolvimento de software.',
  },
  {
    icone: '◈',
    titulo: 'Análise de Dados',
    texto: 'Transformar dados brutos em informação útil usando SQL, Python, Pandas e visualizações claras.',
  },
  {
    icone: '◻',
    titulo: 'Desenvolvimento Backend',
    texto: 'Construir APIs e sistemas robustos com tecnologias diversas, como Java e Spring Boot, com foco em boas práticas.',
  },
]

export default function Home() {
  const [digitado, setDigitado] = useState('')
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (indice < NOME.length) {
      const t = setTimeout(() => {
        setDigitado(prev => prev + NOME[indice])
        setIndice(i => i + 1)
      }, 80)
      return () => clearTimeout(t)
    }
  }, [indice])

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-eyebrow">Olá, sou</p>
          <h1 className="hero-titulo">
            {digitado}
            <span className="hero-cursor" aria-hidden="true">|</span>
          </h1>
          <p className="hero-subtitulo">
            Estudante de Sistemas de Informação no CIn/UFPE, com interesse em
            desenvolvimento de software, inteligência artificial e análise de dados.
          </p>
          <div className="hero-acoes">
            <Link to="/portfolio" className="btn-primario">Ver projetos</Link>
            <Link to="/sobre"     className="btn-secundario">Sobre mim</Link>
          </div>
        </div>
        <div className="hero-decoracao" aria-hidden="true">
          <div className="hero-blob" />
        </div>
      </section>

      {/* Interesses */}
      <section className="secao">
        <div className="container">
          <h2 className="secao-titulo">Interesses</h2>
          <div className="interesses-grid">
            {interesses.map(item => (
              <div key={item.titulo} className="interesse-card">
                <span className="interesse-icone">{item.icone}</span>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="secao secao-contato">
        <div className="container">
          <h2 className="secao-titulo">Contato</h2>
          <div className="contato-grid">
            <a href="mailto:ejapj@cin.ufpe.br" className="contato-item">
              <span className="contato-icone">✉</span>
              <div>
                <strong>E-mail institucional</strong>
                <span>ejapj@cin.ufpe.br</span>
              </div>
            </a>
            <a href="https://github.com/edsonpjr" target="_blank" rel="noreferrer" className="contato-item">
              <span className="contato-icone">⌥</span>
              <div>
                <strong>GitHub</strong>
                <span>github.com/edsonpjr</span>
              </div>
            </a>
            <a href="https://linkedin.com/in/edson-junior-a91b09417" target="_blank" rel="noreferrer" className="contato-item">
              <span className="contato-icone">in</span>
              <div>
                <strong>LinkedIn</strong>
                <span>linkedin.com/in/edson-junior</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}