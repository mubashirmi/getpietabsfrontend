import QRCode from 'react-qr-code'; // Import the QR code library
import { FaHandsHelping } from "react-icons/fa";
import { BiDollarCircle } from "react-icons/bi";
import { PiUserCircleCheckBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { DiJira } from "react-icons/di";
import { useNavigate } from 'react-router-dom';

const ReferralLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[1000px] py-7 mx-auto">
      <div className="flex justify-between items-center my-5">
        <div className="w-[300px]">
            <img src="/LogoDark.png" alt="" />
        </div>
        <div className="flex flex-col pr-3.5">
            <p className="text-2xl font-semibold">PiePay</p>
            <p className="text-base text-medium text-[#333]">https://getpie.io</p>
            <p className="text-base text-medium text-[#333]">info@getpie.info</p>
            <p className="text-base text-medium text-[#333]">123-456-789</p>
        </div>
      </div>
      <div className="mt-12 ">
        <img className="w-full border-[1px] border-slate-100 object-cover rounded-2xl shadow-lg shadow-black/15 max-h-96" src="/referralbanner3.jpg" alt="Banner Image" />
      </div>
      <div className="bg-gradient-to-r from-[#DBEDFF] to-white border-[1px] border-slate-200/50 my-12 shadow-lg shadow-black/15 rounded-[25px] px-9 py-8">
        <h3 className="text-xl font-medium mb-1">What is the Referral Partner Program?</h3>
        <p className="text-lg text-[#333]">Our referral partners play a vital role in our business. They are business owners or company team members looking to expand their offerings by helping clients who struggle with unreliable payment processors, outdated POS systems, or challennges in achieving financial health. Many of our partners recognize these issues but may not have the right solutions to offer-so they refer their clients to us. The best part? They get repeatedly compensated simply for making the connection.</p>
      </div>
      <div className="flex gap-5">
        <div className="w-1/2">
            <h3 className="text-2xl font-semibold text-[#222]">How it Works</h3>
            <div className="flex items-center gap-x-4 my-4">
                <div>
                  <BiDollarCircle size={60} color='#0071E3'/>
                </div>
                <div>
                    <p>Refer clients to us and earn a passive monthly income through lifelong residuals.</p>
                </div>
            </div>
            <div className="flex items-center mb-7 gap-x-4">
                <div>
                  <FaHandsHelping size={59} color='#0071E3'/>
                </div>
                <div>
                    <p>We handle the rest through implementation to support, ensuring your clients get the care they deserve.</p>
                </div>
            </div>
            <div className='mt-5 flex gap-x-4'>
                <div>
                <QRCode
                  value={`https://getpietabsfrontend.vercel.app/referralForm`}
                  size={140}
                  fgColor="#222"
                  bgColor="#F5F5F5"
                />
                </div>
                <div>
                    <h3 className=' text-xl font-bold text-[#002F5F] mb-2 w-[80%] mt-0.5'>Scan the QR Code to Get Started!</h3>
                    <p className='text-lg text-[#333] w-[85%] leading-[23px]'>Connect with one of our experts to discover your earning potential!</p>
                </div>
            </div>
        </div>
        <div  className="w-1/2">
            <h3 className="text-2xl font-semibold text-[#222]">Partner Benifits</h3>
            <div className="flex items-center gap-x-4 my-5">
                <div>
                  <DiJira size={65} color='#0071E3'/>
                </div>
                <div>
                    <p>We'll handle the cobranded materials for you to make sharing our benifits even easier.</p>
                </div>
            </div>
            <div className="flex items-center gap-x-5">
                <div>
                  <GiTeacher size={55} color='#0071E3'/>
                </div>
                <div>
                    <p>Our team is here to offer live demos to help your clients find the best solution.</p>
                </div>
            </div>
            <div className="flex items-center my-5 gap-x-4">
                <div>
                  <PiUserCircleCheckBold size={60} color='#0071E3'/>
                </div>
                <div>
                    <p>Expand what you can offer your clients. This allows you to become a trusted resource, deepen client relationships, and continue adding value to your business.</p>
                </div>
            </div>
            <div className='flex gap-2 mt-5'>
            <button onClick={() => navigate(`/referralForm`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'>Get More Info</button>
            {/* <button onClick={() => navigate(`/schedule-a-meeting/1/referral`)} className='border border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Schedule a Meeting</button> */}
            </div>
        </div>
      </div>

      {/* Informational Last Section */}
      <div className='rounded-[20px] mt-12 p-12 flex flex-col items-center gap-y-5 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] shadow-xl shadow-black/15 mb-24'>
          <h3 className='uppercase font-semibold text-4xl text-[#090909]'>Learn More About Our Business?</h3>
          <p className='font-medium text-[24px] text-center'>
            Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.
          </p>
          <button onClick={() => navigate(`/schedule-a-meeting/1/referral`)} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all ease-in-out duration-200 hover:shadow-blue-500/30 hover:shadow-lg'>Schedule A Meeting</button>
        </div>

    </div>
  )
}

export default ReferralLandingPage
