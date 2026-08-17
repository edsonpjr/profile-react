import './ProjectCard.css'

export default function ProjectCard({ projeto }) {
  const {
    nome,
    descricao,
    objetivo,
    disciplina,
    tecnologias = [],
    aprendizados,
    imagem,
    linkRepo,
    linkPrototipo,
  } = projeto

  return (
    <article className="project-card">
      <div className="project-card-imagem">
        <img
          src={imagem || 'https://placehold.co/800x450/161B22/3FB950?text=Projeto'}
          alt={`Interface do projeto ${nome}`}
        />
        <span className="tag project-card-disciplina">{disciplina}</span>
      </div>

      <div className="project-card-corpo">
        <h3 className="project-card-nome">{nome}</h3>
        <p className="project-card-descricao">{descricao}</p>

        <div className="project-card-bloco">
          <span className="project-card-rotulo">Objetivo</span>
          <p>{objetivo}</p>
        </div>

        {tecnologias.length > 0 && (
          <div className="project-card-bloco">
            <span className="project-card-rotulo">Tecnologias</span>
            <div className="project-card-tags">
              {tecnologias.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        )}

        {aprendizados && (
          <div className="project-card-bloco">
            <span className="project-card-rotulo">Aprendizados</span>
            <p>{aprendizados}</p>
          </div>
        )}

        <div className="project-card-acoes">
          {linkRepo && (
            <a href={linkRepo} target="_blank" rel="noreferrer" className="project-card-btn">
              Ver repositório
            </a>
          )}
          {linkPrototipo && (
            <a href={linkPrototipo} target="_blank" rel="noreferrer" className="project-card-btn project-card-btn--secundario">
              Ver protótipo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}