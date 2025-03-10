import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tab5MainPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    annualIncome: "",
    businessDuration: "",
    creditScore: "",
    existingDebts: "",
    loanPurpose: "",
    assets: "",
    defaultHistory: "",
    businessLocation: "",
    coSigners: "",
    bankStatement: null,
    meetingDate: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    // You can add validation logic here
    setStep(2);
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    // Process final submission; for example, send formData to an API
    navigate('/general-info-form/1/loanApplication')
    console.log("Final form data: ", formData);
    // Reset or show a success message if needed
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white rounded-xl shadow-gray-300/70 border-2 border-gray-300/50 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Loan Application</h2>
      {step === 1 && (
        <form onSubmit={handleSubmitStep1}>
          <div className="mb-4">
            <label htmlFor="annualIncome" className="block text-gray-700 font-medium mb-2">
              What is your current annual income?
            </label>
            <input
              type="number"
              id="annualIncome"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="businessDuration" className="block text-gray-700 font-medium mb-2">
              How long have you been in business?
            </label>
            <input
              type="text"
              id="businessDuration"
              name="businessDuration"
              placeholder="e.g., 5 years"
              value={formData.businessDuration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="creditScore" className="block text-gray-700 font-medium mb-2">
              What is your credit score?
            </label>
            <input
              type="number"
              id="creditScore"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="existingDebts" className="block text-gray-700 font-medium mb-2">
              Does your business have any existing debts or loans? <br /><span className="text-sm text-gray-500">(To understand your current financial obligations and capacity to take on more debt.)</span>
            </label>
            <select
              id="existingDebts"
              name="existingDebts"
              value={formData.existingDebts}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="loanPurpose" className="block text-gray-700 font-medium mb-2">
              What is the purpose of the loan?
            </label>
            <input
              type="text"
              id="loanPurpose"
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="assets" className="block text-gray-700 font-medium mb-2">
              Do your business own any assets (e.g., property, vehicles)?
            </label>
            <input
              type="text"
              id="assets"
              name="assets"
              placeholder="List your assets"
              value={formData.assets}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="defaultHistory" className="block text-gray-700 font-medium mb-2">
              Has your business previously defaulted on any loans or had bankruptcies?
            </label>
            <select
              id="defaultHistory"
              name="defaultHistory"
              value={formData.defaultHistory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="businessLocation" className="block text-gray-700 font-medium mb-2">
              Do you rent or own your current place of business?
            </label>
            <select
              id="businessLocation"
              name="businessLocation"
              value={formData.businessLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select an option</option>
              <option value="rent">Rent</option>
              <option value="own">Own</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="coSigners" className="block text-gray-700 font-medium mb-2">
              Do you have any co-signers or guarantors for the loan?
            </label>
            <select
              id="coSigners"
              name="coSigners"
              value={formData.coSigners}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Next
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmitStep2}>
          <div className="mb-4">
            <label htmlFor="bankStatement" className="block text-gray-700 font-medium mb-2">
              Please upload a bank statement (PDF, complete)
            </label>
            <input
              type="file"
              id="bankStatement"
              name="bankStatement"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="meetingDate" className="block text-gray-700 font-medium mb-2">
              Schedule a meeting with a local agent
            </label>
            <input
              type="datetime-local"
              id="meetingDate"
              name="meetingDate"
              value={formData.meetingDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default Tab5MainPage