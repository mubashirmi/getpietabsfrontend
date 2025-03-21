import { useRef, useState } from "react";
import { LuCalculator , LuPhoneCall} from "react-icons/lu";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, ArcElement, Legend } from "chart.js";
import { FaLocationArrow } from "react-icons/fa6";
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import domtoimage from 'dom-to-image';
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(Title, Tooltip, ArcElement, Legend);

const PiebackTabCalculator = () => {
    const calculatorRef = useRef();
    const navigate = useNavigate();

    const [referralAccountVolume, setReferralAccountVolume] = useState(0);
    const [numberOfReferrals, setNumberOfReferrals] = useState(0);
    const [businessVolume, setBusinessVolume] = useState(0);
    const [personMonthlyFee, setPersonMonthlyFee] = useState(0);
    const [currentMonthlyFee, setCurrentMonthlyFee] = useState('');
    const [isYearly, setIsYearly] = useState(false); // Track if the user selected yearly

    // Calculate Total Referral Volume based on the provided formula
    const totalReferralVolume =
        referralAccountVolume * numberOfReferrals * 0.015 * 0.15;

    // Savings calculation
    const savings = isYearly
        ? (currentMonthlyFee - personMonthlyFee) * 12
        : currentMonthlyFee - personMonthlyFee;

    // Earnings calculation
    const earnings = isYearly
        ? ((totalReferralVolume + businessVolume * 0.015) * 0.125) * 12
        : (totalReferralVolume + businessVolume * 0.015) * 0.125;

    // Doughnut chart data
    const data = {
        labels: ['Savings with PiePay', 'Earnings with Getpie.io'],
        datasets: [
            {
                label: 'Monthly vs Yearly',
                data: [savings, earnings],
                backgroundColor: savings || earnings ? ['#FF6384', '#36A2EB'] : ['#e0e0e0', '#e0e0e0'], // Default gray if empty
                hoverBackgroundColor: ['#FF6384', '#36A2EB'], // Hover effect
                hoverOffset: 4,
            },
        ],
    };

    // Doughnut chart options to disable hover effect if empty
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: savings || earnings ? true : false, // Disable tooltip when chart is empty
            },
            legend: {
                display: false,
            },
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
    };

    // Handlers for all input fields
    const handleReferralVolumeRangeChange = (e) => {
        setReferralAccountVolume(Number(e.target.value));
    };
    const handleReferralVolumeTextChange = (e) => {
        const value = Number(e.target.value);
        setReferralAccountVolume(isNaN(value) ? 0 : value);
    };

    const handleNumberOfReferralsRangeChange = (e) => {
        setNumberOfReferrals(Number(e.target.value));
    };
    const handleNumberOfReferralsTextChange = (e) => {
        const value = Number(e.target.value);
        setNumberOfReferrals(isNaN(value) ? 0 : value);
    };

    const handleBusinessVolumeRangeChange = (e) => {
        setBusinessVolume(Number(e.target.value));
    };
    const handleBusinessVolumeTextChange = (e) => {
        const value = Number(e.target.value);
        setBusinessVolume(isNaN(value) ? 0 : value);
    };

    const handlePersonMonthlyFeeRangeChange = (e) => {
        setPersonMonthlyFee(Number(e.target.value));
    };
    const handlePersonMonthlyFeeTextChange = (e) => {
        const value = Number(e.target.value);
        setPersonMonthlyFee(isNaN(value) ? 0 : value);
    };

    const handleCurrentMonthlyFeeChange = (e) => {
        setCurrentMonthlyFee(e.target.value);
    };

    const handleDropdownChange = (e) => {
        setIsYearly(e.target.value === "Yearly");
    };

  const handleCreateBusinessCard = async () => {
    try {
      const element = calculatorRef.current;
      if (!element) return;
  
      const dataUrl = await domtoimage.toPng(element);
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob, 'business_card.png');
      navigate(`/general-info-form/${"1"}/piebackCalculator`);

      await fetch('http://localhost:4000/api/tab6', {
        method: 'POST',
        body: formData,
      });  
    } catch (error) {
      console.error('Error capturing and sending image:', error);
    }
  };
      

    return (
        <div className="min-h-[100vh] bg-gradient-to-r from-[#0071E3] to-[#002F5F] w-full flex flex-col justify-center items-center pt-20 pb-10">
            <div className="w-6xl bg-white rounded-4xl border-[3px] border-blue-800/60 px-4 pt-16 pb-10 relative" ref={calculatorRef}>
                <div className='absolute top-0 bg-blue-100 text-blue-800/80 translate-y-[-50%] left-[50%] translate-x-[-50%] w-[7rem] h-[7rem] flex justify-center items-center rounded-full border-[3px] border-blue-800/60 shadow-lg shadow-blue-100'>
                    <LuCalculator size={50} />
                </div>
                <h3 className='text-[40px] font-semibold text-[#444] text-center font-sans mb-2'> PIE BACK CALCULATOR</h3>
                <div className='flex justify-between gap-4'>
                <div className='w-[62%] pl-3'>
                        {/* Referral Account Volume */}
                        <div className="flex flex-col space-x-4 mb-3">
                            <label htmlFor="referralAccountVolume" className="text-lg font-medium text-gray-700" >
                                Average Referral Account Volume
                            </label>
                            <input
                                type="range"
                                id="referralAccountVolumeRange"
                                min="0"
                                max="10000"
                                value={referralAccountVolume}
                                onChange={handleReferralVolumeRangeChange}
                            />
                            <input
                                className='border-2 font-medium text-[#444] bg-blue-100/70 border-blue-200 outline-none py-1 px-2 text-lg mt-1 rounded-md'
                                type="text"
                                id="referralAccountVolumeText"
                                value={referralAccountVolume}
                                onChange={handleReferralVolumeTextChange}
                            />
                        </div>
                        {/* Number of Referrals */}
                        <div className="flex flex-col space-x-4 mb-3">
                            <label
                                htmlFor="numberOfReferrals"
                                className="text-lg font-medium text-gray-700"
                            >
                                Number of Referred Merchants
                            </label>
                            <input
                                type="range"
                                id="numberOfReferralsRange"
                                min="0"
                                max="100"
                                value={numberOfReferrals}
                                onChange={handleNumberOfReferralsRangeChange}
                            />
                            <input
                                className='border-2 font-medium text-[#444] bg-blue-100/70 border-blue-200 outline-none py-1 px-2 text-lg mt-1 rounded-md'
                                type="text"
                                id="numberOfReferralsText"
                                value={numberOfReferrals}
                                onChange={handleNumberOfReferralsTextChange}
                            />
                        </div>
                        {/* Total Referral Volume */}
                        <div className="flex flex-col  space-x-4 mb-20">
                            <label
                                htmlFor="totalReferralVolume"
                                className="text-lg font-medium text-gray-700"
                            >
                                Monthly Income from Referral Account
                            </label>
                            <input
                                className='border-2 font-medium text-[#444] bg-blue-100/70 border-blue-200 outline-none py-1 px-2 text-lg mt-1 rounded-md'
                                type="text"
                                id="totalReferralVolume"
                                readOnly
                                value={totalReferralVolume.toFixed(2)}
                            />
                        </div>
                        {/* Business Volume */}
                        <div className="flex flex-col space-x-4 mb-3">
                            <label
                                htmlFor="businessVolume"
                                className="text-lg font-medium text-gray-700"
                            >
                                Business Volume
                            </label>
                            <input
                                type="range"
                                id="businessVolumeRange"
                                min="0"
                                max="100"
                                value={businessVolume}
                                onChange={handleBusinessVolumeRangeChange}
                            />
                            <input
                                className='border-2 font-medium text-[#444] bg-blue-100/70 border-blue-200 outline-none py-1 px-2 text-lg mt-1 rounded-md'
                                type="text"
                                id="businessVolumeText"
                                value={businessVolume}
                                onChange={handleBusinessVolumeTextChange}
                            />
                        </div>
                        {/* Person Monthly Fee */}
                        <div className="flex flex-col space-x-4 mb-3">
                            <label
                                htmlFor="personMonthlyFee"
                                className="text-lg font-medium text-gray-700"
                            >
                                PiePay Monthly Fee
                            </label>
                            <input
                                type="range"
                                id="personMonthlyFeeRange"
                                min="10"
                                max="1000"
                                value={personMonthlyFee}
                                onChange={handlePersonMonthlyFeeRangeChange}
                            />
                            <input
                                className='border-2 font-medium text-[#444] bg-blue-100/70 border-blue-200 outline-none py-1 px-2 text-lg mt-1 rounded-md'
                                type="text"
                                id="personMonthlyFeeText"
                                value={personMonthlyFee}
                                onChange={handlePersonMonthlyFeeTextChange}
                            />
                        </div>
                        {/* Current Monthly Fees */}
                        <div className="flex flex-col space-x-4">
                            <label
                                htmlFor="currentMonthlyFee"
                                className="text-lg font-medium text-gray-700"
                            >
                                Current Monthly Fees
                            </label>
                            <input
                                className='border-2 font-medium text-[#444] bg-blue-100/70 border-blue-200 outline-none py-1 px-2 text-lg mt-1 rounded-md'
                                type="text"
                                id="currentMonthlyFee"
                                value={currentMonthlyFee}
                                onChange={handleCurrentMonthlyFeeChange}
                            />
                        </div>
                    </div>
                    <div className='w-[38%] pl-8 pr-4'>
                        {/* Donut Chart */}
                        <div className="flex justify-between mb-4">
                            <label className="text-xl">Select Period:</label>
                            <select
                                className="bg-slate-50 text-xs ml-2 translate-y-[5px] rounded-lg outline-none border-2 border-blue-300"
                                onChange={handleDropdownChange}
                                value={isYearly ? "Yearly" : "Monthly"}
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div>
                            <Doughnut data={data} options={options} />
                        </div>
                        {/* Savings with Piepay */}
                        <div className="bg-blue-100/90 p-6 rounded-2xl my-5 shadow-lg shadow-blue-100 border-2 border-blue-300/20">
                            <div className="flex">
                                <label htmlFor="monthlyYearlysavings" className="text-2xl font-semibold text-[#222]">Savings with PiePay</label>
                            </div>
                            <h3 className="text-6xl text-blue-800/70 font-bold mt-2 ml-1 font-mono">{savings.toFixed(2)}$</h3>
                        </div>
                        {/* Earnings with Getpie.io */}
                        <div className="bg-green-100/90 p-6 rounded-2xl shadow-lg shadow-green-100 border-2 border-green-300/20">
                            <div className="flex">
                                <label htmlFor="monthlyYearlysavings" className="text-2xl font-semibold text-[#222]">Earnings with Getpie</label>
                            </div>
                            <h3 className="text-6xl text-green-800/70 font-bold mt-2 ml-1 font-mono">{earnings.toFixed(2)}$</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex gap-3 justify-center">
                <button onClick={()=> navigate(`/schedule-a-meeting/${"wsw"}/piebackCalculator`)} className="cursor-pointer flex items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-300/60 px-5 rounded-xl"><div><LuPhoneCall color="#f4f4f4" size={19} /></div><span className="text-lg text-[#f4f4f4] font-medium">SCHEDULE AN APPOINTMENT</span></button>
                <button onClick={handleCreateBusinessCard} className="cursor-pointer flex items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-300/60 px-5 rounded-xl"><div><IoArrowRedoCircleOutline color="#f4f4f4" size={24} /></div><span className="text-lg text-[#f4f4f4] font-medium">GET THIS ANALYSIS QR + LINK </span></button>
                <button onClick={handleCreateBusinessCard} className="cursor-pointer flex items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-300/60 px-5 rounded-xl"><div><MdOutlineFileDownload color="#f4f4f4" size={23} /></div><span className="text-lg text-[#f4f4f4] font-medium">DOWNLOAD THIS ANALYSIS</span></button>
            </div>
        </div>
    );
};

export default PiebackTabCalculator;
