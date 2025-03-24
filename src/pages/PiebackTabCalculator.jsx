import { useRef, useState } from "react";
import { LuCalculator, LuPhoneCall } from "react-icons/lu";
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
        <div className="min-h-[100vh] bg-gradient-to-r from-[#4686BC] to-[#62956A] w-full flex flex-col justify-center items-center pt-20 pb-10">
            <div className="w-[1211px] bg-white rounded-[25px] p-[30px] relative" ref={calculatorRef}>
                <h3 className='text-[32px] font-bold text-center mb-5'> PIE BACK CALCULATOR</h3>
                <div className='flex justify-between gap-3'>
                    <div className='w-[50%] pl-3'>
                        {/* Referral Account Volume */}
                        <div className="flex flex-col space-x-4 mb-3">
                            <label htmlFor="referralAccountVolume" className="text-xl font-medium" >
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
                                className='border-[1px] font-medium text-[#333] border-[#D6D6D6] outline-none p-[10px] text-lg mt-1 rounded-[10px]'
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
                                className="text-xl font-medium"
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
                                className='border-[1px] font-medium text-[#333] border-[#D6D6D6] outline-none p-[10px] text-lg mt-1 rounded-[10px]'
                                type="text"
                                id="numberOfReferralsText"
                                value={numberOfReferrals}
                                onChange={handleNumberOfReferralsTextChange}
                            />
                        </div>
                        {/* Total Referral Volume */}
                        <div className="flex flex-col  space-x-4 mb-8">
                            <label
                                htmlFor="totalReferralVolume"
                                className="text-xl font-medium"
                            >
                                Monthly Income from Referral Account
                            </label>
                            <input
                                className='border-[1px] font-medium text-[#333] border-[#D6D6D6] outline-none p-[10px] text-lg mt-1 rounded-[10px]'
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
                                className="text-xl font-medium"
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
                                className='border-[1px] font-medium text-[#333] border-[#D6D6D6] outline-none p-[10px] text-lg mt-1 rounded-[10px]'
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
                                className="text-xl font-medium"
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
                                className='border-[1px] font-medium text-[#333] border-[#D6D6D6] outline-none p-[10px] text-lg mt-1 rounded-[10px]'
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
                                className="text-xl font-medium"
                            >
                                Current Monthly Fees
                            </label>
                            <input
                                className='border-[1px] font-medium text-[#333] border-[#D6D6D6] outline-none p-[10px] text-lg mt-1 rounded-[10px]'
                                type="text"
                                id="currentMonthlyFee"
                                value={currentMonthlyFee}
                                onChange={handleCurrentMonthlyFeeChange}
                            />
                        </div>
                    </div>
                    <div className='w-[50%] pl-8 pr-4'>

                        <div className="flex justify-between mb-4">
                            <label className="text-xl font-medium">Select Period</label>
                            <select
                                className="text-xl font-medium focus:outline-none outline-none border-0 border-b-2 border-gray-500 bg-transparent"
                                onChange={handleDropdownChange}
                                value={isYearly ? "Yearly" : "Monthly"}
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>

                        </div>
                        <div>
                            <div className="mb-5 bg-[#F1F1F1] rounded-[50px]">
                                <div className="flex gap-x-5 p-[5px] h-full bg-[#4686BC] rounded-[50px] min-w-fit items-center">
                                    <div className="w-[100px] h-[100px] bg-[#C0C0C0] rounded-full"/>
                                    <div className={`h-full text-white min-w-fit flex justify-center items-center flex-col`}>
                                        <h6 className="font-medium">Savings</h6>
                                        <h6 className="font-medium">{}%</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-[80px] bg-[#F1F1F1] rounded-[50px]">
                                <div className="flex gap-x-5 p-[5px] h-full bg-[#62956A] rounded-[50px] min-w-fit items-center">
                                    <div className="w-[100px] h-[100px] bg-[#C0C0C0] rounded-full"/>
                                    <div className={`h-full text-white min-w-fit flex justify-center items-center flex-col`}>
                                        <h6 className="font-medium">Savings</h6>
                                        <h6 className="font-medium">{}%</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Savings with Piepay */}
                        <div className="bg-[#4686BC] p-[10px] rounded-[20px] my-5 shadow-lg shadow-blue-100 text-white flex flex-col justify-center items-center">
                            <div className="flex">
                                <h3 className="text-[32px] font-bold">Savings with PiePay</h3>
                            </div>
                            <h3 className="text-[50px] font-bold">{savings.toFixed(2)}$</h3>
                        </div>
                        {/* Earnings with Getpie.io */}
                        <div className="bg-[#62956A] p-[10px] rounded-[20px] shadow-lg shadow-green-100 text-white flex flex-col justify-center items-center">
                            <div className="flex">
                                <h3 className="text-[32px] font-bold">Earnings with Getpie</h3>
                            </div>
                            <h3 className="text-[50px] font-bold">{earnings.toFixed(2)}$</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex gap-3 justify-center">
                <button onClick={() => navigate(`/schedule-a-meeting/${"wsw"}/piebackCalculator`)} className="cursor-pointer flex items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-300/60 px-5 rounded-xl"><div><LuPhoneCall color="#f4f4f4" size={19} /></div><span className="text-lg text-[#f4f4f4] font-medium">SCHEDULE AN APPOINTMENT</span></button>
                <button onClick={handleCreateBusinessCard} className="cursor-pointer flex items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-300/60 px-5 rounded-xl"><div><IoArrowRedoCircleOutline color="#f4f4f4" size={24} /></div><span className="text-lg text-[#f4f4f4] font-medium">GET THIS ANALYSIS QR + LINK </span></button>
                <button onClick={handleCreateBusinessCard} className="cursor-pointer flex items-center gap-2 bg-blue-700/70 border-2 border-blue-500 py-2.5 shadow-lg shadow-blue-300/60 px-5 rounded-xl"><div><MdOutlineFileDownload color="#f4f4f4" size={23} /></div><span className="text-lg text-[#f4f4f4] font-medium">DOWNLOAD THIS ANALYSIS</span></button>
            </div>
        </div>
    );
};

export default PiebackTabCalculator;
