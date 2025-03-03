import Tab1MainPage from './pages/Tab1MainPage'
import Tab1FormPage from './pages/Tab1FormPage'
import Tab6FormPage from './pages/Tab6FormPage'
import Tab6MainPage from './pages/Tab6MainPage'
import { Routes ,Route } from 'react-router-dom'
import PiebackTabCalculator from './pages/PiebackTabCalculator'
import Navbar from './components/Navbar'
import Tab3MainPage from './pages/Tab3MainPage'
import Tab4MainPage from './pages/Tab4MainPage'
import Tab5MainPage from './pages/Tab5MainPage'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Tab1MainPage />} />
      <Route path='/tab1form' element={<Tab1FormPage />} />
      <Route path='/businesscard' element={<Tab6MainPage />} />
      <Route path='/sliceOfTheMarket' element={<Tab3MainPage />} />
      <Route path='/chargebackRiskAnalysis' element={<Tab4MainPage />} />
      <Route path='/loanFinancialAnalysis' element={<Tab5MainPage />} />
      <Route path='/businesscardform/:cardId' element={<Tab6FormPage />} />
      <Route path='/piebackcalculator' element={<PiebackTabCalculator />} />
    </Routes>
    </>
  )
}
export default App
