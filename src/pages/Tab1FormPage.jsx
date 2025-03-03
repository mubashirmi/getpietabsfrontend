import React, { useState } from "react";
import { BiListUl } from "react-icons/bi";

const Tab1FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

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
    return newErrors;
  };

  // Update formData as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
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
      // Replace '/api/send-flyer' with your actual backend endpoint.
      const response = await fetch("/api/send-flyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmittedEmail(formData.email);
        setShowModal(true);
        // Optionally, reset form fields after successful submission.
        setFormData({ name: "", email: "", businessName: "", phone: "" });
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
    <div className="min-h-screen flex justify-center items-center bg-blue-200 w-full px-4 sm:px-8">
      <div className=" max-w-2xl border-blue-400/60 border-2 bg-slate-50 rounded-4xl relative shadow-xl pt-16 pb-9 px-3 sm:px-6 md:px-10 shadow-black/15">
        <div className="absolute top-0 translate-y-[-50%] border-2 shadow-lg shadow-blue-100/70 border-blue-200 left-[50%] bg-blue-100/100 translate-x-[-50%] w-[6rem] h-[6rem] rounded-full flex justify-center items-center">
          <BiListUl size={55} color="#222" />
        </div>
        <h3 className="text-xl text-[#333] font-medium text-center my-3">
          Please enter the below details to get your Flyer
        </h3>
        <form onSubmit={handleSubmit}>
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">
              Congratulations your flyer has been sent on your email{" "}
              <strong>{submittedEmail}</strong> successfully
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab1FormPage;
