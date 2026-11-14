import { Homepage } from './pages/Homepage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop";
import { Hero } from './components/Hero'
import { FertilizersPage } from './pages/FertilizersPage.jsx'
import { NaturalProductPage } from './pages/NaturalProduct.jsx'
import { IndustrialChemicals } from './pages/IndustrialChemicals.jsx'
import Footer from './components/Footer'
import { Aboutus } from './pages/Aboutus.jsx'
import { Contactus } from './pages/Contactus.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Hero />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/AboutUs' element={ <Aboutus /> } />
        <Route path='/Fertilizers' element={<FertilizersPage />}/>
        <Route path='/FoodProducts' element={<NaturalProductPage />}/>
        <Route path='/IndustrialChemicals' element={<IndustrialChemicals />}/>
        <Route path='/ContactUs' element={ <Contactus /> } />

        {/* Old URLs from the previous site structure -> send visitors to the new pages */}
        <Route path='/Manures' element={<Navigate to="/Fertilizers" replace />} />
        <Route path='/HerbalProducts' element={<Navigate to="/FoodProducts" replace />} />
        <Route path='/FreshFromFarm' element={<Navigate to="/FoodProducts" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App