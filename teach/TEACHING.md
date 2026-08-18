# React — Guia de Estudo

> Material de referência para consulta com exemplos de aplicação genéricos

---

## Índice

1. [O que é React e como ele funciona](#1-o-que-é-react-e-como-ele-funciona)
2. [JSX — HTML dentro do JavaScript](#2-jsx--html-dentro-do-javascript)
3. [Componentes — a unidade básica do React](#3-componentes--a-unidade-básica-do-react)
4. [Props — passando informações entre componentes](#4-props--passando-informações-entre-componentes)
5. [Estado com useState](#5-estado-com-usestate)
6. [Efeitos com useEffect](#6-efeitos-com-useeffect)
7. [Listas com .map() e o atributo key](#7-listas-com-map-e-o-atributo-key)
8. [Renderização condicional](#8-renderização-condicional)
9. [React Router — navegação entre páginas](#9-react-router--navegação-entre-páginas)
10. [CSS em projetos React](#10-css-em-projetos-react)
11. [Estrutura de pastas e ponto de entrada](#11-estrutura-de-pastas-e-ponto-de-entrada)
12. [Vite — o que faz e como usar](#12-vite--o-que-faz-e-como-usar)
13. [Referência rápida de sintaxe JSX](#13-referência-rápida-de-sintaxe-jsx)

---

## 1. O que é React e como ele funciona

React é uma biblioteca JavaScript para construir interfaces de usuário. A ideia central é:

> **A interface é uma função dos dados. Quando os dados mudam, a tela atualiza automaticamente.**

No desenvolvimento web tradicional (sem React), você manipula o HTML diretamente com JavaScript — você busca um elemento, muda seu texto, adiciona uma classe. Isso funciona, mas fica difícil de gerenciar quando a interface cresce.

No React, você *declara* como a tela deve parecer dado um certo estado dos dados, e o React cuida de atualizar o que for necessário. Você descreve o resultado; o React descobre como chegar lá.

```
Dados  →  Componente React  →  Tela
  ↑                               |
  └───────── (usuário interage) ──┘
```

---

## 2. JSX — HTML dentro do JavaScript

Quando você escreve React, o código parece misturar HTML com JavaScript. Essa mistura tem um nome: **JSX**.

```jsx
function Exemplo() {
  return <h1>Olá, mundo!</h1>
}
```

JSX **não é HTML real**. É uma sintaxe especial que o Vite converte para chamadas JavaScript puras antes de enviar ao navegador. O exemplo acima se torna, por baixo dos panos:

```js
React.createElement('h1', null, 'Olá, mundo!')
```

Você não precisa escrever assim — o JSX existe exatamente para que você não precise. Mas é útil saber que tudo que parece HTML no React é, na prática, JavaScript.

---

### 2.1 Por que `className` e não `class`?

Em JavaScript, `class` é uma palavra reservada da linguagem (usada para criar classes de objetos). Para evitar conflito, o React usa `className` no lugar de `class`.

```jsx
// ❌ Vai gerar um aviso no console
<div class="caixa">Conteúdo</div>

// ✅ Forma correta em JSX
<div className="caixa">Conteúdo</div>
```

A mesma lógica vale para `for` (atributo de `<label>`), que vira `htmlFor` em JSX.

---

### 2.2 Expressões JavaScript dentro do JSX

As chaves `{}` são a "janela" do JSX para o JavaScript. Qualquer coisa entre `{}` é executada como código JS e o resultado é inserido na tela.

```jsx
const produto = 'Café'
const preco = 8.5

function Etiqueta() {
  return (
    <p>
      {produto} custa R$ {preco.toFixed(2)}
    </p>
  )
  // Resultado na tela: "Café custa R$ 8.50"
}
```

Você pode usar qualquer expressão válida: chamadas de função, operadores ternários, template literals. O que **não** funciona dentro de `{}` são blocos de código como `if/else` ou `for` — esses ficam fora do `return`.

---

### 2.3 Atributos dinâmicos

O mesmo princípio das chaves se aplica a atributos:

```jsx
const destino = '/contato'
const textoAlternativo = 'Foto de perfil'

function Cabecalho() {
  return (
    <div>
      <a href={destino}>Fale conosco</a>
      <img src="foto.jpg" alt={textoAlternativo} />
    </div>
  )
}
```

---

### 2.4 Um componente retorna um único elemento raiz

Um componente só pode retornar **um elemento na raiz**. Se você precisar de dois elementos irmãos, envolva-os — ou use um **fragmento** (`<>...</>`), que não gera nenhuma tag extra no HTML:

```jsx
// ❌ Dois elementos irmãos sem envoltório — erro de sintaxe
function Pagina() {
  return (
    <h1>Título</h1>
    <p>Parágrafo</p>
  )
}

// ✅ Com uma div envolvendo (gera <div> no HTML)
function Pagina() {
  return (
    <div>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </div>
  )
}

// ✅ Com fragmento (não gera nada extra no HTML)
function Pagina() {
  return (
    <>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </>
  )
}
```

Use o fragmento quando uma `<div>` extra quebraria o layout ou seria semanticamente errada.

---

## 3. Componentes — a unidade básica do React

Um componente é uma **função JavaScript que começa com letra maiúscula e retorna JSX**.

```jsx
// Componente simples, sem parâmetros
function Saudacao() {
  return <p>Bem-vindo ao site!</p>
}
```

Essa letra maiúscula não é estética — é obrigatória. O React usa ela para diferenciar componentes customizados (`<Saudacao />`) de tags HTML nativas (`<p>`, `<div>`).

---

### 3.1 Usando um componente dentro de outro

Componentes são usados como tags, com barra de fechamento se não tiverem filhos:

```jsx
function Rodape() {
  return (
    <footer>
      <p>© 2025 — Meu Site</p>
    </footer>
  )
}

function Pagina() {
  return (
    <div>
      <h1>Conteúdo principal</h1>
      <Rodape />   {/* usa o componente Rodape aqui */}
    </div>
  )
}
```

---

### 3.2 Exportando e importando componentes

Cada componente normalmente fica em seu próprio arquivo. Para usá-lo em outro arquivo, você exporta e importa:

```jsx
// arquivo: Rodape.jsx
export default function Rodape() {
  return <footer>© 2025</footer>
}
```

```jsx
// arquivo: Pagina.jsx
import Rodape from './Rodape'   // importa do arquivo Rodape.jsx

function Pagina() {
  return (
    <main>
      <p>Conteúdo</p>
      <Rodape />
    </main>
  )
}
```

`export default` significa "este é o principal export deste arquivo". Um arquivo pode ter apenas um `export default`.

---

## 4. Props — passando informações entre componentes

**Props** (de *properties*) são os parâmetros de um componente. Funcionam exatamente como argumentos de função — você passa valores de fora para dentro.

---

### 4.1 Enviando props

Props são passadas como atributos na tag do componente:

```jsx
// Passando a prop "nome" e a prop "idade"
<CartaoUsuario nome="Ana" idade={28} />
//                         ^sem aspas — é um número JS, não string^
```

---

### 4.2 Recebendo props

O componente recebe um único objeto `props`. O mais comum é **desestruturar** esse objeto direto no parâmetro da função:

```jsx
// Sem desestruturação — funciona, mas verboso
function CartaoUsuario(props) {
  return <p>{props.nome} tem {props.idade} anos.</p>
}

// Com desestruturação — mais limpo e legível
function CartaoUsuario({ nome, idade }) {
  return <p>{nome} tem {idade} anos.</p>
}
```

---

### 4.3 Valor padrão para props opcionais

Se uma prop pode não ser enviada, você define um valor padrão na desestruturação:

```jsx
function Botao({ texto, cor = 'azul' }) {
  // Se "cor" não for passada, usa 'azul'
  return <button className={`btn btn--${cor}`}>{texto}</button>
}

// Uso:
<Botao texto="Enviar" />            {/* cor = 'azul' (padrão) */}
<Botao texto="Cancelar" cor="cinza" /> {/* cor = 'cinza' */}
```

---

### 4.4 Props são somente leitura

Você **nunca** modifica uma prop diretamente. Props são dados que vêm de fora — o componente filho os lê, mas não os altera.

```jsx
function Exemplo({ titulo }) {
  // ❌ Nunca faça isso
  titulo = titulo.toUpperCase()

  // ✅ Se precisar transformar, crie uma variável local
  const tituloFormatado = titulo.toUpperCase()

  return <h2>{tituloFormatado}</h2>
}
```

Se você precisar de um valor que muda ao longo do tempo, isso é **estado** — próxima seção.

---

## 5. Estado com useState

**Estado** é qualquer dado do componente que pode mudar ao longo do tempo. Quando o estado muda, React re-renderiza o componente automaticamente para refletir a mudança na tela.

---

### 5.1 Criando um estado

```jsx
import { useState } from 'react'

const [valorAtual, funcaoDeAtualizacao] = useState(valorInicial)
//     ^leitura^    ^escrita^                      ^começa com^
```

`useState` retorna um array com dois itens: o valor atual e uma função para atualizá-lo. A desestruturação captura os dois de uma vez.

---

### 5.2 Exemplo — um contador simples

```jsx
import { useState } from 'react'

function Contador() {
  const [contagem, setContagem] = useState(0)
  // "contagem" começa em 0
  // "setContagem" é a única forma correta de mudar "contagem"

  return (
    <div>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>+1</button>
      <button onClick={() => setContagem(contagem - 1)}>-1</button>
      <button onClick={() => setContagem(0)}>Zerar</button>
    </div>
  )
}
```

**O que acontece ao clicar em "+1":**
1. `setContagem(contagem + 1)` é chamado
2. React agenda uma nova renderização
3. O componente roda de novo com `contagem` valendo o novo número
4. A tela atualiza

---

### 5.3 Exemplo — alternar visibilidade (toggle)

Um padrão muito comum: um estado booleano que alterna entre `true` e `false`.

```jsx
import { useState } from 'react'

function PainelRetrátil() {
  const [aberto, setAberto] = useState(false)
  // "aberto" começa como false (painel fechado)

  return (
    <div>
      <button onClick={() => setAberto(!aberto)}>
        {/* "!" inverte o booleano: false → true, true → false */}
        {aberto ? 'Fechar' : 'Abrir'} painel
      </button>

      {aberto && (
        <div className="painel">
          <p>Conteúdo oculto que aparece quando aberto = true</p>
        </div>
      )}
    </div>
  )
}
```

---

### 5.4 Estado com string — campo de texto

```jsx
import { useState } from 'react'

function CampoDeBusca() {
  const [busca, setBusca] = useState('')
  // "busca" começa como string vazia

  return (
    <div>
      <input
        type="text"
        value={busca}
        onChange={e => setBusca(e.target.value)}
        // "e.target.value" é o texto atual dentro do input
        placeholder="Digite para buscar..."
      />
      <p>Você digitou: {busca}</p>
    </div>
  )
}
```

---

### 5.5 Regras importantes do useState

**1. Nunca mute o estado diretamente — use sempre a função de atualização:**

```jsx
const [lista, setLista] = useState(['maçã', 'banana'])

// ❌ Errado — React não detecta essa mudança
lista.push('laranja')

// ✅ Certo — cria um novo array e passa para setLista
setLista([...lista, 'laranja'])
```

**2. Cada chamada de `useState` é independente — você pode ter quantos estados precisar:**

```jsx
const [nome, setNome]       = useState('')
const [email, setEmail]     = useState('')
const [enviado, setEnviado] = useState(false)
```

**3. Para atualizar com base no valor anterior, use a forma funcional:**

```jsx
// Quando o novo valor depende do anterior, passe uma função
setContagem(anterior => anterior + 1)
// Isso garante que você usa sempre o valor mais recente,
// mesmo se várias atualizações acontecerem juntas
```

---

## 6. Efeitos com useEffect

`useEffect` serve para código que precisa rodar **fora do fluxo de renderização** — coisas como: iniciar um temporizador, buscar dados de uma API, ou reagir a mudanças de estado com alguma ação externa.

---

### 6.1 Estrutura básica

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // Código que roda após a renderização

  return () => {
    // Função de limpeza — opcional
    // Roda antes do próximo efeito, ou quando o componente sai da tela
  }
}, [dependencias])
//  ^ array que controla quando o efeito roda novamente ^
```

---

### 6.2 O array de dependências controla quando o efeito roda

| Array | Comportamento |
|---|---|
| `[]` vazio | Roda uma única vez, após a primeira renderização |
| `[valor]` | Roda após a primeira renderização, e de novo toda vez que `valor` mudar |
| `[a, b]` | Roda toda vez que `a` ou `b` mudar |
| *(sem array)* | Roda após **toda** renderização — raramente é o que você quer |

---

### 6.3 Exemplo — buscar dados de uma API

```jsx
import { useState, useEffect } from 'react'

function ListaDePosts() {
  const [posts, setPosts]     = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Busca posts de uma API pública de exemplo
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(resposta => resposta.json())
      .then(dados => {
        setPosts(dados)
        setCarregando(false)
      })
  }, [])
  // [] = roda só uma vez, quando o componente aparece na tela

  if (carregando) return <p>Carregando...</p>

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

---

### 6.4 Exemplo — temporizador com limpeza

```jsx
import { useState, useEffect } from 'react'

function Relogio() {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    // Inicia o intervalo quando o componente aparece
    const intervalo = setInterval(() => {
      setSegundos(anterior => anterior + 1)
    }, 1000)

    // Retorna a função de limpeza:
    // cancela o intervalo quando o componente sair da tela
    return () => clearInterval(intervalo)
  }, [])
  // [] = inicia o intervalo uma vez só

  return <p>O componente está ativo há {segundos} segundo(s).</p>
}
```

A função de limpeza (`return () => ...`) é importante para evitar **memory leaks** — situações em que código continua rodando mesmo depois de o componente ter saído da tela.

---

### 6.5 Exemplo — efeito que depende de um estado

```jsx
import { useState, useEffect } from 'react'

function BuscaDeUsuario() {
  const [id, setId]           = useState(1)
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    // Toda vez que "id" mudar, busca o usuário correspondente
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(r => r.json())
      .then(dados => setUsuario(dados))
  }, [id])
  // [id] = roda de novo sempre que "id" mudar

  return (
    <div>
      <button onClick={() => setId(id + 1)}>Próximo usuário (ID: {id})</button>
      {usuario && <p>Nome: {usuario.name}</p>}
    </div>
  )
}
```

---

## 7. Listas com .map() e o atributo key

Para renderizar uma lista de elementos, use o método `.map()` do JavaScript — ele transforma um array de dados em um array de JSX.

---

### 7.1 O padrão básico

```jsx
const frutas = ['Maçã', 'Banana', 'Laranja']

function ListaDeFrutas() {
  return (
    <ul>
      {frutas.map(fruta => (
        <li key={fruta}>{fruta}</li>
        //  ^obrigatório^
      ))}
    </ul>
  )
}
```

---

### 7.2 Por que `key` é obrigatório?

Quando React re-renderiza uma lista, ele precisa identificar quais itens mudaram, quais foram adicionados e quais foram removidos. A `key` é esse identificador — sem ela, React teria que re-renderizar a lista inteira a cada mudança.

**Regras da `key`:**
- Deve ser **única** dentro da lista
- Deve ser **estável** — não mude a key entre renderizações
- Deve ser uma **string ou número**

```jsx
const usuarios = [
  { id: 1, nome: 'Ana' },
  { id: 2, nome: 'Bruno' },
  { id: 3, nome: 'Carla' },
]

// ✅ Usando o ID como key — único e estável
{usuarios.map(u => (
  <li key={u.id}>{u.nome}</li>
))}

// ⚠️ Usando o índice do array — funciona, mas problemático
// se a ordem da lista puder mudar
{usuarios.map((u, indice) => (
  <li key={indice}>{u.nome}</li>
))}
```

---

### 7.3 Lista de componentes com dados

O padrão mais comum: um array de objetos, cada um renderizado como um componente:

```jsx
const produtos = [
  { id: 1, nome: 'Teclado',  preco: 150 },
  { id: 2, nome: 'Mouse',    preco: 80  },
  { id: 3, nome: 'Monitor',  preco: 900 },
]

function CardProduto({ nome, preco }) {
  return (
    <div className="card">
      <h3>{nome}</h3>
      <p>R$ {preco}</p>
    </div>
  )
}

function ListaDeProdutos() {
  return (
    <div className="grade">
      {produtos.map(produto => (
        <CardProduto
          key={produto.id}
          nome={produto.nome}
          preco={produto.preco}
        />
      ))}
    </div>
  )
}
```

---

## 8. Renderização condicional

React não tem uma diretiva especial para condicionais no JSX (como `v-if` no Vue). Você usa os próprios operadores do JavaScript.

---

### 8.1 Operador `&&` — mostrar ou não mostrar

Se a condição for `true`, renderiza o elemento. Se for `false`, não renderiza nada.

```jsx
function Alerta({ mensagem, visivel }) {
  return (
    <div>
      <p>Conteúdo da página</p>

      {visivel && (
        <div className="alerta">
          {mensagem}
        </div>
      )}
      {/* Se "visivel" for false, o bloco simplesmente não aparece */}
    </div>
  )
}
```

**Atenção com valores zero:** `0 && <p>texto</p>` renderiza o `0` na tela (porque `0` é um valor falso, mas ainda é renderizável). Para evitar isso, converta para booleano:

```jsx
// ❌ Pode renderizar "0" na tela se "quantidade" for 0
{quantidade && <p>Há {quantidade} item(s)</p>}

// ✅ Converte explicitamente para booleano
{quantidade > 0 && <p>Há {quantidade} item(s)</p>}
```

---

### 8.2 Operador ternário `? :` — um ou outro

Quando você precisa escolher entre dois elementos:

```jsx
function StatusConexao({ conectado }) {
  return (
    <span className={conectado ? 'verde' : 'vermelho'}>
      {conectado ? 'Online' : 'Offline'}
    </span>
  )
}
```

---

### 8.3 Combinando `||` para valor padrão

O operador `||` retorna o primeiro valor que for verdadeiro. Útil para valores opcionais:

```jsx
function PerfilUsuario({ foto, nome }) {
  return (
    <div>
      {/* Se "foto" não existir, usa uma imagem padrão */}
      <img src={foto || '/imagens/avatar-padrao.png'} alt={nome} />
      {/* Se "nome" não existir, exibe "Visitante" */}
      <p>{nome || 'Visitante'}</p>
    </div>
  )
}
```

---

### 8.4 Lógica antes do `return`

Para condicionais mais complexas, compute antes de retornar o JSX:

```jsx
function PainelAdmin({ usuario }) {
  // Lógica fora do JSX — mais legível
  const ehAdmin = usuario.nivel === 'admin'
  const saudacao = ehAdmin ? `Bem-vindo, ${usuario.nome}` : 'Acesso restrito'
  const corClasse = ehAdmin ? 'painel--verde' : 'painel--vermelho'

  return (
    <div className={`painel ${corClasse}`}>
      <p>{saudacao}</p>
      {ehAdmin && <button>Gerenciar usuários</button>}
    </div>
  )
}
```

---

## 9. React Router — navegação entre páginas

React por si só não tem roteamento. O pacote **react-router-dom** adiciona esse comportamento, permitindo que URLs diferentes mostrem componentes diferentes — sem recarregar a página.

Instalar:

```bash
npm install react-router-dom
```

---

### 9.1 Configuração principal

Você configura as rotas uma vez, geralmente no arquivo raiz da aplicação:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio   from './pages/Inicio'
import Sobre    from './pages/Sobre'
import Contato  from './pages/Contato'
import Menu     from './components/Menu'

export default function App() {
  return (
    // BrowserRouter: habilita o roteamento em toda a aplicação
    <BrowserRouter>
      <Menu />   {/* aparece em todas as páginas */}
      <main>
        <Routes>
          {/* Cada Route define: "nesta URL, mostre este componente" */}
          <Route path="/"        element={<Inicio />} />
          <Route path="/sobre"   element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
```

---

### 9.2 `<Link>` — navegação interna sem recarregar

Nunca use `<a href="...">` para navegar entre páginas do seu site. Use `<Link>` — ele troca a URL e o componente exibido sem recarregar o navegador:

```jsx
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <nav>
      <Link to="/">Início</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/contato">Contato</Link>
    </nav>
  )
}
```

Reserve `<a href="...">` para links **externos** (outros sites):

```jsx
{/* Link externo — abre fora da sua aplicação */}
<a href="https://github.com/seuperfil" target="_blank" rel="noreferrer">
  GitHub
</a>
```

---

### 9.3 `<NavLink>` — link que sabe qual página está ativa

`NavLink` funciona como `Link`, mas adiciona automaticamente a classe `active` ao link correspondente à URL atual. Útil para menus de navegação:

```jsx
import { NavLink } from 'react-router-dom'

function MenuPrincipal() {
  return (
    <nav>
      {/* "end" impede que "/" fique ativo em todas as rotas */}
      <NavLink to="/" end>Início</NavLink>
      <NavLink to="/sobre">Sobre</NavLink>
      <NavLink to="/contato">Contato</NavLink>
    </nav>
  )
}
```

```css
/* No CSS — estilize o link ativo */
nav a.active {
  color: blue;
  font-weight: bold;
}
```

O atributo `end` no link para `/` é importante: sem ele, `/` seria considerado ativo em todas as páginas, já que toda URL começa com `/`. Com `end`, só fica ativo quando a URL é **exatamente** `/`.

---

### 9.4 Rotas com parâmetros dinâmicos

Para páginas que mudam conforme um ID ou slug na URL:

```jsx
// Rota com parâmetro ":id"
<Route path="/produto/:id" element={<PaginaProduto />} />
```

```jsx
// Dentro de PaginaProduto.jsx — ler o parâmetro da URL
import { useParams } from 'react-router-dom'

function PaginaProduto() {
  const { id } = useParams()
  // Se a URL for /produto/42, "id" será a string "42"

  return <p>Exibindo produto #{id}</p>
}
```

---

### 9.5 Rota 404 — página não encontrada

```jsx
<Routes>
  <Route path="/"       element={<Inicio />} />
  <Route path="/sobre"  element={<Sobre />} />
  <Route path="*"       element={<NaoEncontrado />} />
  {/* "*" captura qualquer URL que não casou com as anteriores */}
</Routes>
```

---

## 10. CSS em projetos React

---

### 10.1 CSS por arquivo de componente

A prática mais comum é ter um arquivo `.css` para cada componente, importado diretamente nele:

```
src/
├── components/
│   ├── Botao.jsx
│   └── Botao.css    ← estilos exclusivos do Botao
├── pages/
│   ├── Inicio.jsx
│   └── Inicio.css   ← estilos exclusivos da página Inicio
└── index.css        ← estilos globais e variáveis
```

```jsx
// Botao.jsx
import './Botao.css'   // importa os estilos do componente

export default function Botao({ texto, onClick }) {
  return (
    <button className="botao" onClick={onClick}>
      {texto}
    </button>
  )
}
```

**Atenção:** ao contrário do que parece, esses estilos **não são escopados** automaticamente — um `.botao` definido em `Botao.css` pode afetar qualquer elemento com essa classe no HTML. A separação é de organização, não de isolamento técnico. Se quiser isolamento real, pesquise sobre CSS Modules.

---

### 10.2 Variáveis CSS (`custom properties`)

Definir variáveis CSS globais evita repetição e facilita mudanças de identidade visual:

```css
/* index.css */
:root {
  /* Cores */
  --cor-primaria:    #2563EB;
  --cor-secundaria:  #F3F4F6;
  --cor-texto:       #111827;
  --cor-texto-suave: #6B7280;

  /* Tipografia */
  --fonte-titulo: 'Georgia', serif;
  --fonte-corpo:  'Inter', sans-serif;

  /* Espaçamento e forma */
  --raio-borda: 8px;
  --sombra:     0 2px 8px rgba(0, 0, 0, 0.1);
}
```

Para usar em qualquer arquivo CSS:

```css
/* Botao.css */
.botao {
  background-color: var(--cor-primaria);
  color: white;
  border-radius: var(--raio-borda);
  box-shadow: var(--sombra);
  font-family: var(--fonte-corpo);
}
```

A vantagem é clara: para mudar a cor primária do site inteiro, você muda apenas o valor da variável em `index.css`.

---

### 10.3 Classe CSS dinâmica com estado

Um padrão muito comum é aplicar classes CSS diferentes conforme o estado:

```jsx
function Cartao({ destaque }) {
  // Template literal monta a string de classes dinamicamente
  return (
    <div className={`cartao ${destaque ? 'cartao--destaque' : ''}`}>
      Conteúdo
    </div>
  )
}
```

```css
.cartao {
  border: 1px solid #ddd;
  padding: 16px;
}

.cartao--destaque {
  border-color: var(--cor-primaria);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
```

---

## 11. Estrutura de pastas e ponto de entrada

---

### 11.1 Estrutura recomendada para projetos pequenos

```
meu-projeto/
├── public/               ← arquivos estáticos (imagens, fontes, favicon)
│   └── imagens/
├── src/
│   ├── components/       ← componentes reutilizáveis (Navbar, Footer, Card...)
│   ├── pages/            ← um arquivo por página/rota
│   ├── App.jsx           ← componente raiz — contém as rotas
│   ├── main.jsx          ← ponto de entrada — conecta React ao HTML
│   └── index.css         ← estilos globais
├── index.html            ← o único HTML do projeto
└── vite.config.js
```

---

### 11.2 O `index.html` — o único HTML do projeto

Em aplicações React, há apenas um arquivo HTML. Ele tem uma `<div id="root">` vazia — React vai colocar toda a interface ali:

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meu Site</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- React vai "morar" dentro dessa div -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 11.3 O `main.jsx` — conecta React ao HTML

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'   // carrega os estilos globais
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**O que cada parte faz:**

| Linha | O que faz |
|---|---|
| `document.getElementById('root')` | Encontra a `<div id="root">` no HTML |
| `createRoot(...)` | Diz ao React: "controle tudo dentro dessa div" |
| `.render(<App />)` | Coloca o componente `App` como raiz de tudo |
| `<StrictMode>` | Ativa verificações extras em desenvolvimento; sem efeito em produção |

---

### 11.4 O `App.jsx` — componente raiz

O `App.jsx` é o componente que contém a estrutura geral do site — normalmente o roteamento, o menu e o rodapé:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu    from './components/Menu'
import Rodape  from './components/Rodape'
import Inicio  from './pages/Inicio'
import Sobre   from './pages/Sobre'

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main>
        <Routes>
          <Route path="/"      element={<Inicio />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
      <Rodape />
    </BrowserRouter>
  )
}
```

---

## 12. Vite — o que faz e como usar

O Vite é a ferramenta que transforma seu código JSX em algo que o navegador consegue executar. Ele faz duas coisas principais:

1. **Em desenvolvimento:** serve seu projeto instantaneamente, convertendo JSX em tempo real enquanto você edita
2. **Para publicação:** empacota e otimiza todos os arquivos em uma pasta `dist/`

---

### 12.1 Criar um projeto React com Vite

```bash
npm create vite@latest nome-do-projeto -- --template react
cd nome-do-projeto
npm install
npm run dev
```

---

### 12.2 O `vite.config.js`

O arquivo de configuração do Vite. A opção mais importante para projetos publicados em subpastas é o `base`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // "base" define o caminho raiz do site no servidor
  // Por padrão é "/" — mude só se o site não ficar na raiz do domínio
  base: '/',
})
```

Se o seu site vai ficar em `https://exemplo.com/meu-app/`, você define `base: '/meu-app/'`. Sem isso, os arquivos CSS e JS não seriam encontrados no servidor.

---

### 12.3 Comandos do dia a dia

```bash
npm run dev      # inicia o servidor de desenvolvimento (hot reload ativado)
npm run build    # gera a pasta dist/ com o site otimizado para produção
npm run preview  # serve o dist/ localmente — teste antes de publicar
```

---

### 12.4 A pasta `dist/` — o que vai para o servidor

Depois de `npm run build`, a pasta `dist/` contém os arquivos finais do site. É o conteúdo dessa pasta — e só dela — que você copia para o servidor de hospedagem.

```
dist/
├── index.html          ← HTML com referências aos bundles gerados
├── assets/
│   ├── index-Abc123.js  ← todo o JavaScript do site, minificado
│   └── index-Xyz789.css ← todo o CSS do site, minificado
└── imagens/            ← cópia dos arquivos de public/
```

---

## 13. Referência rápida de sintaxe JSX

---

### Diferenças entre HTML e JSX

| O que fazer | HTML | JSX |
|---|---|---|
| Classe CSS | `class="box"` | `className="box"` |
| Estilo inline | `style="color: red"` | `style={{ color: 'red' }}` |
| Evento de clique | `onclick="fn()"` | `onClick={fn}` |
| Evento de mudança | `oninput="fn()"` | `onChange={fn}` |
| Atributo `for` de label | `for="campo"` | `htmlFor="campo"` |
| Tag vazia | `<input>` | `<input />` |
| Comentário | `<!-- texto -->` | `{/* texto */}` |
| Valor dinâmico | *(não existe)* | `{variavel}` |

---

### Eventos comuns

```jsx
{/* Clique em botão */}
<button onClick={() => console.log('clicou')}>Clique</button>

{/* Input controlado */}
<input
  value={texto}
  onChange={e => setTexto(e.target.value)}
/>

{/* Submit de formulário */}
<form onSubmit={e => { e.preventDefault(); enviar() }}>
  ...
</form>

{/* Mouse entrando/saindo */}
<div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
  ...
</div>
```

---

### Estilo inline com objeto JavaScript

```jsx
{/* Duas chaves: a de fora abre a "janela JS", a de dentro é o objeto */}
<div style={{ backgroundColor: '#1B2333', padding: '24px', fontSize: '1rem' }}>
  Conteúdo
</div>

{/* Com variável — mais legível */}
const estiloDestaque = { border: '2px solid blue', borderRadius: '8px' }

<div style={estiloDestaque}>Conteúdo</div>
```

---

### Classe CSS condicional com template literal

```jsx
{/* Uma condição */}
<div className={`card ${ativo ? 'card--ativo' : ''}`}>

{/* Múltiplas condições */}
<div className={`card ${ativo ? 'card--ativo' : ''} ${grande ? 'card--grande' : ''}`}>

{/* Com array e join — mais legível para muitas condições */}
<div className={['card', ativo && 'card--ativo', grande && 'card--grande'].filter(Boolean).join(' ')}>
```

---

### Resumo dos hooks usados neste guia

| Hook | Para que serve | Importação |
|---|---|---|
| `useState` | Guardar um valor que muda e re-renderizar quando ele muda | `import { useState } from 'react'` |
| `useEffect` | Rodar código após a renderização (timers, APIs, efeitos externos) | `import { useEffect } from 'react'` |
| `useParams` | Ler parâmetros dinâmicos da URL (`:id`, `:slug`) | `import { useParams } from 'react-router-dom'` |