import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='flex pt-3 pb-4 justify-center gap-x-5 bg-[#222]'>
        <button onClick={()=>navigate('/')} className='py-2 px-5 text-xl font-medium cursor-pointer rounded-xl text-[#f4f4f4] border-2 border-[#f4f4f4] '>Tab 1(Flyer)</button>      
        <button onClick={()=>navigate('/businesscard')} className='py-2 px-5 text-xl font-medium cursor-pointer rounded-xl text-[#f4f4f4] border-2 border-[#f4f4f4] '>Tab 2(Business Card)</button>      
        <button onClick={()=>navigate('/sliceOfTheMarket')} className='py-2 px-5 text-xl font-medium cursor-pointer rounded-xl text-[#f4f4f4] border-2 border-[#f4f4f4] '>Tab 3(Slice of the Market)</button>      
        <button onClick={()=>navigate('/chargebackRiskAnalysis')} className='py-2 px-5 text-xl font-medium cursor-pointer rounded-xl text-[#f4f4f4] border-2 border-[#f4f4f4] '>Tab 4(Chargeback Risk Analysis)</button>      
        <button onClick={()=>navigate('/loanFinancialAnalysis')} className='py-2 px-5 text-xl font-medium cursor-pointer rounded-xl text-[#f4f4f4] border-2 border-[#f4f4f4] '>Tab 5(Loan Financial Analysis)</button>      
        <button onClick={()=>navigate('/piebackcalculator')} className='py-2 px-5 text-xl font-medium cursor-pointer rounded-xl text-[#f4f4f4] border-2 border-[#f4f4f4] '>Tab 6(Calculator)</button>      
    </div>
  )
}

export default Navbar
