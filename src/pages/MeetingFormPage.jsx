import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

const MeetingFormPage = () => {

  const navigate = useNavigate();
  const { pictureId , tabName } = useParams();
  
  // Updated state variables
  const [businessName, setBusinessName] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!businessName || !merchantName || !businessAddress || !meetingTime || !meetingDate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required.",
      });
      return;
    }

    // Prepare payload and set loading state
    setIsLoading(true);
    const payload = { bizName : businessName, merchantName, bizAddress : businessAddress , meetingTime , meetingDate, tabName : "Loan-Application"};

    try {
      // Send POST request using axios
      const response = await axiosInstance.post('/meeting', payload); // Replace with actual endpoint

      if (response.status === 200) {
        // On successful submission, show success modal via SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Your meeting has been scheduled successfully.`,
        });

        // Optionally clear the form
        setBusinessName('');
        setMerchantName('');
        setBusinessAddress('');
        setMeetingTime('');
        setMeetingDate('');
        navigate(`/tab7form/${tabName}`);
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
            Schedule A Meeting
          </h3>
          <form onSubmit={handleSubmit}>
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
            {/* Merchant Name Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="merchantName" className="text-base font-light">
                Merchant Name
              </label>
              <input
                type="text"
                id="merchantName"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Business Address Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="businessAddress" className="text-base font-light">
                Business Address
              </label>
              <input
                type="text"
                id="businessAddress"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Meeting Time Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="meetingTime" className="text-base font-light">
                Meeting Time
              </label>
              <input
                type="time"
                id="meetingTime"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Meeting Date Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="meetingDate" className="text-base font-light">
                Meeting Date
              </label>
              <input
                type="date"
                id="meetingDate"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            <button type="submit" className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetingFormPage;
