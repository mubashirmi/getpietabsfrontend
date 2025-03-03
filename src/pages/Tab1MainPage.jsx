import QRCode from 'react-qr-code'; // Import the QR code library
import { useNavigate } from 'react-router-dom';

const Tab1MainPage = () => {
  const navigate = useNavigate(); 
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-200 via-blue-300 to-teal-400 pt-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10 p-5">
        
        {/* Left Section - Image */}
        <div className="w-full lg:w-[45%] rounded-xl overflow-hidden shadow-xl">
          <img
            className="w-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1JRjDFEpRwo8NiNCTPbl8nsVZmNll0J3f6g&s"
            alt="Flyer Image"
          />
        </div>

        {/* Right Section - Text and Actions */}
        <div className="w-full lg:w-[55%] flex flex-col justify-between">
          {/* Text Content */}
          <div className="text-center lg:text-left mb-7">
            <p className="text-xl lg:text-2xl font-semibold text-gray-800 leading-relaxed tracking-wide">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque molestias nulla unde neque inventore
              numquam distinctio dignissimos! Qui, maxime molestias! Culpa error neque doloremque tenetur ipsam ab.
            </p>
          </div>

          {/* Buttons & QR Code */}
          <div className="flex flex-col items-center gap-6">
            {/* 'Get Offer By Email' Button */}
            <button onClick={()=> navigate('/tab1form')} className="w-full cursor-pointer max-w-md text-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg py-4 px-8 transform transition-all duration-500 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-l">
              Get Offer By Email
            </button>

            {/* QR Code */}
            <div className="transition-transform transform hover:scale-110 duration-500">
              <QRCode value="https://getpietabsfrontend.vercel.app/tab1form" size={160} />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule a Meeting Button */}
      <div className="flex justify-center my-10">
        <button className="text-2xl bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold py-4 px-12 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-gradient-to-l hover:shadow-xl">
          Schedule a Meeting
        </button>
      </div>
    </div>
  );
};

export default Tab1MainPage;
