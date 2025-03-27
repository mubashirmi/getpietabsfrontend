import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // Assuming axiosInstance is in the api folder

const Tab4MainPage = () => {
  const navigate = useNavigate();

  // State for form fields (each yes/no question stored as a string "yes" or "no")
  const [formData, setFormData] = useState({
    refundPolicy: '',
    refundPolicyYes: '',
    trackRecords: '',
    trackRecordsYes: '',
    verifyAuthenticity: '',
    verifyAuthenticityYes: '',
    recognizableNameYes: '',
    fraudDetection: '',
    fraudDetectionYes: '',
    complaintsProcess: '',
    complaintsProcessYes: '',
    trackingInfoYes: '',
    customerSupport: '',
    customerSupportYes: '',
    paymentProcessorYes: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // State for showing loader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled
    const isFormValid = Object.values(formData).every(value => value !== '');
    if (!isFormValid) {
      alert('Please fill in all questions');
      return;
    }

    setLoading(true); // Show loader

    // Prepare data in the required format
    const payload = {
      question1: [{
        question: 'Refund, Return, and Shipping Policies',
        answer: formData.refundPolicy,
        booleanAnswer: formData.refundPolicyYes
      }],
      question2: [{
        question: 'Tracking and Maintaining Records of Transactions',
        answer: formData.trackRecords,
        booleanAnswer: formData.trackRecordsYes
      }],
      question3: [{
        question: 'Verification of Customer Transactions',
        answer: formData.verifyAuthenticity,
        booleanAnswer: formData.verifyAuthenticityYes
      }],
      question4: [{
        question: 'Recognizable Business Name on Credit Card Statements',
        answer: '',
        booleanAnswer: formData.recognizableNameYes
      }],
      question5: [{
        question: 'Identification of Fraudulent or Suspicious Transactions',
        answer: formData.fraudDetection,
        booleanAnswer: formData.fraudDetectionYes
      }],
      question6: [{
        question: 'Handling Customer Complaints or Disputes',
        answer: formData.complaintsProcess,
        booleanAnswer: formData.complaintsProcessYes
      }],
      question7: [{
        question: 'Tracking Information and Delivery Confirmations',
        answer: '',
        booleanAnswer: formData.trackingInfoYes
      }],
      question8: [{
        question: 'Accessibility of Customer Support',
        answer: formData.customerSupport,
        booleanAnswer: formData.customerSupportYes
      }],
      question9: [{
        question: 'Payment Processor and Fraud Protection Tools',
        answer: '',
        booleanAnswer: formData.paymentProcessorYes
      }]
    };

    try {
      // Send data to the backend
      await axiosInstance.post('/submit-chargeback-risk', payload);
      navigate('/general-info-form/1/chargebackRiskAssesment');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the data.');
    } finally {
      setLoading(false); // Hide loader after the submission
    }
  };
  
  return (
    <div className='w-full min-h-[calc(100vh-72px)] bg-gradient-to-r from-[#0071E3] to-[#002F5F]'>
    <div className="max-w-[750px] w-[99.5%] mx-auto p-4">
      <h1 className="text-[32px] text-white text-center font-bold mt-7 mb-3 uppercase">Chargeback Risk Assessment</h1>
      <p className='text-white text-xl font-medium'>Lorem ipsum morbi nisl nisi mauris mattis egestas non est convallis in fames pretium vitae cursus vestibulum urna volutpat suspendisse.</p>
      <form onSubmit={handleSubmit}>
        {/* 1. Refund, Return, and Shipping Policies */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">1. Refund, Return, and Shipping Policies</h2>
          <p className="text-sm font-light">Are these clearly stated and easily accessible to customers? Do you have full policies in place posted where customers can access them?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="refundPolicyYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="refundPolicyYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
          <textarea
            name="refundPolicy"
            placeholder="Describe your policies"
            className="mt-4 w-full p-2.5 border-[1px] border-[#333] rounded-[10px] resize-none text-[#333]"
            rows="3"
            value={formData.refundPolicy}
            onChange={handleChange}
          />
        </div>

        {/* 2. Tracking and Maintaining Records of Transactions */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">2. Tracking and Maintaining Records of Transactions</h2>
          <p className="text-sm font-light">Do you keep detailed documentation, including order details, communications, and proof of delivery?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="trackRecordsYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="trackRecordsYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
          <textarea
            name="trackRecords"
            placeholder="Describe your record keeping process"
            className="mt-4 w-full p-2.5 border-[1px] border-[#333] rounded-[10px] resize-none text-[#333]"
            rows="3"
            value={formData.trackRecords}
            onChange={handleChange}
          />
        </div>

        {/* 3. Verification of Customer Transactions */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">3. Verification of Customer Transactions</h2>
          <p className="text-sm font-light">Do you utilize tools like address verification, CVV codes, or 3D Secure for online payments?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="verifyAuthenticityYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="verifyAuthenticityYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
          <textarea
            name="verifyAuthenticity"
            placeholder="Describe the methods used"
            className="mt-4 w-full p-2.5 border-[1px] border-[#333] rounded-[10px] resize-none text-[#333]"
            value={formData.verifyAuthenticity}
            onChange={handleChange}
          />
        </div>

        {/* 4. Recognizable Business Name on Credit Card Statements */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">4. Recognizable Business Name on Credit Card Statements</h2>
          <p className="text-sm font-light">Does your billing descriptor match what customers will expect to see on their credit card statements?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="recognizableNameYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="recognizableNameYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
        </div>

        {/* 5. Identification of Fraudulent or Suspicious Transactions */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">5. Identification of Fraudulent or Suspicious Transactions</h2>
          <p className="text-sm font-light">Do you have automated systems or manual checks in place to flag high-risk orders?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="fraudDetectionYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="fraudDetectionYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
          <textarea
            name="fraudDetection"
            placeholder="Describe how you identify suspicious transactions (optional)"
            className="mt-4 w-full p-2.5 border-[1px] border-[#333] rounded-[10px] resize-none text-[#333]"
            rows="3"
            value={formData.fraudDetection}
            onChange={handleChange}
          />
        </div>

        {/* 6. Handling Customer Complaints or Disputes */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">6. Handling Customer Complaints or Disputes</h2>
          <p className="text-sm font-light">Do you offer prompt resolutions, such as refunds or exchanges, before issues escalate into chargebacks?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="complaintsProcessYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="complaintsProcessYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
          <textarea
            name="complaintsProcess"
            placeholder="Describe your process"
            className="mt-4 w-full p-2.5 border-[1px] border-[#333] rounded-[10px] resize-none text-[#333]"
            rows="3"
            value={formData.complaintsProcess}
            onChange={handleChange}
          />
        </div>

        {/* 7. Tracking Information and Delivery Confirmations */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">7. Tracking Information and Delivery Confirmations</h2>
          <p className="text-sm font-light">Is the customer sent tracking numbers, and can you provide proof of delivery in case of disputes?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="trackingInfoYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="trackingInfoYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
        </div>

        {/* 8. Accessibility of Customer Support */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">8. Accessibility of Customer Support</h2>
          <p className="text-sm font-light">Can customers easily reach you through phone, email, or live chat if they have concerns about their order?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="customerSupportYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="customerSupportYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
          <textarea
            name="customerSupport"
            placeholder="Describe your customer support availability"
            className="mt-4 w-full p-2.5 border-[1px] border-[#333] rounded-[10px] resize-none text-[#333]"
            rows="3"
            value={formData.customerSupport}
            onChange={handleChange}
          />
        </div>

        {/* 9. Payment Processor and Fraud Protection Tools */}
        <div className="bg-white p-5 rounded-[10px] shadow-md my-4">
          <h2 className="text-xl font-medium">9. Payment Processor and Fraud Protection Tools</h2>
          <p className="text-sm font-light">Are you using services that help detect and prevent fraudulent transactions and assist in handling disputes?</p>
          <div className="flex mt-4">
            <label className="inline-flex items-center mr-6">
              <input type="radio" name="paymentProcessorYes" value="yes" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="paymentProcessorYes" value="no" className="form-radio w-[18px] h-[18px]" onChange={handleChange} />
              <span className="ml-[6px] text-sm font-light">No</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium">
              {loading ? (
                <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div>
              ) : (
                'Submit Assessment'
              )}
            </button>
          </div>
      </form>

      {result && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-2xl font-semibold mb-4">Analysis Result</h3>
          <p className="text-xl font-medium">{result.analysisTitle} ({result.yesCount} Yes answer{result.yesCount !== 1 ? 's' : ''})</p>
          <p className="mt-4">{result.analysisMessage}</p>
          <div className="mt-8">
            <h4 className="font-semibold text-lg">In the meantime:</h4>
            <ul className="list-disc pl-6">
              <li>Use Clear and Transparent Policies</li>
              <li>Maintain Detailed Transaction Records</li>
              <li>Implement Address Verification Systems (AVS)</li>
              <li>Require Strong Authentication Methods</li>
              <li>Use a Clear and Recognizable Billing Descriptor</li>
              <li>Monitor and Flag Suspicious Transactions</li>
              <li>Respond Promptly to Customer Complaints</li>
              <li>Send Tracking Information and Delivery Confirmations</li>
              <li>Work with Your Payment Processor</li>
              <li>Offer Customer Support Accessibility</li>
            </ul>
            <p className="text-gray-600 mt-4">By taking these precautions, you can reduce the likelihood of chargebacks and protect your business from unnecessary financial losses.</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Tab4MainPage;
