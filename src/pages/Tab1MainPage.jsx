import QRCode from 'react-qr-code'; // Import the QR code library
import { useNavigate } from 'react-router-dom';
import FlyerBenifits from '../components/FlyerBenifits';
import { useState } from 'react';

const Tab1MainPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);


  // Functions to open & close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    }
  };

  return (
    <div className="w-[97%] min-h-screen max-w-[1440px] mx-auto">
      <div className=" mx-auto flex flex-col lg:flex-row justify-between gap-10 px-5">
        <div className='absolute w-[39vw] bg-blue-500 left-0 -z-20 h-[860px]' />
        {/* Left Section - Image */}
        <div className="w-full lg:w-[45%] flex justify-end items-center h-[700px] my-[80px]">
          <img
            className="w-fit h-full object-contain hover:scale-110 transition-transform duration-700 ease-in-out rounded-[20px] shadow-xl shadow-black/15"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JRjDFEpRwo8NiNCTPbl8nsVZmNll0J3f6g&s"
            alt="Flyer Image"
          />
        </div>

        {/* Right Section - Text and Actions */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center my-[80px] gap-y-5">
          <h2>
            <span className='gradient-text text-[48px] font-extrabold'>Flyer Details</span>
          </h2>
          <p className='font-medium text-2xl '>Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.</p>
          <div className='flex gap-x-3'>
            <button className='bg-[#0071E3] py-2.5 px-[30px] rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'>Get More Info</button>
            <button onClick={openModal} className='border border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[25px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="qr-code-scan.png" alt="" /></button>
          </div>

        </div>
      </div>
      {/* Benifits section */}
      <div className='py-24'>
        <h2 className='font-semibold text-4xl text-[#1E1E1E] text-center mb-5'>BENEFITS</h2>
        <div className='w-[99%] flex gap-x-5 justify-between'>
          <FlyerBenifits number="1" text="Lorem ipsum sapien blandit est maecenas feugiat" imgSrc="benifits1.png" />
          <FlyerBenifits number="2" text="Lorem ipsum sapien blandit est maecenas feugiat" imgSrc="benifits2.png" />
          <FlyerBenifits number="3" text="Lorem ipsum sapien blandit est maecenas feugiat" imgSrc="benifits1.png" />
        </div>
      </div>
      {/* Informational Last Section */}
      <div className='rounded-[20px] p-12 flex flex-col items-center gap-y-5 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] shadow-xl shadow-black/15 mb-24'>
        <h3 className='uppercase font-semibold text-4xl text-[#090909]'>Learn More About Our Business?</h3>
        <p className='font-medium text-[24px] text-center'>
          Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.
        </p>
        <button className='bg-[#0071E3] py-2.5 px-[30px] rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all ease-in-out duration-200 hover:shadow-blue-500/30 hover:shadow-lg'>Schedule A Meeting</button>
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
                  value="https://getpietabsfrontend.vercel.app/general-info-form/1/flyer"
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
