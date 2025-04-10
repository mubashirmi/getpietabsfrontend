import { useState } from "react";
import ReferralFormComponent from "../components/ReferralFormComponent";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { BsQrCodeScan } from "react-icons/bs";
import CircularProgress from '@mui/material/CircularProgress';

const ReferralTab = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for showing loader
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState([
    {
      fieldName: "setup",
      heading: "Is this a Pie Pay set up?",
      description: "none",
      type: "radioOptions",
      options: ["Yes", "No"],
    },
    {
      fieldName: "agentName",
      heading: "Agent (Sales Rep) Name",
      description: "none",
      type: "text",
    },
    {
      fieldName: "traineeAgent",
      heading: "Trainee/ Spiff / Ride Along Agent",
      description: "none",
      type: "text",
    },
    {
      fieldName: "clientsDBAName",
      heading: "Clients DBA Name (Business name)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "corporateName",
      heading: "Corporate Name (Legal/ Corporate Name)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "businessAddress",
      heading: "Business Address (MUST BE COMPLETE)",
      description: "Street, City, State, Zip",
      type: "text",
    },
    {
      fieldName: "businessphoneNumber",
      heading: "Business Phone Number(s)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "personalNumber",
      heading: "Personal (Cell)",
      description: "This is required for 2FA on Clover and PAX.",
      type: "text",
    },
    {
      fieldName: "ownerEmail",
      heading: "Owner's Email Address",
      description:
        "Please double check your spelling - this is how we will send you your online ordering access link.",
      type: "text",
    },
    {
      fieldName: "businessWebsiteAddress",
      heading: "Business Website Address (if applicable)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "dateBusinessStarted",
      heading: "Date Business Started",
      description: "Date",
      type: "text",
    },
    {
      fieldName: "businessType",
      heading: "Type of Business",
      description:
        "Sole Proprietor, LLC, Corp, Govt, Non-profit, Trust, Medical and State of License ",
      type: "radioOptions",
      options: [
        "Sole Proprietor",
        "LLC",
        "Corp",
        "Govt",
        "Non Profit",
        "Trust",
        "Medical",
      ],
    },
    {
      fieldName: "federalTaxID",
      heading: " Federal Tax ID (EIN, FTID or SSN)",
      description:
        "If you are a sole proprietor, we will use your social security number to link your business to the account. Double check the number entered. Incorrect submissions may delay your online account set up.",
      type: "text",
    },
    {
      fieldName: "productServiceExplaination",
      heading: "Explanation of Product or Service",
      description: "Please describe the product or service provided.",
      type: "text",
    },
    {
      fieldName: "ownerName",
      heading: "Owner's Name (First, MI, Last)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "ownerDOB",
      heading: "Owner's Date of Birth",
      description: "Date",
      type: "text",
    },
    {
      fieldName: "ownerHomeAddress",
      heading: "Owner's Home Address",
      description: "none",
      type: "text",
    },
    {
      fieldName: "ownerSSN",
      heading: "Owner's Social Security Number",
      description:
        "Why do we need this? We need this to link your identity with the processing of funds to your bank.",
      type: "text",
    },
    {
      fieldName: "depositBankName",
      heading: "Deposit Bank Name (Name on account)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "depositBankRoutingNumber",
      heading: "Deposit Bank Routing Number and Bank Name",
      description: "none",
      type: "text",
    },
    {
      fieldName: "depositAccount",
      heading: "Deposit Account (Number)",
      description: "none",
      type: "text",
    },
    {
      fieldName: "averageMonthlyCreditValue",
      heading: "Average Monthly Credit Card Volume",
      description: "The average amount in cards swiped every month total.",
      type: "text",
    },
    {
      fieldName: "averageCreditCardTicketVolume",
      heading: "Average Credit Card Ticket Volume",
      description: "The average amount swiped on a card in a single sale.",
      type: "text",
    },
    {
      fieldName: "highestTicketVolume",
      heading: "Highest Ticket Amount",
      description: "The highest typical amount swiped during a single sale.",
      type: "text",
    },
    {
      fieldName: "cashDiscount",
      heading: "Traditional or Cash Discounting Pricing",
      description: "none",
      type: "radioOptions",
      options: ["Cash Discounting (flat rate)", "Traditional (IC+)"],
    },
    {
      fieldName: "BusinessDocuments",
      heading: "Provide Business Documents",
      description:
        "Send a voided check copy, driver's license copy, and business license copy to uw@getpiepay.com",
      type: "radioOptions",
      options: [
        "Voided Check (needed to verify your deposit info)",
        "Driver's license copy",
        "Business license copy",
        "A copy of your menu and pricing",
      ],
    },
    {
      fieldName: "sentEquipment",
      heading: "What Equipment is being sent?",
      description: "Clover unit and name or Pax unit and name. POS units require special approval. ",
      type: "text",
    },
    {
      fieldName: "monthlyPrice",
      heading: "What is the monthly price?",
      description: "Please fill in the subscription (lease price) EXACTLY. I.e. 199.99 or 49.99",
      type: "text",
    },
    {
      fieldName: "prespectiveRelatedSharingBusinessDocs",
      heading: "Did you provide all the business documents to uw@getpiepay.com",
      description:
        "Please provide the above documents: voided check, driver's license, business license, and menu or inventory to uw@getpiepay.com so we can start setting up your equipment for free! If any or all documents were not provided, please let us know how to contact you to collect the remaining information:",
      type: "text",
    },
    {
      fieldName: "specialInstructions",
      heading: "Special Instructions or Notes",
      description: "4G required? Food truck? Special shipping? Please put ANYTHING relevant here.",
      type: "text",
    },
    {
      fieldName: "specialNotes",
      heading: "Special Notes / Info to add on app",
      description:
        "Add notes or updates here that need to be written on the app itself before sending. Pricing / refunds or other legal changes must be approved by a manager. Do NOT fill anything in here unless something needs to be physically written on the document before signing. ",
      type: "text",
    },
  ]);

  // State to store the form input values
  const [formValues, setFormValues] = useState({});

  // Functions to open & close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalBackdrop') {
      closeModal();
    }
  };
  // Handler to update form values
  const handleInputChange = (fieldName, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  // Handler to submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axiosInstance.post("/referralTab", formValues);
      navigate(`/general-info-form/${response.data.id}/referral`);
      // Optionally reset the form
      setFormValues({});
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-72px)] bg-gradient-to-r from-[#0071E3] to-[#002F5F]">
      <div className="max-w-[750px] w-[99.5%] mx-auto p-4">
        <h1 className="text-[32px] text-white text-center font-bold mt-7 mb-3 uppercase">
          Online Information Checklist
        </h1>
        <p className="text-white text-xl font-medium text-center">
          Fill out the information below to request an MPA and/or lease be sent via email. ***Email
          address must be correct.**** Adobe E-apps will generate from an INFO@ email address. All
          supporting documents should be provided to uw@getpiepay.com
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 max-w-[750px] mx-auto pb-7">
        {formData.map((item, index) => (
          <ReferralFormComponent
            item={item}
            key={index}
            onInputChange={handleInputChange}
            value={formValues[item.fieldName] || ""}
          />
        ))}
        <div className="text-center mt-6 flex justify-center gap-3.5">
          <button disabled={loading} type="submit" className="border border-[#fff] text-[#fff] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out">
            {loading ? (<CircularProgress size={24} color="white" />) : (
              'Submit'
            )}
          </button>
          <button onClick={openModal} className='border border-[#fff] justify-center text-[#fff] py-2.5 px-[30px] rounded-[10px] text-xl font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-blue-500/20 hover:shadow-lg duration-300 transition-all ease-in-out'>Scan <BsQrCodeScan color="white" size={25} /></button>

        </div>
      </form>
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
                  value={`https://getpietabsfrontend.vercel.app/referralForm`}
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

export default ReferralTab;