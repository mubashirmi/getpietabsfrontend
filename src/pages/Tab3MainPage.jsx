import { useState } from "react";
import { BiListUl } from "react-icons/bi";

const Tab3MainPage = () => {
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
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-200 w-full px-4 sm:px-8 pt-6 pb-10">
        <h2 className="text-2xl text-[#333] font-medium my-3 w-[70%] text-justify mb-16">Join Our Local Marketing Program, Slice of the Market! Pie Pay is offering a free local marketing program that helps generate leads for your business. We will be enrolling new businesses into the program before launch. Slice of the Market is a totally free way to network in your region and generate leads directly to your business. Slice of the Market - Get your Piece!</h2>
      <div className="max-w-4xl border-blue-400/60 border-2 bg-slate-50 rounded-4xl relative shadow-xl pt-16 pb-9 px-3 sm:px-6 md:px-10 shadow-black/15">
        <div className="absolute top-0 translate-y-[-50%] border-2 shadow-lg shadow-blue-100/70 border-blue-300/60 left-[50%] bg-blue-100/100 translate-x-[-50%] w-[6rem] h-[6rem] rounded-full flex justify-center items-center">
          <BiListUl size={55} color="#222" />
        </div>
        <h3 className="text-xl text-[#333] font-medium text-center my-3">
          Please enter the below details to get your Flyer
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Existing Fields */}
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="name" className="text-lg font-medium text-[#444]">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="email" className="text-lg font-medium text-[#444]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label
              htmlFor="businessName"
              className="text-lg font-medium text-[#444]"
            >
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.businessName && (
              <span className="text-red-500 text-sm">
                {errors.businessName}
              </span>
            )}
          </div>
          <div className="mb-3 flex flex-col gap-0.5">
            <label htmlFor="phone" className="text-lg font-medium text-[#444]">
              Phone #
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>
          {/* New Fields */}
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="yearsInBusiness" className="text-lg font-medium text-[#444]">
              Years in business:
            </label>
            <input
              type="text"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.yearsInBusiness && (
              <span className="text-red-500 text-sm">{errors.yearsInBusiness}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="marketingNow" className="text-lg font-medium text-[#444]">
              How are you marketing now?
            </label>
            <input
              type="text"
              name="marketingNow"
              value={formData.marketingNow}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.marketingNow && (
              <span className="text-red-500 text-sm">{errors.marketingNow}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="effectiveMarketing" className="text-lg font-medium text-[#444]">
              What types of marketing do you find most effective?
            </label>
            <select
              name="effectiveMarketing"
              value={formData.effectiveMarketing}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            >
              <option value="">Select an option</option>
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Other">Other</option>
            </select>
            {errors.effectiveMarketing && (
              <span className="text-red-500 text-sm">{errors.effectiveMarketing}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="monthlyMarketingBudget" className="text-lg font-medium text-[#444]">
              What is your monthly marketing budget?
            </label>
            <input
              type="text"
              name="monthlyMarketingBudget"
              value={formData.monthlyMarketingBudget}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
              placeholder="$"
            />
            {errors.monthlyMarketingBudget && (
              <span className="text-red-500 text-sm">{errors.monthlyMarketingBudget}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="targetAudience" className="text-lg font-medium text-[#444]">
              Who is your target audience?
            </label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.targetAudience && (
              <span className="text-red-500 text-sm">{errors.targetAudience}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="idealLead" className="text-lg font-medium text-[#444]">
              What is the ideal lead for you (i.e. customer type)?
            </label>
            <input
              type="text"
              name="idealLead"
              value={formData.idealLead}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.idealLead && (
              <span className="text-red-500 text-sm">{errors.idealLead}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="customersIncrease" className="text-lg font-medium text-[#444]">
              How many customers would you hope to increase per month from marketing?
            </label>
            <input
              type="text"
              name="customersIncrease"
              value={formData.customersIncrease}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.customersIncrease && (
              <span className="text-red-500 text-sm">{errors.customersIncrease}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="primaryProduct" className="text-lg font-medium text-[#444]">
              What is your primary product?
            </label>
            <input
              type="text"
              name="primaryProduct"
              value={formData.primaryProduct}
              onChange={handleChange}
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.primaryProduct && (
              <span className="text-red-500 text-sm">{errors.primaryProduct}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="frontBusinessPicture" className="text-lg font-medium text-[#444]">
              Picture of front of business:
            </label>
            <input
              type="file"
              name="frontBusinessPicture"
              onChange={handleFileChange}
              accept="image/*"
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.frontBusinessPicture && (
              <span className="text-red-500 text-sm">{errors.frontBusinessPicture}</span>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-0.5">
            <label htmlFor="businessLogo" className="text-lg font-medium text-[#444]">
              Picture of business logo:
            </label>
            <input
              type="file"
              name="businessLogo"
              onChange={handleFileChange}
              accept="image/*"
              className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
            />
            {errors.businessLogo && (
              <span className="text-red-500 text-sm">{errors.businessLogo}</span>
            )}
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="rounded-lg sm:rounded-xl text-base sm:text-xl mb-0.5 mt-4 shadow-lg shadow-black/15 text-white transition-all duration-300 cursor-pointer font-medium py-1.5 sm:py-2.5 px-4 sm:px-7 bg-blue-700/80 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Submit & Get Your Flyer"}
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold">
              THANK YOU FOR ENROLLING IN OUR FREE LOCAL MARKETING PROGRAM
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
            >
              Schedule a Meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab3MainPage;
