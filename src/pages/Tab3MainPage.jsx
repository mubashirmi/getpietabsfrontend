import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tab3MainPage = () => {
  const navigate = useNavigate();

  // Initial form data state split by steps
  const [step, setStep] = useState(1); // Step 1, Step 2, Step 3
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    email: "",
    businessName: "",
    phone: "",
    yearsInBusiness: "",
    // Step 2
    marketingNow: "",
    effectiveMarketing: "",
    monthlyMarketingBudget: "",
    targetAudience: "",
    idealLead: "",
    customersIncrease: "",
    primaryProduct: "",
    // Step 3
    frontBusinessPicture: null,
    businessLogo: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validate fields based on step
  const validate = () => {
    const newErrors = {};
    if (step === 1) {
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
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.yearsInBusiness.trim())
        newErrors.yearsInBusiness = "Years in business is required";
    } else if (step === 2) {
      if (!formData.marketingNow.trim()) newErrors.marketingNow = "This field is required";
      if (!formData.effectiveMarketing.trim())
        newErrors.effectiveMarketing = "Please select your most effective marketing";
      if (!formData.monthlyMarketingBudget.trim())
        newErrors.monthlyMarketingBudget = "Monthly marketing budget is required";
      if (!formData.targetAudience.trim())
        newErrors.targetAudience = "Target audience is required";
      if (!formData.idealLead.trim()) newErrors.idealLead = "Ideal lead is required";
      if (!formData.customersIncrease.trim())
        newErrors.customersIncrease = "This field is required";
      if (!formData.primaryProduct.trim())
        newErrors.primaryProduct = "Primary product is required";
    } else if (step === 3) {
      if (!formData.frontBusinessPicture)
        newErrors.frontBusinessPicture = "Picture of front of business is required";
      if (!formData.businessLogo)
        newErrors.businessLogo = "Picture of business logo is required";
    }

    return newErrors;
  };

  // Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  // Handle form submission for all steps
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    if (step === 3) {
      try {
        const formPayload = new FormData();
        for (const key in formData) {
          formPayload.append(key, formData[key]);
        }

        const response = await fetch("/api/send-flyer", {
          method: "POST",
          body: formPayload,
        });

        if (response.ok) {
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
          navigate("/general-info-form/1/sliceOfTheMarket");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error sending flyer:", error);
        alert("Error sending flyer. Please try again.");
      }
    } else {
      setStep(step + 1);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F] w-full px-4 sm:px-8 pt-6 pb-10">
      <div className="max-w-[1440px] mx-auto w-[99%] flex justify-center items-center gap-8">
        <div className="w-1/2">
          <h3 className="uppercase text-[32px] font-bold text-white mb-2">
            Slice of the market
          </h3>
          <p className="text-xl font-semibold text-[#DFDFDF]">
          Join Our Local Marketing Program, Slice of the Market! Pie Pay is offering a free local marketing program that helps generate leads for your business. We will be enrolling new businesses into the program before launch. Slice of the Market is a totally free way to network in your region and generate leads directly to your business. Slice of the Market - Get your Piece!
          </p>
        </div>
        <div className="w-[50%] bg-white px-10 py-12 h-full rounded-[25px] shadow-2xl shadow-black/10">
          <h3 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
            Enter details
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Step 1 fields */}
            {step === 1 && (
              <>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="name" className="text-base font-light">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="email" className="text-base font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="businessName" className="text-base font-light">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="phone" className="text-base font-light">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="yearsInBusiness" className="text-base font-light">
                    Years In Business
                  </label>
                  <input
                    type="tel"
                    id="yearsInBusiness"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
              </>
            )}

            {/* Step 2 fields */}
            {step === 2 && (
              <>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="marketingNow" className="text-base font-light">
                  How are you marketing now?
                  </label>
                  <input
                    type="text"
                    id="marketingNow"
                    name="marketingNow"
                    value={formData.marketingNow}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="effectiveMarketing" className="text-base font-light">
                  What types of marketing do you find most effective?
                  </label>
                  <input
                    type="text"
                    id="effectiveMarketing"
                    name="effectiveMarketing"
                    value={formData.effectiveMarketing}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="monthlyMarketingBudget" className="text-base font-light">
                  What is your monthly marketing budget?
                  </label>
                  <input
                    type="text"
                    id="monthlyMarketingBudget"
                    name="monthlyMarketingBudget"
                    value={formData.monthlyMarketingBudget}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="targetAudience" className="text-base font-light">
                  Who is your target audience?
                  </label>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="idealLead" className="text-base font-light">
                  What is the ideal lead for you (i.e. customer type)?
                  </label>
                  <input
                    type="text"
                    id="idealLead"
                    name="idealLead"
                    value={formData.idealLead}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="customersIncrease" className="text-base font-light">
                  How many customers would you hope to increase per month from marketing?
                  </label>
                  <input
                    type="text"
                    id="customersIncrease"
                    name="customersIncrease"
                    value={formData.customersIncrease}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="primaryProduct" className="text-base font-light">
                  What is your primary product?
                  </label>
                  <input
                    type="text"
                    id="primaryProduct"
                    name="primaryProduct"
                    value={formData.primaryProduct}
                    onChange={handleChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
              </>
            )}

            {/* Step 3 fields */}
            {step === 3 && (
              <>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="frontBusinessPicture" className="text-base font-light">
                    Front Business Picture
                  </label>
                  <input
                    type="file"
                    id="frontBusinessPicture"
                    name="frontBusinessPicture"
                    onChange={handleFileChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="businessLogo" className="text-base font-light">
                    Business Logo
                  </label>
                  <input
                    type="file"
                    id="businessLogo"
                    name="businessLogo"
                    onChange={handleFileChange}
                    className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                  />
                </div>
              </>
            )}

            {/* Submit or Next Button */}
            <button type="submit" className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl">
              {step === 3 ? "Submit" : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tab3MainPage;
