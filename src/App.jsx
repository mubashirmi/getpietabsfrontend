import Tab1MainPage from './pages/Tab1MainPage'
import Tab1FormPage from './pages/Tab1FormPage'
import Tab6FormPage from './pages/Tab6FormPage'
import Tab6MainPage from './pages/Tab6MainPage'
import { Routes ,Route } from 'react-router-dom'
import PiebackTabCalculator from './pages/PiebackTabCalculator'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Tab1MainPage />} />
      <Route path='/tab1form' element={<Tab1FormPage />} />
      <Route path='/businesscard' element={<Tab6MainPage />} />
      <Route path='/businesscardform/:cardId' element={<Tab6FormPage />} />
      <Route path='/piebackcalculator' element={<PiebackTabCalculator />} />
    </Routes>
    </>
  )
}
export default App
