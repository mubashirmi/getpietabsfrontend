import QRCode from 'react-qr-code'; // Import the QR code library
import { useNavigate } from 'react-router-dom';
import FlyerBenifits from '../components/FlyerBenifits';
import { useEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image';
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
const Tab1MainPage = () => {
  const navigate = useNavigate();

  const [ data , setData ] = useState(null);
  const [ mainLoading, setMainLoading ] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axiosInstance.get('/flyer')  // Replace with your API endpoint
      .then(response => {
        setData(response.data);  // Store the response data in state
        setMainLoading(false);
      })
      .catch(error => {
        setMainLoading(false);
        console.error('There was an error!', error);  // Handle any errors
      });
  }, []);  // 

  // Functions to open & close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    }
  };


    const imageRef = useRef(null);
  
    const captureAndDownload = () => {
      if (imageRef.current) {
        // Ensure that the content is fully visible, prevent clipping;
  
        domtoimage.toPng(imageRef.current, {
          quality: 1,
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'flyer-offer-piepay.png';
            link.click();
          })
          .catch((error) => {
            console.error('Error generating image:', error);
          });
      }
    };
  
  
  return (
    mainLoading ? <Loader /> :
    <div className="w-[97%] min-h-screen max-w-[1440px] mx-auto">
      <div className=" mx-auto flex flex-col lg:flex-row justify-between gap-10 px-5">
        <div className='absolute w-[38vw] 2xl:w-[41vw] bg-gradient-to-r from-[#002F5F] to-[#0071E3] opacity-90 left-0 -z-20 h-[860px]' />
        {/* Left Section - Image */}
        <div className="w-full lg:w-[45%] flex justify-end items-center h-[700px] my-[80px]">
          <img
            ref={imageRef}
            className="h-full object-contain hover:scale-110 transition-transform duration-700 ease-in-out rounded-[20px] shadow-xl shadow-black/15"
            // src="piepayflyer.png"
            src={data?.image}
            alt="Flyer Image"
          />
        </div>

        {/* Right Section - Text and Actions */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center my-[80px] gap-y-5">
          <h2>
            <span className='gradient-text text-[48px] font-extrabold'>{data?.flyerName}</span>
          </h2>
          <p className='font-medium text-2xl '>{data?.description}</p>
          <div className='flex gap-x-3'>
            <button onClick={() => navigate(`/general-info-form/${data.id}/Flyer`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'>Get More Info</button>
            <button onClick={openModal} className='border border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="qr-code-scan.png" alt="" /></button>
            <button onClick={captureAndDownload} className='border border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Downnload <img className='w-[21px] h-[21px]' src="downnloadbtnicon.png" alt="" /></button>
          </div>

        </div>
      </div>
      {/* Benifits section */}
      <div className='py-24'>
        <h2 className='font-semibold text-4xl text-[#1E1E1E] text-center mb-5'>BENEFITS</h2>
        <div className='w-[99%] flex gap-x-5 justify-between'>
          <FlyerBenifits title="Boost Your Revenue" text="Increase your business income with lower transaction fees and seamless payment processing." imgSrc="benifits1.png" />
          <FlyerBenifits title="Secure & Reliable Transactions" text="Enjoy peace of mind with advanced encryption and fraud protection for every payment." imgSrc="benifits2.png" />
          <FlyerBenifits title="Fast & Easy Setup" text="Get started in minutes with a hassle free setup and a user friendly payment solution." imgSrc="benifits1.png" />
        </div>
      </div>
      {/* Informational Last Section */}
      <div className='rounded-[20px] p-12 flex flex-col items-center gap-y-5 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] shadow-xl shadow-black/15 mb-24'>
        <h3 className='uppercase font-semibold text-4xl text-[#090909]'>Learn More About Our Business?</h3>
        <p className='font-medium text-[24px] text-center'>
          Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.
        </p>
        <button onClick={() => navigate(`/schedule-a-meeting/${data.id}/Flyer`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all ease-in-out duration-200 hover:shadow-blue-500/30 hover:shadow-lg'>Schedule A Meeting</button>
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
                  value={`https://getpietabsfrontend.vercel.app/general-info-form/${image.id}/Flyer`}
                  size={200}
                  fgColor="#4A90E2"
                  bgColor="#F5F5F5"
                />
              </div>
              <p className="mt-5 text-gray-700 text-center text-xl font-semibold">
                Scan QR code & get the Flyer
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tab1MainPage;
