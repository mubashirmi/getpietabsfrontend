import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import CircularProgress from '@mui/material/CircularProgress';
import QRCode from "react-qr-code";

const Tab5MainPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Initial Form, 2 = Loan Application, 3 = Eligible Loan
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  // Initial Form Data (name, email, phone)
  const [initialFormData, setInitialFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  // Functions to open & close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    }
  };

  // Loan Application Form Data
  const [formData, setFormData] = useState({
    annualIncome: '',
    businessDuration: '',
    creditScore: '',
    existingDebts: '',
    loanPurpose: '',
    assetsOwned: '',
    previousDefaults: '',
    businessPlace: '',
    cosigners: ''
  });

  const validateInitialForm = () => {
    const newErrors = {};
    if (!initialFormData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!initialFormData.email.trim() || !/\S+@\S+\.\S+/.test(initialFormData.email)) newErrors.email = 'Valid email is required';
    if (!initialFormData.phoneNumber.trim() || isNaN(initialFormData.phoneNumber)) newErrors.phoneNumber = 'Valid phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoanForm = () => {
    const newErrors = {};
    if (!formData.annualIncome.trim()) newErrors.annualIncome = 'Annual income is required';
    if (!formData.businessDuration.trim()) newErrors.businessDuration = 'Business duration is required';
    if (!formData.creditScore.trim() || isNaN(formData.creditScore)) newErrors.creditScore = 'Valid credit score is required';
    if (!formData.existingDebts) newErrors.existingDebts = 'This field is required';
    if (!formData.loanPurpose.trim()) newErrors.loanPurpose = 'Loan purpose is required';
    if (!formData.assetsOwned.trim()) newErrors.assetsOwned = 'This field is required';
    if (!formData.previousDefaults) newErrors.previousDefaults = 'This field is required';
    if (!formData.businessPlace) newErrors.businessPlace = 'This field is required';
    if (!formData.cosigners) newErrors.cosigners = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialFormSubmit = () => {
    if (validateInitialForm()) {
      setStep(2); // Proceed to loan application
    }
  };

  const handleNext = () => {
    if (validateLoanForm()) {
      setStep(3); // Proceed to eligible loan form
    }
  };

  const handleChange = (e) => {
    if (step === 1) {
      setInitialFormData({
        ...initialFormData,
        [e.target.id]: e.target.value
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const submitForm = async () => {
    if (files.length === 0) {
      alert('Please upload at least one bank statement');
      return;
    }
    setIsLoading(true);
    const formPayload = new FormData();
    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    Object.entries(initialFormData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    // Append files
    files.forEach((file) => {
      formPayload.append('bankStatements', file);
    });

    try {
      const response = await axiosInstance.post('/loan', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/general-info-form/${response.data.id}/Loan-Application`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-l py-10 from-[#002F5F] to-[#0071E3] w-full min-h-[calc(100vh-72px)]">
      {step === 1 && (
        <div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-2xl shadow-black/25 p-10 mx-auto">
          <div className="w-1/2 pl-2 pr-7">
            <h2>
              <span className="uppercase font-bold text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#002F5F]">
                Personal Information
              </span>
            </h2>
            <p className="font-medium text-xl mt-1 mb-4">
              Please provide your personal details to proceed to the loan application.
            </p>
            <button onClick={openModal} className='border-2 border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="qr-code-scan.png" alt="" /></button>

          </div>

          <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
            <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
              Personal Info
            </h2>

            {/* Personal Info Form */}
            {[
              { id: 'fullName', label: 'Your Name' },
              { id: 'email', label: 'Your Email', type: 'email' },
              { id: 'phoneNumber', label: 'Your Phone Number', type: 'number' }
            ].map((field) => (
              <div key={field.id} className="mb-4 flex flex-col gap-1">
                <label htmlFor={field.id} className="text-base font-light">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  id={field.id}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  value={initialFormData[field.id]}
                  onChange={handleChange}
                />
                {errors[field.id] && <span className="text-red-500 text-sm">{errors[field.id]}</span>}
              </div>
            ))}

            <button
              onClick={handleInitialFormSubmit}
              type="button"
              className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-2xl shadow-black/25 p-10 mx-auto">
          <div className="w-1/2 pl-2 pr-7">
            <h2>
              <span className="uppercase font-bold text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#002F5F]">
                Loan Application
              </span>
            </h2>
            <p className="font-medium text-xl mt-1 mb-4">
              Join Our Local Marketing Program, Slice of the Market! Pie Pay is offering a free local marketing program that helps generate leads for your business. We will be enrolling new businesses into the program before launch. Slice of the Market is a totally free way to network in your region and generate leads directly to your business. Slice of the Market - Get your Piece!
            </p>
            <button onClick={openModal} className='border-2 border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="qr-code-scan.png" alt="" /></button>

          </div>

          <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
            <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
              LOAN Application
            </h2>

            {/* Loan Application Form */}
            {[
              { id: 'annualIncome', label: 'What is your current annual income?' },
              { id: 'businessDuration', label: 'How long have you been in business?' },
              { id: 'creditScore', label: 'What is your credit score?', type: 'number' },
              { id: 'existingDebts', label: 'Does your business have any existing debts or loans?', type: 'select' },
              { id: 'loanPurpose', label: 'What is the purpose of the loan?' },
              { id: 'assetsOwned', label: 'Does your business own any assets (e.g., property, vehicles)?' },
              { id: 'previousDefaults', label: 'Has your business previously defaulted on any loans or had bankruptcies?', type: 'select' },
              { id: 'businessPlace', label: 'Do you rent or own your current place of business?', type: 'select' },
              { id: 'cosigners', label: 'Do you have any co-signers or guarantors for the loan?', type: 'select' },
            ].map((field) => (
              <div key={field.id} className="mb-4 flex flex-col gap-1">
                <label htmlFor={field.id} className="text-base font-light">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                    value={formData[field.id]}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {field.id === 'businessPlace' ? (
                      <>
                        <option value="Rent">Rent</option>
                        <option value="Own">Own</option>
                      </>
                    ) : (
                      <>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    id={field.id}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                    value={formData[field.id]}
                    onChange={handleChange}
                  />
                )}
                {errors[field.id] && <span className="text-red-500 text-sm">{errors[field.id]}</span>}
              </div>
            ))}

            <button
              onClick={handleNext}
              type="button"
              className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-lg shadow-black/35 p-10 mx-auto">
          <div className="w-1/2 pl-2 pr-7">
            <h2>
              <span className="uppercase font-bold text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#002F5F]">
                Eligible Loan
              </span>
            </h2>
            <p className="font-medium text-xl mt-2">You may be eligible for up to $20,000 with Pie Pay Funding! Your approval code is 2209.</p>
            <p className="font-medium text-xl mt-2.5 mb-4">Please upload a bank statement (pdf only) and schedule a meeting with a local agent to move forward with the application.</p>
            <button onClick={openModal} className='border-2 border-[#0071E3] text-[#0071E3] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <img className='w-[22px] h-[22px]' src="qr-code-scan.png" alt="" /></button>
          </div>

          <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
            <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wider">
              Schedule Meeting
            </h2>

            <div className="flex flex-col mt-5 mb-7">
              <label>Upload Upto 3 Bank Statement (Optional)</label>
              <div className="relative mt-1">
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  onChange={handleFileChange}
                  className="absolute opacity-0 w-full h-full cursor-pointer left-0 top-0"
                  accept=".pdf"
                />
                <label
                  htmlFor="fileUpload"
                  className=" py-1.5 px-5 rounded-[10px] text-lg font-medium border-[1px] border-[#D6D6D6] cursor-pointer transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200 inline-block text-center"
                >
                  Choose PDF Files
                </label>
              </div>

              {files.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  Selected: {files.map(f => f.name).join(', ')}
                </div>
              )}
            </div>

            <div className="flex items-center gap-x-3">
              <button
                onClick={() => navigate("/schedule-a-meeting/1/Loan-Application")}
                className='bg-[#0071E3] py-2.5 w-1/2 rounded-[10px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'
              >
                Schedule A Meeting
              </button>
              <button
                onClick={submitForm}
                className='border w-1/2 border-[#0071E3] text-[#0071E3] py-2.5 rounded-[10px] text-xl font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'
              >
                {isLoading ? (<CircularProgress size={24} color="bluez" />) : <div className="flex justify-center items-center gap-x-2.5">Download Analysis <img className='w-[22px] h-[22px]' src="downnloadbtnicon.png" alt="" /></div>}
              </button>
            </div>
          </div>
        </div>
      )}
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
                  value={`https://getpietabsfrontend.vercel.app/loanFinancialAnalysis`}
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

export default Tab5MainPage;
