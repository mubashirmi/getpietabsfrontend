import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewNavbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex flex-row-reverse pt-3 pb-4 justify-between text-black/80 font-medium text-base items-center max-w-[1440px] mx-auto px-4">
        {/* Left Side: Hamburger, Login, Signup */}
        <div className="flex flex-row-reverse items-center space-x-4">
          {/* Hamburger Icon */}
          <button onClick={toggleSidebar} className="focus:outline-none cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Login and Signup Buttons */}
          <button
            onClick={() => navigate('/login')}
            className="cursor-pointer rounded-[10px] text-[#0071E3] hover:bg-[#0071E3] hover:text-white px-6 py-1.5 border-[1px] border-[#0071E3] ml-2 hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="cursor-pointer rounded-[10px] px-6 py-1.5 text-white hover:text-[#0071E3] bg-[#0071E3] hover:bg-white border-[1px] border-[#0071E3] hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out"
          >
            SignUp
          </button>
        </div>

        {/* Right Side: Logo */}
        <div className="w-11">
          <img className="" src="/Logo.png" alt="Logo" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[450px] bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4 p-4">
          <button
            onClick={() => {
              navigate('/');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium text-[24px]">Flyer</span>
          </button>

          <button
            onClick={() => {
              navigate('/businesscard');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <img src="/businesscardnavicon.png" alt="" />
            <span className="font-medium text-[24px]">Business Card</span>
          </button>

          <button
            onClick={() => {
              navigate('/sliceOfTheMarket');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
              />
            </svg>
            <span className="font-medium text-[24px]">Slice of the Market</span>
          </button>

          <button
            onClick={() => {
              navigate('/chargebackRiskAnalysis');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="font-medium text-[24px]">Charge Back Risk Analysis</span>
          </button>

          <button
            onClick={() => {
              navigate('/loanFinancialAnalysis');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-[24px]">Loan Financial Analysis</span>
          </button>

          <button
            onClick={() => {
              navigate('/piebackcalculator');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium text-[24px]">PieBack Analysis</span>
          </button>

          <button
            onClick={() => {
              navigate('/merchant-analysis/1/merchant-analysis');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="font-medium text-[24px]">Merchant Analysis</span>
          </button>

          <button
            onClick={() => {
              navigate('/pie-proshop');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="font-medium text-[24px]">Pie ProShop</span>
          </button>

          <button
            onClick={() => {
              navigate('/referral');
              toggleSidebar();
            }}
            className="flex items-center space-x-2 cursor-pointer rounded-lg hover:bg-gray-100 p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium text-[24px]">Referral</span>
          </button>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default NewNavbar;