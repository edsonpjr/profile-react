import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Portfolio from './pages/Portfolio'

export default function App() {
  return (
    <BrowserRouter basename="/~ejapj">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/sobre"     element={<Sobre />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}