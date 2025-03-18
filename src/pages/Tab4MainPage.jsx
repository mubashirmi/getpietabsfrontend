import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/general-info-form/1/chargebackRiskAssesment');
    
    // Count yes responses from all yes/no toggle fields
    const yesKeys = [
      'refundPolicyYes',
      'trackRecordsYes',
      'verifyAuthenticityYes',
      'recognizableNameYes',
      'fraudDetectionYes',
      'complaintsProcessYes',
      'trackingInfoYes',
      'customerSupportYes',
      'paymentProcessorYes'
    ];
    let yesCount = 0;
    yesKeys.forEach(key => {
      if (formData[key] === 'yes') {
        yesCount++;
      }
    });

    let analysisTitle = '';
    let analysisMessage = '';

    if (yesCount >= 8) {
      analysisTitle = 'Low Risk of Chargebacks';
      analysisMessage =
        'Your business and policies are well protected. There’s always more you could be doing and Pie Pay can help you stay as safe as possible. Schedule a meeting with us to learn more.';
    } else if (yesCount >= 5 && yesCount <= 7) {
      analysisTitle = 'Some Risk of Chargebacks';
      analysisMessage =
        'Your business carries some risk of chargebacks and needs updates to its policies and processor protections. Schedule a meeting with us to learn more.';
    } else if (yesCount >= 3 && yesCount <= 4) {
      analysisTitle = 'Moderate risk of chargebacks';
      analysisMessage =
        'Your business has a moderate to high risk of chargebacks and needs immediate updates to its policies, procedures and processor. Schedule a meeting with us to learn more.';
    } else {
      analysisTitle = 'High Risk of chargebacks';
      analysisMessage =
        'Your business has a very high risk of chargebacks and is open to fraud from customers. You need an immediate assessment of your policies and procedures to protect your business processing from chargeback fraud. Schedule a meeting with us to learn more.';
    }

    setResult({
      yesCount,
      analysisTitle,
      analysisMessage
    });
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

        <div className="text-center mt-6">
          <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium">Submit Assessment</button>
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
