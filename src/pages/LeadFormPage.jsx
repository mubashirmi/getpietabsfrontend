import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

const LeadFormPage = () => {

  const navigate = useNavigate();

  const { pictureId , tabName } = useParams();
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
        text: "All fields are required.",
      });
      return;
    }
    // Validate email format
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // Prepare payload and set loading state
    setIsLoading(true);

    // Set dynamic field based on tabName prop
    let payload = { name, email, businessName, phone, tabName };

    if (tabName === "Flyer") {
      payload.flyerId = Number(pictureId);
    } else if (tabName === "Business-Card") {
      payload.businessCardImageId = Number(pictureId);
    } else if (tabName === "Calculator") {
      payload.calculatorImageId = Number(pictureId);
    }

    try {
      // Send POST request using axios
      const response = await axiosInstance.post('/lead', payload); // Replace with actual endpoint

      if (response.status === 200) {
        // On successful submission, show success modal via SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Congratulations! Your card has been sent to your email: ${email}`,
        });

        // Optionally clear the form
        setName('');
        setEmail('');
        setBusinessName('');
        setPhone('');
        navigate(`/merchant-analysis/${pictureId}/${tabName}`);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "Submission failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='min-h-[calc(100vh-72px)] flex justify-center items-center bg-gradient-to-r from-[#DBEDFF] to-[#FFFFFF] py-8'>
      <div className='max-w-[1440px] w-[95%] py-28 px-12 rounded-4xl gap-x-10 flex shadow-2xl h-full bg-gradient-to-l from-[#002F5F] to-[#0071E3] shadow-black/15 border-[1px] border-[#f4f4f4] '>
        <div className="w-[50%] min-h-full flex flex-col justify-center items-center">
          <h2 className="text-[32px] font-bold text-white">WELCOME TO</h2>
          <div className="flex my-4 justify-center items-center w-full">
            <img src="/public/Logo.png" alt="logo getpie.io" className="w-[175px]" />
          </div>
          <h2 className="text-[32px] font-bold text-white mb-4">GETPIE.IO</h2>
          <p className="text-center text-white font-medium text-2xl">Lorem . Esse illum ut veniam amet, quasi nisissimos. Soluta aut laborum repellat velit! Cum, voluptates mollitia facere obcaecati neque repellendus molestias ipsam ex eos, possimus reprehenderit optio provident! Recusandae quae distinctio odit magnam tempora, quibusdam et.</p>
        </div>
        <div className="w-[50%] bg-white px-10 py-12 h-full rounded-[25px] shadow-2xl shadow-black/10">
          <h3 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
            {
              tabName === "flyer" ? "get more info" :
                tabName === "businessCard" ? "Get Your Card" :
                  tabName === "piebackCalculator" ? "Get Your Analysis" :
                    "Enter below Details"
            }
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="name" className="text-base font-light">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Email Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="email" className="text-base font-light">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Business Name Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="businessName" className="text-base font-light">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Phone Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="phone" className="text-base font-light">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            <button type="submit" className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl">
              {
                tabName === "flyer" ? "Get Flyer" :
                  tabName === "businessCard" ? "Get Your Business Card" :
                    tabName === "piebackCalculator" ? "Submit & Get Your Analysis" :
                      "Submit"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadFormPage;
