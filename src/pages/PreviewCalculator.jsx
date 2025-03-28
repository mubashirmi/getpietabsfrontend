import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";


const PreviewCalculator = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);


  useEffect(() => {
    axiosInstance.get(`/calculator/${cardId}`)  // Replace with your API endpoint
      .then(response => {
        setImage(response.data);  // Store the response data in state
      })
      .catch(error => {
        console.error('There was an error!', error);  // Handle any errors
      });
  }, []);
  // Functions to open & close modal
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    }
  };
  return (
    <div className='min-h-[calc(100vh-72px)] w-full flex flex-col justify-center gap-y-10 items-center'>
      <div className="w-full flex flex-col items-center justify-center py-16 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF]">
        <img className="max-w-[1100px] rounded-[11px] shadow-2xl shadow-blue-900/70" src={image?.image} alt="" />
        <div className="flex justify-center items-center gap-x-5 mt-10">
          <button onClick={() => navigate(`/general-info-form/${cardId}/Calculator`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'>Get Your Analysis</button>
          <button onClick={openModal} className='border border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="/qr-code-scan.png" alt="" /></button>
        </div>
      </div>
      {/* Informational Last Section */}
      <div className='rounded-[20px] max-w-[1440px] w-[99%] p-12 flex flex-col items-center gap-y-5 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] shadow-xl shadow-black/15 mb-24'>
        <h3 className='uppercase font-semibold text-4xl text-[#090909]'>Learn More About Our Business?</h3>
        <p className='font-medium text-[24px] text-center'>
          Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.
        </p>
        <button onClick={() => navigate(`/schedule-a-meeting/${cardId}/Calculator`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all ease-in-out duration-200 hover:shadow-blue-500/30 hover:shadow-lg'>Schedule A Meeting</button>
      </div>


      {/* Modal */}
      {isOpen && (
        <div
          id="modalBackdrop"
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-gray-900/40 bg-opacity-10 flex justify-center items-center"
        >
          <div className="relative bg-white rounded-xl p-6 max-w-lg w-full shadow-xl">
            {/* Close button at top-left */}
            <span
              className="absolute top-4 right-4 text-4xl cursor-pointer bg-slate-400/30 hover:bg-slate-400/50 transition-all duration-300 ease-in-out rounded-full h-10 w-10 flex justify-center items-center"
              onClick={closeModal}
            >
              &times;
            </span>

            {/* Modal Content */}
            <div className="flex flex-col items-center">
              <div className="mt-6">
                <QRCode
                  value={`https://getpietabsfrontend.vercel.app/preview-business-card/${cardId}`}
                  size={200}
                  fgColor="#4A90E2"
                  bgColor="#F5F5F5"
                />
              </div>
              <p className="mt-5 text-gray-700 text-center text-xl font-semibold">
                Scan QR code & get your analysis 
              </p>
            </div>
          </div>
        </div>
      )}



    </div>
  )
}

export default PreviewCalculator