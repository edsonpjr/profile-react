const habilidades = [
  { categoria: 'Linguagens',       itens: ['Java', 'Python', 'JavaScript', 'SQL', 'C', 'Haskell'] },
  { categoria: 'Frameworks & Libs', itens: ['Spring Boot', 'React', 'NextJS', 'FastAPI', 'Vite'] },
  { categoria: 'Ferramentas',      itens: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Linux'] },
  { categoria: 'IA & Dados',       itens: ['Gemini API', 'Jupyter Notebook', 'Matplotlib', 'Pandas'] },
]

const linha_do_tempo = [
  { ano: '2021', evento: 'Ingresso no curso de Engenharia da Computação no CIn/UFPE.' },
  { ano: '2021', evento: 'Primeiros contatos com programação estruturada em C na disciplina de Introdução à Programação.' },
  { ano: '2022', evento: 'Primeiros contatos com princípios de algoritmos.' },
  { ano: '2023', evento: 'Ingresso no projeto de monitoria de Programação Funcional com Haskell (3 anos de projeto)' },
  { ano: '2023', evento: 'Desenvolvimento de projetos práticos, explorando análise de dados e sistemas com banco de dados.' },
  { ano: '2024', evento: 'Início dos estudos em desenvolvimento web com React e backend com Spring Boot.' },
  { ano: '2025', evento: 'Integração de APIs de inteligência artificial (Gemini) em projetos acadêmicos.' },
  { ano: '2025', evento: 'Preparatório para pivotar de curso.' },
  { ano: '2026', evento: 'Ingresso no curso de Sistemas de Informação no CIn/UFPE.' },
]

export default function Sobre() {
  return (
    <>
      {/* Banner */}
      <section className="sobre-banner">
        <div className="container">
          <p className="tag">Sobre mim</p>
          <h1 className="sobre-titulo">
            Construindo na interseção entre<br />software e inteligência.
          </h1>
        </div>
      </section>

      {/* Quem sou */}
      <section className="secao">
        <div className="container sobre-grid">
          <div className="sobre-texto">
            <h2 className="secao-titulo">Quem sou</h2>
            <p>
              Sou Edson Júnior, estudante de Sistemas de Informação no Centro de Informática
              da Universidade Federal de Pernambuco (CIn/UFPE). Tenho interesse genuíno em
              entender como sistemas funcionam de ponta a ponta — desde a modelagem de dados
              até a interface que o usuário final enxerga.
            </p>
            <p>
              Minha área de maior interesse é a intersecção entre desenvolvimento de software
              e inteligência artificial: como integrar modelos de linguagem e APIs de IA
              em sistemas que resolvem problemas reais de forma prática.
            </p>
            <p>
              Fora da computação, me interesso por esportes diversos, música e a cultura do Recife —
              a cidade que moldou minha forma de ver o mundo.
            </p>
          </div>
          <aside className="sobre-lateral">
            <div className="sobre-info-card">
              <div className="info-item">
                <span className="info-rotulo">Curso</span>
                <span>Sistemas de Informação</span>
              </div>
              <div className="info-item">
                <span className="info-rotulo">Instituição</span>
                <span>CIn / UFPE</span>
              </div>
              <div className="info-item">
                <span className="info-rotulo">Cidade</span>
                <span>Recife, PE</span>
              </div>
              <div className="info-item">
                <span className="info-rotulo">Foco atual</span>
                <span>Backend, React, IA aplicada</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Trajetória */}
      <section className="secao secao-cinza">
        <div className="container">
          <h2 className="secao-titulo">Trajetória acadêmica</h2>
          <ol className="timeline" aria-label="Linha do tempo acadêmica">
            {linha_do_tempo.map((item, i) => (
              <li key={i} className="timeline-item">
                <span className="timeline-ano">{item.ano}</span>
                <p className="timeline-evento">{item.evento}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Habilidades */}
      <section className="secao">
        <div className="container">
          <h2 className="secao-titulo">Habilidades técnicas</h2>
          <div className="habilidades-grid">
            {habilidades.map(grupo => (
              <div key={grupo.categoria} className="habilidade-grupo">
                <h3 className="habilidade-categoria">{grupo.categoria}</h3>
                <ul className="habilidade-lista">
                  {grupo.itens.map(item => (
                    <li key={item} className="tag">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="secao secao-objetivos">
        <div className="container">
          <h2 className="secao-titulo">Objetivos profissionais</h2>
          <p className="objetivos-texto">
            Quero construir experiência sólida em desenvolvimento de software, com foco em
            sistemas que integrem inteligência artificial de forma útil e acessível.
            A médio prazo, tenho interesse em explorar e contribuir com projetos 
            de pesquisa na área de IA aplicada. A longo prazo, sonho em trabalhar 
            em times de produto que resolvam problemas reais para
            pessoas reais — especialmente no contexto brasileiro.
          </p>
        </div>
      </section>
    </>
  )
}