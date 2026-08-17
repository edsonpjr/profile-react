import ProjectCard from '../components/ProjectCard'
import './Portfolio.css'

const projetos = [
  {
    nome: 'CadastroDeNinjasAPI',
    descricao: 'Uma API REST para cadastro e gerenciamento de ninjas, com operações completas de criação, leitura, atualização e exclusão, documentada via Swagger.',
    objetivo: 'Aplicar os fundamentos de desenvolvimento backend com Java e Spring Boot, construindo uma API REST funcional com banco de dados, validações e tratamento de erros padronizado.',
    disciplina: 'Curso Java10x',
    tecnologias: ['Java', 'Spring Boot', 'Spring Data JPA', 'H2 Database', 'Maven', 'REST', 'Swagger'],
    aprendizados: 'Aprendi a estruturar uma aplicação em camadas (Controller, Service, Repository), a mapear entidades com JPA, a lidar com exceções de forma centralizada e a documentar endpoints de forma clara.',
    imagem: '/~ejapj/imagens/projeto_1.png',
    linkRepo: 'https://github.com/edsonpjr/CadastroDeNinjas',
  },
  {
    nome: 'InteliHub-Edu',
    descricao: 'Sistema CRUD fullstack para gerenciamento de materiais didáticos com sugestão automática de descrições e tags via Inteligência Artificial.',
    objetivo: 'Solução desenvolvida como resposta a um Desafio Técnico — Hub Inteligente de Recursos Educacionais — integrando backend, frontend e IA generativa.',
    disciplina: 'Desafio técnico',
    tecnologias: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'PostgreSQL', 'Gemini API', 'React', 'Vite', 'Axios', 'Docker'],
    aprendizados: 'Implementar CRUD completo em arquitetura fullstack, integrar API de IA generativa, aplicar boas práticas de organização, arquitetura e observabilidade.',
    imagem: '/~ejapj/imagens/projeto_2.png',
    linkRepo: 'https://github.com/edsonpjr/InteliHub-Edu',
  },
  {
    nome: 'bootcamp-sdw-2023',
    descricao: 'Pipeline ETL em Python com base de dados JSON criada manualmente, transformação com Pandas e enriquecimento de conteúdo via API do Gemini.',
    objetivo: 'Implementar um pipeline de ETL básico com Python, contornando a indisponibilidade da API original com uma base hardcoded em JSON.',
    disciplina: 'Bootcamp',
    tecnologias: ['Python', 'Pandas', 'Gemini API'],
    aprendizados: 'Entender o fluxo completo de ETL — extração a partir de base JSON criada manualmente, transformação com Pandas e enriquecimento com a API do Gemini para geração de conteúdo automatizado. Primeiro contato prático com pipelines de dados em Python.',
    imagem: '/~ejapj/imagens/projeto_3.png',
    linkRepo: 'https://github.com/edsonpjr/bootcamp-sdw-2023',
  },
  {
    nome: 'ELT Pipeline: NYC Yellow Taxi Trip Records',
    descricao: 'Pipeline ELT para análise de quase 3 milhões de corridas de táxi amarelo de Nova York (Janeiro/2024), construído inteiramente com SQL puro via DuckDB.',
    objetivo: 'Desafio prático do processo seletivo da Liga Acadêmica de Engenharia de Dados (LED-UFPE) — modelar, limpar e analisar dados públicos de grande volume.',
    disciplina: 'Desafio técnico LED',
    tecnologias: ['DuckDB', 'SQL'],
    aprendizados: 'Investigar dados antes de limpar, documentar decisões com evidência, modelar esquema estrela para análise e garantir rastreabilidade de ponta a ponta.',
    imagem: '/~ejapj/imagens/projeto_4.png',
    linkRepo: 'https://github.com/edsonpjr/E14-LED',
  },
  {
    nome: 'MAVER — Mapeamento Virtual do Emprego em Recife',
    descricao: 'Plataforma que transforma dados públicos dispersos em pautas investigáveis sobre emprego e renda de Recife, com granularidade por bairro.',
    objetivo: 'Construir um conceito de produto com design centrado no usuário, desde a ideação até uma prova de conceito navegável.',
    disciplina: 'CAD',
    tecnologias: ['Excalidraw', 'IA Generativa', 'Gemini API'],
    aprendizados: 'Construir uma prova de conceito (POC) desde a ideação e aplicar conceitos de design centrado no usuário.',
    imagem: '/~ejapj/imagens/projeto_5.png',
    linkPrototipo: 'https://maver.vercel.app',
  },
]

export default function Portfolio() {
  return (
    <>
      <section className="portfolio-banner">
        <div className="container">
          <p className="tag">Projetos</p>
          <h1 className="portfolio-titulo">O que construí até aqui.</h1>
          <p className="portfolio-subtitulo">
            Projetos desenvolvidos durante a graduação, em bootcamps e desafios técnicos —
            explorando backend, dados e inteligência artificial.
          </p>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="portfolio-grid">
            {projetos.map(projeto => (
              <ProjectCard key={projeto.nome} projeto={projeto} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}