import { Homepage } from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop";
import { Hero } from './components/Hero'
import { FreshFromFarm } from './pages/FreshFromFarm.jsx'
import { NaturalProductPage } from './pages/NaturalProduct.jsx'
import { ManurePage } from './pages/Manures.jsx'
import Footer from './components/Footer'
import { Aboutus } from './pages/Aboutus.jsx'
import { Contactus } from './pages/Contactus.jsx'
import { HerbalProduct } from './pages/HerbalProduct.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Hero />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/FreshFromFarm' element={<FreshFromFarm />} />
        <Route path='/AboutUs' element={ <Aboutus /> } />
        <Route path='/ContactUs' element={ <Contactus /> } />
        <Route path='/FoodProducts' element={<NaturalProductPage />}/>
        <Route path='/Manures' element={<ManurePage />}/>
        <Route path='/HerbalProducts' element={<HerbalProduct />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App