import { useRef, useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { Chart as ChartJS, Title, Tooltip, ArcElement, Legend } from "chart.js";
import domtoimage from 'dom-to-image';
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

// Register Chart.js components
ChartJS.register(Title, Tooltip, ArcElement, Legend);

const PiebackTabCalculator = () => {
    const calculatorRef = useRef();
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


    const [referralAccountVolume, setReferralAccountVolume] = useState(0);
    const [numberOfReferrals, setNumberOfReferrals] = useState(0);
    const [businessVolume, setBusinessVolume] = useState(0);
    const [personMonthlyFee, setPersonMonthlyFee] = useState(0);
    const [currentMonthlyFee, setCurrentMonthlyFee] = useState('');
    const [isYearly, setIsYearly] = useState(false); // Track if the user selected yearly

    // Calculate Total Referral Volume based on the provided formula
    const totalReferralVolume = referralAccountVolume * numberOfReferrals * 0.015 * 0.15;

    // Savings calculation
    const savings = isYearly ? (currentMonthlyFee - personMonthlyFee) * 12 : currentMonthlyFee - personMonthlyFee;

    // Earnings calculation
    const earnings = isYearly ? ((totalReferralVolume + businessVolume * 0.015) * 0.125) * 12 : (totalReferralVolume + businessVolume * 0.015) * 0.125;

    console.log(savings, earnings);
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
            <div className="max-w-[1440px] w-[95%] bg-white rounded-[25px] p-[30px] mx-auto" ref={calculatorRef}>
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
                                <div className={`flex gap-x-5 p-[5px] h-full bg-[#4686BC] rounded-[50px] min-w-fit items-center `} style={{ width: `${savings}%` }}>
                                    <div className="min-w-[100px] min-h-[100px] bg-[#C0C0C0] rounded-full" />
                                    <div className={`h-full text-white min-w-fit w-full flex justify-center flex-col`}>
                                        <h6 className="font-medium">Savings</h6>
                                        <h6 className="font-medium">{ }%</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-[80px] bg-[#F1F1F1] rounded-[50px]">
                                <div className={`flex gap-x-5 p-[5px] h-full bg-[#62956A] rounded-[50px] min-w-fit items-center`}>
                                    <div className="min-w-[100px] h-[100px] bg-[#C0C0C0] rounded-full" />
                                    <div className={`h-full text-white min-w-fit w-full flex justify-center flex-col`}>
                                        <h6 className="font-medium">Earnings</h6>
                                        <h6 className="font-medium">{ }%</h6>
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
                <div className="mt-10 flex gap-3 justify-center">
                    <button onClick={() => navigate(`/general-info-form/${"1"}/piebackCalculator`)} className="bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200">Get Your analysis</button>
                    <button onClick={openModal} className='border border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="qr-code-scan.png" alt="" /></button>
                </div>
            </div>
            {/* Informational Last Section */}
            <div className='max-w-[1440px] w-[96%] mt-10 rounded-[20px] p-12 flex flex-col items-center gap-y-5 bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] shadow-xl shadow-black/15 mb-24'>
                <h3 className='uppercase font-semibold text-4xl text-[#090909]'>Learn More About Our Business?</h3>
                <p className='font-medium text-[24px] text-center'>
                    Lorem ipsum sed nisi turpis odio mattis pellentesque viverra semper blandit scelerisque sed diam lectus posuere urna morbi aliquet aenean.
                </p>
                <button onClick={() => navigate("/schedule-a-meeting/1/piebackCalculator")} className='bg-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all ease-in-out duration-200 hover:shadow-blue-500/30 hover:shadow-lg'>Schedule A Meeting</button>
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
                                    value="https://getpietabsfrontend.vercel.app/general-info-form/1/piebackCalculator"
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

export default PiebackTabCalculator;
