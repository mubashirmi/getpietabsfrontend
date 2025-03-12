import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='flex pt-3 pb-4 justify-between  text-black/80 font-medium text-base items-center max-w-[1440px] mx-auto'>
        <div className='w-11'>
          <img className='' src="Logo.png" alt="Logo" />
        </div>
        <button onClick={()=>navigate('/')} className=' cursor-pointer rounded-lg '>Flyer</button>      
        <button onClick={()=>navigate('/businesscard')} className=' cursor-pointer rounded-lg '>Business Card</button>      
        <button onClick={()=>navigate('/sliceOfTheMarket')} className=' cursor-pointer rounded-lg '>Slice of the Market</button>      
        <button onClick={()=>navigate('/chargebackRiskAnalysis')} className=' cursor-pointer rounded-lg '>Chargeback Risk Analysis</button>      
        <button onClick={()=>navigate('/loanFinancialAnalysis')} className=' cursor-pointer rounded-lg '>Loan Financial Analysis</button>      
        <button onClick={()=>navigate('/piebackcalculator')} className=' cursor-pointer rounded-lg '>Pie back Calculator</button>      
        <button onClick={()=>navigate('/tab7form/tab7')} className=' cursor-pointer rounded-lg '>Schedulle a Meeting</button>      
        <button onClick={()=>navigate('/pie-proshop')} className=' cursor-pointer rounded-lg '>Pie ProShop</button>      
    </div>
  )
}

export default Navbar
