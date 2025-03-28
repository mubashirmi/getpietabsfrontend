import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Tab5MainPage = () => {
  const navigate = useNavigate();
  const [loanToggler, setLoanToggler] = useState(true);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  
  // Form states
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

  const validateFirstForm = () => {
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

  const handleNext = () => {
    if (validateFirstForm()) {
      setLoanToggler(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const submitForm = async () => {
    if (files.length === 0) {
      alert('Please upload at least one bank statement');
      return;
    }

    const formPayload = new FormData();
    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });
    // Append files
    files.forEach((file) => {
      formPayload.append('bankStatements', file);
    });

    try {
      await axiosInstance.post('/loan', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/general-info-form/1/Loan-Application");
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-l py-10 from-[#002F5F] to-[#0071E3] w-full min-h-[calc(100vh-72px)]">
      {loanToggler ? (
        <div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-2xl shadow-black/25 p-10 mx-auto">
          {/* Left Section - Remains Same */}
          <div className="w-1/2 pl-2 pr-7">
            <h2>
              <span className="uppercase font-bold text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#002F5F]">
                Application For Loan
              </span>
            </h2>
            <p className="font-medium text-xl mt-2.5">
              {/* Existing content */}
            </p>
          </div>

          {/* Right Form Section */}
          <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
            <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
              LOAN Application
            </h2>

            {/* Updated Form Fields with Validations */}
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
      ) : (

        <div className="max-w-[1320px] flex justify-center items-center gap-x-5 rounded-[20px] bg-white shadow-2xl shadow-black/25 p-10 mx-auto">
          {/* Left Section */}
          <div className="w-1/2 pl-2 pr-7">
            {/* Existing content */}
          </div>

          {/* Right Section */}
          <div className="w-1/2 rounded-[25px] shadow-2xl shadow-black/15 py-12 px-10 border-2 border-[#f4f4f4]">
            <h2 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
              Schedule Meeting
            </h2>
            
            <div className="flex flex-col mt-5 mb-7">
              <label>Upload Upto 3 Bank Statement (Optional)</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1"
                accept=".pdf"
              />
            </div>

            <div className="flex items-center gap-x-3">
              <button
                onClick={() => navigate("/schedule-a-meeting/1/Loan-Application")}
                className='bg-[#0071E3] py-2.5 w-1/2 rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200'
              >
                Schedule A Meeting
              </button>
              <button
                onClick={submitForm}
                className='border w-1/2 border-[#0071E3] text-[#0071E3] py-2.5 rounded-[25px] text-xl font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'
              >
                Download Analysis
                <img className='w-[22px] h-[22px]' src="downnloadbtnicon.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab5MainPage;