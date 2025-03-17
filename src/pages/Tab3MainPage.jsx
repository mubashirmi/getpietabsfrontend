import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tab3MainPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: "",
    yearsInBusiness: "",
    marketingNow: "",
    effectiveMarketing: "",
    monthlyMarketingBudget: "",
    targetAudience: "",
    idealLead: "",
    customersIncrease: "",
    primaryProduct: "",
    frontBusinessPicture: null,
    businessLogo: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Validate required fields and email format
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        newErrors.email = "Please enter a valid email address";
    }
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";

    // New fields validation
    if (!formData.yearsInBusiness.trim())
      newErrors.yearsInBusiness = "Years in business is required";
    if (!formData.marketingNow.trim())
      newErrors.marketingNow = "This field is required";
    if (!formData.effectiveMarketing.trim())
      newErrors.effectiveMarketing = "Please select your most effective marketing";
    if (!formData.monthlyMarketingBudget.trim())
      newErrors.monthlyMarketingBudget = "Monthly marketing budget is required";
    if (!formData.targetAudience.trim())
      newErrors.targetAudience = "Target audience is required";
    if (!formData.idealLead.trim())
      newErrors.idealLead = "Ideal lead is required";
    if (!formData.customersIncrease.trim())
      newErrors.customersIncrease = "This field is required";
    if (!formData.primaryProduct.trim())
      newErrors.primaryProduct = "Primary product is required";
    if (!formData.frontBusinessPicture)
      newErrors.frontBusinessPicture = "Picture of front of business is required";
    if (!formData.businessLogo)
      newErrors.businessLogo = "Picture of business logo is required";

    return newErrors;
  };

  // Update formData for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Special handler for file inputs
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  // Handle form submission using FormData to handle file uploads
  const handleSubmit = async (e) => {
    navigate('/general-info-form/1/sliceOfTheMarket')
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    navigate('/general-info-form/1/sliceOfTheMarket')
    try {
      // Prepare form data payload
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      // Replace '/api/send-flyer' with your actual backend endpoint.
      const response = await fetch("/api/send-flyer", {
        method: "POST",
        body: formPayload,
      });
      if (response.ok) {
        setShowModal(true);
        // Optionally, reset form fields after successful submission.
        setFormData({
          name: "",
          email: "",
          businessName: "",
          phone: "",
          yearsInBusiness: "",
          marketingNow: "",
          effectiveMarketing: "",
          monthlyMarketingBudget: "",
          targetAudience: "",
          idealLead: "",
          customersIncrease: "",
          primaryProduct: "",
          frontBusinessPicture: null,
          businessLogo: null,
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending flyer:", error);
      alert("Error sending flyer. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F] w-full px-4 sm:px-8 pt-6 pb-10">
      <div className="max-w-[1440px] mx-auto w-[99%] flex justify-center items-center gap-8">
        <div className="w-1/2">
          <h3 className="uppercase text-[32px] font-bold text-white mb-2">Slice of the market</h3>
          <p className="text-xl font-semibold text-[#DFDFDF]">
          Join Our Local Marketing Program, Slice of the Market! Pie Pay is offering a free local marketing program that helps generate leads for your business. We will be enrolling new businesses into the program before launch. Slice of the Market is a totally free way to network in your region and generate leads directly to your business. Slice of the Market - Get your Piece!
          </p>
        </div>
        <div className="w-[50%] bg-white px-10 py-12 h-full rounded-[25px] shadow-2xl shadow-black/10">
          <h3 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
            Enter details
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData ,name:e.target.value})}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData ,email :e.target.value})}
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
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData ,businessName:e.target.value})}
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData ,phone:e.target.value})}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            {/* Year In Business Field */}
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="phone" className="text-base font-light">
              Years In Business
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.yearsInBusiness}
                onChange={(e) => setFormData({ ...formData ,yearsInBusiness:e.target.value})}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            <button type="submit" className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tab3MainPage;
