import { useState } from "react";
import ReferralFormComponent from "../components/ReferralFormComponent";

const ReferralTab = () => {
    const [formData, setFormData] = useState([
        {
            fieldName: "setup",
            heading: "Is this a Pie Pay set up?",
            description: "none",
            type: "radioOptions",
            options: ['Yes', 'No']
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
            description: "Please double check your spelling - this is how we will send you your online ordering access link.",
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
            description: "Sole Proprietor, LLC, Corp, Govt, Non-profit, Trust, Medical and State of License ",
            type: "radioOptions",
            options: ['Sole Proprietor', 'LLC', 'Corp', 'Govt', 'Non Profit', 'Trust', 'Medical']
        },
        {
            fieldName: "federalTaxID",
            heading: " Federal Tax ID (EIN, FTID or SSN)",
            description: "If you are a sole proprietor, we will use your social security number to link your business to the account. Double check the number entered. Incorrect submissions may delay your online account set up.",
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
            description: "Why do we need this? We need this to link your identity with the processing of funds to your bank.",
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
            options: ['Cash Discounting (flat rate)', 'Traditional (IC+)']
        },
        {
            fieldName: "BusinessDocuments",
            heading: "Provide Business Documents",
            description: "Send a voided check copy, driver's license copy, and business license copy to uw@getpiepay.com",
            type: "radioOptions",
            options: ['Voided Check (needed to verify your deposit info)', "Driver's license copy", 'Business license copy', 'A copy of your menu and pricing']
        },
        {
            fieldName: "sentEquipment",
            heading: "What Equipment is being sent?",
            description: "Clover unit and name or Pax unit and name. POS units require special approval. ",
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
            description: "Please provide the above documents: voided check, driver's license, business license, and menu or inventory to uw@getpiepay.com so we can start setting up your equipment for free! If any or all documents were not provided, please let us know how to contact you to collect the remaining information:",
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
            description: "Add notes or updates here that need to be written on the app itself before sending. Pricing / refunds or other legal changes must be approved by a manager. Do NOT fill anything in here unless something needs to be physically written on the document before signing. ",
            type: "text",
        }
    ]);
    return (
        <div className='w-full min-h-[calc(100vh-72px)] bg-gradient-to-r from-[#0071E3] to-[#002F5F]'>
            <div className="max-w-[750px] w-[99.5%] mx-auto p-4">
                <h1 className="text-[32px] text-white text-center font-bold mt-7 mb-3 uppercase">Online Information Checklist</h1>
                <p className='text-white text-xl font-medium text-center'>Fill out the information below to request an MPA and/or lease be sent via email. ***Email address must be correct.**** Adobe E-apps will generate from an INFO@ email address. All supporting documents should be provided to uw@getpiepay.com</p>
            </div>
            <div className="flex flex-col gap-y-3 max-w-[750px] mx-auto pb-7">
                {
                    formData.map(( item, index )=>(
                        <ReferralFormComponent item={item} key={index}/>
                    ))  
                }
            </div>
        </div>
    )
}

export default ReferralTab
