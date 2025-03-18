import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tab5MainPage = () => {
  const navigate = useNavigate();
  const [loanToggler ,setLoanToggler] = useState(true);

  return (
    <div className="bg-gradient-to-l py-10 from-[#002F5F] to-[#0071E3] w-full min-h-[calc(100vh-72px)]">
      {loanToggler?<div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-2xl shadow-black/25 p-10 mx-auto">
        <div className="w-1/2 pl-2 pr-7">
          <h2><span className="uppercase font-bold text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#002F5F]">Application For Loan</span></h2>
          <p className="font-medium text-xl mt-2.5">
            Join Our Local Marketing Program, Slice of the Market! Pie Pay is offering a free local marketing program that helps generate leads for your business. We will be enrolling new businesses into the program before launch. Slice of the Market is a totally free way to network in your region and generate leads directly to your business. Slice of the Market - Get your Piece!
          </p>
        </div>
        <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
          <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">LOAN Apllication</h2>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="name" className="text-base font-light">
              What is your current annual income?
            </label>
            <input
              type="text"
              id="name"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="email" className="text-base font-light">
              How long have you been in business?
            </label>
            <input
              type="text"
              id="email"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          {/* Business Name Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="businessName" className="text-base font-light">
              What is your credit score?
            </label>
            <input
              type="text"
              id="businessName"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          {/* Phone Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="phone" className="text-base font-light">
              Does your business have any existing debts or loans?<br />
              (To understand your current financial obligations and capacity to take on more debt.)
            </label>
            <input
              type="tel"
              id="phone"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="name" className="text-base font-light">
              What is the purpose of the loan?
            </label>
            <input
              type="text"
              id="name"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="email" className="text-base font-light">
              Do your business own any assets (e.g., property, vehicles)?
            </label>
            <input
              type="text"
              id="email"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          {/* Business Name Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="businessName" className="text-base font-light">
              Has your business previously defaulted on any loans or had bankruptcies?
            </label>
            <input
              type="text"
              id="businessName"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          {/* Phone Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="phone" className="text-base font-light">
              Do you rent or own your current place of business?
            </label>
            <input
              type="tel"
              id="phone"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="phone" className="text-base font-light">
              Do you have any co-signers or guarantors for the loan?
            </label>
            <input
              type="tel"
              id="phone"
              className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
            />
          </div>
          <button onClick={()=>setLoanToggler(false)} type="submit" className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl">
            Next
          </button>
        </div>
      </div>:
      <div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-2xl shadow-black/25 p-10 mx-auto">
        <div className="w-1/2 pl-2 pr-7">
          <h2><span className="uppercase font-bold text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#002F5F]">Eligible Loan</span></h2>
          <p className="font-medium text-xl my-2.5">
            You may be eligible for up to $20,000 with Pie Pay Funding! Your approval code is 2209.
          </p>
          <p className="font-medium text-xl">
            Please upload a bank statement (pdf only) and schedule a meeting with a local agent to move forward with the application.
          </p>
        </div>
        <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
          <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">Schedule Meeting</h2>
          <div className="flex flex-col mt-5 mb-7">
            <label htmlFor="">
              Upload Upto 3 Bank Statement (Optional)
            </label>
            <button className="w-fit py-1.5 px-3 border-[1px] border-[#D6D6D6] rounded-[10px] text-base font-light mt-1">Choose File</button>
          </div>
          <div className="flex items-center gap-x-3">
            <button onClick={() => navigate("/general-info-form/1/flyer")} className='bg-[#0071E3] py-2.5 w-1/2 rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'>Schedule A Metting</button>
            <button onClick={() => navigate("/general-info-form/1/flyer")} className='border w-1/2 border-[#0071E3] text-[#0071E3] py-2.5 rounded-[25px] text-xl font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Download Analysis<img className='w-[22px] h-[22px]' src="downnloadbtnicon.png" alt="" /></button>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Tab5MainPage