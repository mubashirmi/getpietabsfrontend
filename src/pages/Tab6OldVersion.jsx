import { useState, useRef } from "react";
import { MdMail } from "react-icons/md";
import { FaPhone, FaLocationDot, FaLinkedin } from "react-icons/fa6";
import { FaGlobe, FaBuilding, FaQuoteLeft, FaInstagramSquare, FaFacebookF } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FiUser, FiX } from "react-icons/fi";
import { RiShieldUserFill } from "react-icons/ri";
import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import StepNavigation from "../components/StepNavigation";
import Modal from "react-modal";
import html2canvas from "html2canvas";
import React from "react";
import domtoimage from 'dom-to-image';
Modal.setAppElement("#root");

const Tab6MainPage = () => {
  const [profileImage, setProfileImage] = useState({ file: null, url: "", name: "" });
  const [coverImage, setCoverImage] = useState({ file: null, url: "", name: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [modalFieldData, setModalFieldData] = useState({});
  const [fields, setFields] = useState({
    name: { value: "Full name", textColor: "#222", iconColor: "#000", bgColor: "#fff", icon: <FiUser size={25} /> },
    jobTitle: { value: "Role in company", textColor: "#444", iconColor: "#000", bgColor: "#fff", icon: <RiShieldUserFill size={25} /> },
    companyName: { value: "Company name", textColor: "#333", iconColor: "#000", bgColor: "#fff", icon: <FaBuilding size={25} /> },
    email: { value: "info@getpie.com", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <MdMail size={21} /> },
    phone: { value: "(207) 424-69934", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <FaPhone size={21} /> },
    website: { value: "https://getpie.io", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <FaGlobe size={21} /> }
  });

  const cardRef = useRef(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const profileImgRef = useRef(null);
  const coverImgRef = useRef(null);

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openFileSelector = (type) => {
    if (type === "profile") {
      profileInputRef.current.click();
    } else if (type === "cover") {
      coverInputRef.current.click();
    }
  };

  const formatFieldName = (key) => {
    if (!key) return "";
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim();
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      if (type === "profile") {
        setProfileImage({ file, url, name: file.name });
      } else if (type === "cover") {
        setCoverImage({ file, url, name: file.name });
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const openModalForField = (fieldKey) => {
    setActiveField(fieldKey);
    if (fields[fieldKey]) {
      setModalFieldData({ ...fields[fieldKey] });
    } else {
      let defaultIcon;
      switch (fieldKey) {
        case "facebook":
          defaultIcon = <BsFacebook size={25} />;
          break;
        case "linkedin":
          defaultIcon = <FaLinkedin size={25} />;
          break;
        case "instagram":
          defaultIcon = <FaInstagramSquare size={25} />;
          break;
        case "facebookPage":
          defaultIcon = <FaFacebookF size={25} />;
          break;
        default:
          defaultIcon = <FiUser size={25} />;
      }
      setModalFieldData({
        value: "",
        textColor: "#222",
        iconColor: "#000",
        bgColor: "#555",
        icon: defaultIcon,
      });
    }
    setModalOpen(true);
  };

  const handleModalFieldChange = (key, value) => {
    setModalFieldData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveField = () => {
    setFields((prev) => ({
      ...prev,
      [activeField]: { ...modalFieldData },
    }));
    setModalOpen(false);
  };

  const handleDeleteField = () => {
    if (["name", "jobTitle", "companyName", "email", "phone", "website"].includes(activeField)) {
      alert("You cannot delete a default field.");
      return;
    }
    setFields((prev) => {
      const newFields = { ...prev };
      delete newFields[activeField];
      return newFields;
    });
    setActiveField(null);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveField(null);
  };

  const handleCreateBusinessCard = async () => {
    try {
      // Get the DOM element you want to capture
      const element = cardRef.current;
      if (!element) return;
  
      // Use dom-to-image to capture the element and generate an image
      const dataUrl = await domtoimage.toPng(element);
      // Create a download link for the image
      const link = document.createElement('a');
      link.download = 'business_card.png'; // Set the name for the download file
      link.href = dataUrl; // Set the image URL
      document.body.appendChild(link); // Append the link to the DOM
      link.click(); // Trigger a click to start the download
      document.body.removeChild(link); // Clean up the DOM
  
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };
  

  const handleSubmitForm = () => {
    // Validate form fields before showing success message
    if (
      fields.name?.value &&
      fields.email?.value &&
      fields.phone?.value &&
      fields.companyName?.value
    ) {
      setShowSuccessMessage(true);
      setShowSubmissionForm(false);  // Hide the form after submission
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <div className="min-h-[100vh] w-full">
      <div className="flex w-full" style={{ maxHeight: "100vh" }}>
        {/* Business Card Output */}
        <div
          className="w-[43%] border-r-2 border-0 border-r-blue-200 p-10 flex justify-center items-center custom-scrollbar"
          style={{ maxHeight: "100vh", minHeight: "100vh", overflowY: "auto", backgroundColor: "#DBEAFE" }}
         
        >
          <div className="bg-white rounded-2xl max-w-md min-w-md shadow-lg shadow-blue-900/15"  ref={cardRef}>
            {/* Business Card Cover Photo */}
            <div className="w-full h-[14rem] relative mb-16">
              <img
                ref={coverImgRef}
                className="w-full h-full object-cover object-left rounded-tl-2xl rounded-tr-2xl"
                src={coverImage.url || "coverphotodefault.png"}
                alt="Business Cover Photo"
              />
              {/* Business Card Logo */}
              <div className="h-[6.5rem] shadow-xl shadow-blue-900/20 w-[6.5rem] border-[3px] border-gray-100 rounded-full left-7 absolute translate-y-[-50%]">
                <img
                  ref={profileImgRef}
                  crossOrigin="anonymous"
                  className="w-full h-full object-center object-cover rounded-full"
                  src={
                    profileImage.url ||
                    "https://t4.ftcdn.net/jpg/09/48/33/99/360_F_948339916_dhZpwpDeKVTcX8JWPdzUkaPVp3YQs4PX.jpg"
                  }
                  alt="Logo"
                />
              </div>
            </div>
            <div className="px-7 py-2">
              <h2
                onClick={() => openModalForField("name")}
                className="text-3xl font-semibold cursor-pointer"
                style={{ color: fields.name?.textColor || "#222" }}
              >
                {fields.name?.value || "Full name"}
              </h2>
              <h3
                onClick={() => openModalForField("jobTitle")}
                className="text-[19px] font-semibold cursor-pointer"
                style={{ color: fields.jobTitle?.textColor || "#444" }}
              >
                {fields.jobTitle?.value || "Role in company"}
              </h3>
              <h4
                onClick={() => openModalForField("companyName")}
                className="text-[22px] font-semibold cursor-pointer"
                style={{ color: fields.companyName?.textColor || "#333" }}
              >
                {fields.companyName?.value || "Company name"}
              </h4>
              <h6 className="text-lg font-medium text-[#444] mb-2">
                Brand slogan Or Quote here!
              </h6>
              {/* Social Links – same design as email/phone */}
              <div className="flex flex-col gap-3 my-4">
                <div
                  onClick={() => openModalForField("email")}
                  className="flex flex-row gap-2.5 items-center cursor-pointer"
                >
                  <div
                    className="rounded-full flex justify-center items-center"
                    style={{
                      backgroundColor: fields.email.bgColor,
                      height: "2.4rem",
                      width: "2.4rem",
                    }}
                  >
                    {React.cloneElement(fields.email.icon, {
                      color: fields.email.iconColor,
                    })}
                  </div>
                  <p className="text-lg font-medium" style={{ color: fields.email.textColor }}>
                    {fields.email.value || "info@getpie.com"}
                  </p>
                </div>
                <div
                  onClick={() => openModalForField("phone")}
                  className="flex flex-row gap-2.5 items-center cursor-pointer"
                >
                  <div
                    className="rounded-full flex justify-center items-center"
                    style={{
                      backgroundColor: fields.phone.bgColor,
                      height: "2.4rem",
                      width: "2.4rem",
                    }}
                  >
                    {React.cloneElement(fields.phone.icon, {
                      color: fields.phone.iconColor,
                    })}
                  </div>
                  <p className="text-lg font-medium" style={{ color: fields.phone.textColor }}>
                    {fields.phone.value || "(207) 424-69934"}
                  </p>
                </div>
                <div
                  onClick={() => openModalForField("website")}
                  className="flex flex-row gap-2.5 items-center cursor-pointer"
                >
                  <div
                    className="rounded-full flex justify-center items-center"
                    style={{
                      backgroundColor: fields.website.bgColor,
                      height: "2.4rem",
                      width: "2.4rem",
                    }}
                  >
                    {React.cloneElement(fields.website.icon, {
                      color: fields.website.iconColor,
                    })}
                  </div>
                  <p className="text-lg font-medium" style={{ color: fields.website.textColor }}>
                    {fields.website.value || "https://getpie.io"}
                  </p>
                </div>
                {["facebook", "linkedin", "instagram", "facebookPage"].map((key) =>
                  fields[key] ? (
                    <div
                      key={key}
                      onClick={() => openModalForField(key)}
                      className="flex flex-row gap-2.5 items-center cursor-pointer"
                    >
                      <div
                        className="rounded-full flex justify-center items-center"
                        style={{
                          backgroundColor: fields[key].bgColor,
                          height: "2.4rem",
                          width: "2.4rem",
                        }}
                      >
                        {React.cloneElement(fields[key].icon, {
                          color: fields[key].iconColor,
                        })}
                      </div>
                      <p className="text-lg font-medium" style={{ color: fields[key].textColor }}>
                        {fields[key].value || key}
                      </p>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Card Data Inputs */}
        {!showSubmissionForm && (
          <div
            className="w-[57%] px-12 py-12 custom-scrollbar"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <StepNavigation activeStep={1} />
            <h2 className="text-3xl font-medium text-[#333] mb-1 mt-10">Create your Business Card</h2>
            <p className="ml-1 text-md text-[#222]">
              Ready to design your card? Pick a field below to get started!
            </p>

            <div className="mt-6">
            <h3 className="text-2xl font-medium text-[#111]">Add Images</h3>
            <div className="flex gap-5 mt-4">
              <div
                onClick={() => openFileSelector("profile")}
                className="flex flex-col w-[20%] cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
              >
                <IoMdAdd color="#222" size={20} />
                <p>Profile Picture</p>
              </div>
              <div
                onClick={() => openFileSelector("cover")}
                className="flex flex-col w-[20%] cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
              >
                <IoMdAdd color="#222" size={20} />
                <p>Cover Photo</p>
              </div>
            </div>
            {/* Hidden file inputs */}
            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              onChange={(e) => handleImageUpload(e, "profile")}
              style={{ display: "none" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={(e) => handleImageUpload(e, "cover")}
              style={{ display: "none" }}
            />
            {/* Image previews below the respective cards */}
            <div className="mt-4 flex gap-5">
              {profileImage.url && (
                <div className="flex flex-col items-center">
                  <img
                    src={profileImage.url}
                    alt="Profile Preview"
                    className="rounded-full h-16 w-16 object-cover border"
                  />
                  <span className="mt-1 text-sm">{profileImage.name}</span>
                </div>
              )}
              {coverImage.url && (
                <div className="flex flex-col items-center">
                  <img
                    src={coverImage.url}
                    alt="Cover Preview"
                    className="rounded-full h-16 w-16 object-cover border"
                  />
                  <span className="mt-1 text-sm">{coverImage.name}</span>
                </div>
              )}
            </div>
          </div>
            {/* Add Links Section */}
            <div className="mt-7">
              <h3 className="text-2xl font-medium text-[#111]">Add your details</h3>
              <div className="mt-2">
                <h4 className="text-xl font-medium text-[#222]">Personal</h4>
                <div className="flex flex-row gap-3 mt-3 flex-wrap">
                  <div
                    onClick={() => openModalForField("name")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FiUser size={25} />
                    <p className="mt-1">Name</p>
                  </div>
                  <div
                    onClick={() => openModalForField("jobTitle")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <RiShieldUserFill size={25} />
                    <p className="mt-1">Job Title</p>
                  </div>
                  <div
                    onClick={() => openModalForField("companyName")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaBuilding size={25} />
                    <p className="mt-1">Company Name</p>
                  </div>
                  <div
                    onClick={() => openModalForField("companySlogan")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaQuoteLeft size={25} />
                    <p className="mt-1">Company Slogan</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="text-xl font-medium text-[#222]">General</h4>
                <div className="flex flex-row gap-3 mt-3 flex-wrap">
                  <div
                    onClick={() => openModalForField("email")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <GoMail size={25} />
                    <p className="mt-1">Email</p>
                  </div>
                  <div
                    onClick={() => openModalForField("phone")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaPhone size={25} />
                    <p className="mt-1">Phone</p>
                  </div>
                  <div
                    onClick={() => openModalForField("website")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaGlobe size={25} />
                    <p className="mt-1">Company URL</p>
                  </div>
                  <div
                    onClick={() => openModalForField("address")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaLocationDot size={25} />
                    <p className="mt-1">Company Address</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="text-xl font-medium text-[#222]">Social</h4>
                <div className="flex flex-row gap-3 mt-3 flex-wrap">
                  <div
                    onClick={() => openModalForField("facebook")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <BsFacebook size={25} />
                    <p className="mt-1">Facebook</p>
                  </div>
                  <div
                    onClick={() => openModalForField("linkedin")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaLinkedin size={25} />
                    <p className="mt-1">Linkedin</p>
                  </div>
                  <div
                    onClick={() => openModalForField("instagram")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaInstagramSquare size={25} />
                    <p className="mt-1">Instagram</p>
                  </div>
                  <div
                    onClick={() => openModalForField("facebookPage")}
                    className="w-[17%] flex flex-col cursor-pointer justify-center items-center py-5 hover:bg-slate-300 transition-all duration-500 border-2 border-slate-300 bg-slate-200 rounded-2xl"
                  >
                    <FaFacebookF size={25} />
                    <p className="mt-1">Facebook Page</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={handleCreateBusinessCard}
                type="button"
                className="button w-64"
              >
                <span className="fold"></span>
                <div className="points_wrapper">
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                  <i className="point"></i>
                </div>
                <span className="inner">
                  <svg
                    className="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  >
                    <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
                  </svg>
                  Create Business Card
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Business Card Submission Form */}
        {showSubmissionForm && (
          <div className="w-[57%] px-12 pt-16 pb-12 custom-scrollbar" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <StepNavigation activeStep={2} />
            <div className="mt-5">
              <h3 className="text-2xl text-[#333] font-medium mt-10 mb-1.5">
                Please enter the below details to get your business card.
              </h3>
              {/* Form Fields */}
              <div className="mb-4 flex flex-col gap-0.5">
                <label htmlFor="name" className="text-lg font-medium text-[#444]">Name</label>
                <input
                  type="text"
                  className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-1.5 px-3"
                />
              </div>
              <div className="mb-4 flex flex-col gap-0.5">
                <label htmlFor="email" className="text-lg font-medium text-[#444]">Email</label>
                <input
                  type="email"
                  className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-1.5 px-3"
                />
              </div>
              <div className="mb-4 flex flex-col gap-0.5">
                <label htmlFor="businessName" className="text-lg font-medium text-[#444]">Business Name</label>
                <input
                  type="text"
                  className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-1.5 px-3"
                />
              </div>
              <div className="mb-4 flex flex-col gap-0.5">
                <label htmlFor="phone" className="text-lg font-medium text-[#444]">Phone #</label>
                <input
                  type="tel"
                  className="text-lg border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-1.5 px-3"
                />
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={handleSubmitForm}
                  className="rounded-xl text-xl mb-0.5 mt-4 shadow-lg shadow-black/15 text-white transition-all duration-300 cursor-pointer font-medium py-2.5 px-10 bg-blue-700/80 hover:bg-blue-700"
                >
                  Submit & Receive Your Business Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Business Card Sent Successfully */}
        {showSuccessMessage && (
          <div className="w-[57%] px-12 pt-16 pb-12 custom-scrollbar" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <StepNavigation activeStep={3} />
            <h2 className="text-6xl font-semibold text-[#333] mt-12 mb-6 text-center">Congratulations</h2>
            <p className="text-center font-medium px-12 text-2xl text-[#333]">
              Your business card has been sent to your email <span className="text-blue-500">info@getpie@gmail.com</span> successfully.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Modal for editing fields */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Edit Field"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "500px",
            width: "90%",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <div className="relative">
          {/* Cross icon at top right for closing modal */}
          <div
            className="absolute top-[-10px] right-[-10px] p-3 rounded-full duration-200 transition-all ease-in-out hover:bg-slate-200 cursor-pointer"
            onClick={handleCloseModal}
          >
            <FiX size={30} />
          </div>
          <div className="mb-6 pb-2 pt-6 text-center">
            <h2 className="text-2xl font-semibold text-[#222]">
              {formatFieldName(activeField)}
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Value:</label>
              <input
                type="text"
                value={modalFieldData.value}
                onChange={(e) => handleModalFieldChange("value", e.target.value)}
                placeholder={`Enter your ${formatFieldName(activeField).toLowerCase()}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text Color:</label>
              <input
                type="color"
                value={modalFieldData.textColor}
                onChange={(e) => handleModalFieldChange("textColor", e.target.value)}
                className="mt-1 h-10 w-16 rounded-md border"
              />
            </div>
            {/* For these four fields, do not show iconColor/bgColor */}
            {!(["name", "jobTitle", "companyName", "companySlogan"].includes(activeField)) && (
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon Color:</label>
                  <input
                    type="color"
                    value={modalFieldData.iconColor}
                    onChange={(e) => handleModalFieldChange("iconColor", e.target.value)}
                    className="mt-1 h-10 w-16 rounded-md border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bg Color:</label>
                  <input
                    type="color"
                    value={modalFieldData.bgColor}
                    onChange={(e) => handleModalFieldChange("bgColor", e.target.value)}
                    className="mt-1 h-10 w-16 rounded-md border"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleSaveField}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleDeleteField}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>)
}
export default Tab6MainPage