import { useNavigate, useParams } from "react-router-dom"

const PreviewBusinessCard = () => {
    const { cardId } = useParams();
    const navigate = useNavigate();
  return (
    <div className='min-h-[100vh] py-10 w-full flex justify-center items-center'>
      <div className='max-w-[900px] flex flex-col'>
        <h2 className="text-4xl font-medium text-[#333] mb-8 text-center">Business Card Preview</h2>
        <div>
            <img className='w-sm rounded-2xl shadow-2xl shadow-black/30' src="https://images.pexels.com/photos/8489944/pexels-photo-8489944.jpeg?auto=compress&cs=tinysrgb&w=300" alt="image" />
        </div>
        <div className="flex justify-center gap-2 font-medium mt-5">
            <button className="flex cursor-pointer items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-200/50 px-5 rounded-xl" onClick={()=> navigate(`/general-info-form/${cardId}/businessCard`)}> Get This Card </button>
            <button className="flex cursor-pointer items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-200/50 px-5 rounded-xl" onClick={()=> navigate(`/schedule-a-meeting/${cardId}/businessCard`)}> Schedulle a Meetinng </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewBusinessCard
