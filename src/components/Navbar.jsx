import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='flex pt-3 pb-4 justify-center gap-x-4 bg-[#222]'>
        <button onClick={()=>navigate('/')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Flyer</button>      
        <button onClick={()=>navigate('/businesscard')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Business Card</button>      
        <button onClick={()=>navigate('/sliceOfTheMarket')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Slice of the Market</button>      
        <button onClick={()=>navigate('/chargebackRiskAnalysis')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Chargeback Risk Analysis</button>      
        <button onClick={()=>navigate('/loanFinancialAnalysis')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Loan Financial Analysis</button>      
        <button onClick={()=>navigate('/piebackcalculator')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Pie back Calculator</button>      
        <button onClick={()=>navigate('/tab7meeting')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Schedulle a Meeting</button>      
        <button onClick={()=>navigate('/pie-proshop')} className='py-2 px-5 text-lg font-medium cursor-pointer rounded-lg text-[#f4f4f4] border-2 border-[#f4f4f4] '>Pie ProShop</button>      
    </div>
  )
}

export default Navbar
