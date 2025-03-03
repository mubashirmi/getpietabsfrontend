import { BiListUl } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const Tab6FormPage = () => {
  const { cardId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!name || !email || !businessName || !phone) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required."
      });
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email address."
      });
      return;
    }

    // Prepare payload and set loading state
    setIsLoading(true);
    const payload = { name, email, businessName, phone, cardId };

    try {
      // Send POST request to a random API endpoint
      const response = await fetch("https://example.com/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      // On successful submission, show success modal via SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Congratulations! Your card has been sent to your email: ${email}`
      });

      // Optionally clear the form
      setName('');
      setEmail('');
      setBusinessName('');
      setPhone('');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "Submission failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-blue-200 w-full'>
      <div className='min-w-full sm:min-w-2xl border-blue-400/60 border-2 bg-slate-50 rounded-4xl relative shadow-xl pt-16 pb-9 px-6 sm:px-10 shadow-black/15'>
        <div className='absolute top-0 translate-y-[-50%] border-2 shadow-lg shadow-blue-100/70 border-blue-200 left-[50%] bg-blue-100/100 translate-x-[-50%] w-[6rem] sm:w-[7rem] h-[6rem] sm:h-[7rem] rounded-full flex justify-center items-center'>
          <BiListUl size={50} sm={65} color="#222" />
        </div>
        <h3 className="text-xl text-[#333] font-medium text-center my-3">
          Please enter the below details to get your business card.
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="name" className="text-xl font-medium text-[#444]">
              Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2.5 px-3"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="email" className="text-xl font-medium text-[#444]">
              Email
            </label>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2.5 px-3"
            />
          </div>
          {/* Business Name Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="businessName" className="text-xl font-medium text-[#444]">
              Business Name
            </label>
            <input 
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2.5 px-3"
            />
          </div>
          {/* Phone Field */}
          <div className="mb-4 flex flex-col gap-1">
            <label htmlFor="phone" className="text-xl font-medium text-[#444]">
              Phone #
            </label>
            <input 
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2.5 px-3"
            />
          </div>
          {/* Submit Button with Loader */}
          <div className="w-full flex justify-center">
            <button 
              type="submit" 
              disabled={isLoading}
              className="rounded-xl text-xl mb-0.5 mt-4 shadow-lg shadow-black/15 text-white transition-all duration-300 cursor-pointer font-medium py-2.5 px-7 bg-blue-700/80 hover:bg-blue-700 flex items-center justify-center"
            >
              {isLoading ? (
                <svg 
                  className="animate-spin h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Submit & Receive Your Card"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tab6FormPage;
