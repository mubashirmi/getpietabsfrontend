import { useNavigate, useParams } from "react-router-dom"

const PreviewBusinessCard = () => {
    const { cardId } = useParams();
    const navigate = useNavigate();
  return (
    <div className='min-h-[calc(100vh-72px)] w-full flex flex-col justify-center gap-y-10 items-center'>
      <div className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF]">
        <img className="w-[480px] rounded-[11px] shadow-2xl shadow-blue-900/70" src="/public/dummyPreviewcard.png" alt="" />
        <button onClick={() => navigate(`/general-info-form/${cardId}/businessCard`)} className='mt-8 bg-[#0071E3] py-2.5 px-[30px] rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'>Get This Cards</button>
      </div>
      {/* Informational Last Section */}
      <div className='rounded-[20px] max-w-[1440px] w-[99%] p-12 flex flex-col items-center gap-y-5 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] shadow-xl shadow-black/15 mb-24'>
        <h3 className='uppercase font-semibold text-4xl text-[#090909]'>Learn More About Our Business?</h3>
        <p className='font-medium text-[24px] text-center'>
          Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.
        </p>
        <button onClick={() => navigate(`/general-info-form/${cardId}/businessCard`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all ease-in-out duration-200 hover:shadow-blue-500/30 hover:shadow-lg'>Schedule A Meeting</button>
      </div>

    </div>
  )
}

export default PreviewBusinessCard
