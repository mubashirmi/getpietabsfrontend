import Tab1MainPage from './pages/Tab1MainPage'
import LeadFormPage from './pages/LeadFormPage'
import Tab6MainPage from './pages/Tab6MainPage'
import { Routes ,Route } from 'react-router-dom'
import PiebackTabCalculator from './pages/PiebackTabCalculator'
import Navbar from './components/Navbar'
import Tab3MainPage from './pages/Tab3MainPage'
import Tab4MainPage from './pages/Tab4MainPage'
import Tab5MainPage from './pages/Tab5MainPage'
import Tab7MainPage from './pages/Tab7MainPage'
import MeetingFormPage from './pages/MeetingFormPage'
import PreviewBusinessCard from './pages/PreviewBusinessCard'
import Tab8MainPage from './pages/Tab8MainPage'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Tab1MainPage />} />
      <Route path='/businesscard' element={<Tab6MainPage />} />
      <Route path='/sliceOfTheMarket' element={<Tab3MainPage />} />
      <Route path='/chargebackRiskAnalysis' element={<Tab4MainPage />} />
      <Route path='/loanFinancialAnalysis' element={<Tab5MainPage />} />
      <Route path='/general-info-form/:pictureId/:tabName' element={<LeadFormPage />} />
      <Route path='/schedule-a-meeting/:pictureId/:tabName' element={<MeetingFormPage />} />
      <Route path='/preview-business-card/:cardId' element={<PreviewBusinessCard />} />
      <Route path='/piebackcalculator' element={<PiebackTabCalculator />} />
      <Route path='/tab7form/:tabName' element={<Tab7MainPage />} />
      <Route path='/pie-proshop' element={<Tab8MainPage />} />
    </Routes>
    </>
  )
}
export default App
