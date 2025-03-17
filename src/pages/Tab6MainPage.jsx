import { useState, useRef } from "react";
import { MdMail } from "react-icons/md";
import { FaPhone, FaLinkedin } from "react-icons/fa6";
import { FaGlobe, FaBuilding, FaInstagramSquare, FaFacebookF } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FiUser, FiX } from "react-icons/fi";
import { RiShieldUserFill } from "react-icons/ri";
import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import Modal from "react-modal";
import React from "react";
import domtoimage from 'dom-to-image';
import { TbMailCheck, TbMailPause } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Tab6MobileVersion from "./Tab6MobileVersion";

Modal.setAppElement("#root");

const Tab6MainPage = () => {
  const [profileImage, setProfileImage] = useState({ file: null, url: "", name: "" });
  const [coverImage, setCoverImage] = useState({ file: null, url: "", name: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [modalFieldData, setModalFieldData] = useState({});
  const [fields, setFields] = useState({
    name: { value: "Full name", textColor: "#222", iconColor: "#000", bgColor: "#fff", icon: <FiUser size={25} /> },
    jobTitle: { value: "Job Title", textColor: "#444", iconColor: "#000", bgColor: "#fff", icon: <RiShieldUserFill size={25} /> },
    companyName: { value: "Company name", textColor: "#333", iconColor: "#000", bgColor: "#fff", icon: <FaBuilding size={25} /> },
    email: { value: "info@getpie.com", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <MdMail size={21} /> },
    phone: { value: "(207) 424-69934", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <FaPhone size={21} /> },
    website: { value: "https://getpie.io", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <FaGlobe size={21} /> },
    primaryEmail: { value: "info@getpiepay.com", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <TbMailCheck size={21} /> },
    seconndaryEmail: { value: "support@getpiepay.com", textColor: "#222", iconColor: "#f4f4f4", bgColor: "#555", icon: <TbMailPause size={21} /> },
  });

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const profileImgRef = useRef(null);
  const coverImgRef = useRef(null);

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
      const element = cardRef.current;
      if (!element) return;

      const dataUrl = await domtoimage.toPng(element);
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('image', blob, 'business_card.png');
      navigate('/preview-business-card/3232');
      await fetch('http://localhost:4000/api/tab6', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error capturing and sending image:', error);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-72px)] w-full max-w-[1440px] mx-auto lg:block hidden">
        <div className="flex w-full" style={{ maxHeight: "100vh" }}>
        <div className="bg-[#007AFF] opacity-95 h-[calc(100vh-72px)] w-[50vw] left-0 absolute" />

          {/* Business Card Output */}
          <div
            className="relative lg:w-[50%] lg:p-4 xl:p-10 flex justify-center items-center custom-scrollbar h-[calc(100vh-72px)]"
            style={{ overflowY: "auto", maxHeight: "100vh" }}
          >
            <div className="bg-white rounded-[10px] w-[480px] shadow-2xl shadow-blue-900/80" ref={cardRef}>
              {/* Business Card Cover Photo */}
              <div className="w-full min-h-[180px] bg-gradient-to-r from-[#0071E3] to-[#002F5F] rounded-tl-[9px] rounded-tr-[9px] rounded-br-[100px] rounded-bl-[100px] relative mb-[70px]">
                <div className="w-full flex justify-center pt-1">
                  <img src="flyerProfileLogo.png" alt="flyerProfileLogo" className="w-[216px]"/>
                </div>
                {/* Business Card Logo */}
                <div className="w-[130px] h-[130px] lg:shadow-lg xl:shadow-2xl shadow-blue-900/45 border-[1px] border-gray-100 rounded-full left-[50%] absolute bottom-0 translate-x-[-50%] translate-y-[50%]">
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
              <div>
                <h2
                  onClick={() => openModalForField("name")}
                  className="text-[25px] font-bold cursor-pointer text-center"
                  style={{ color: fields.name?.textColor || "#000" }}
                >
                  {fields.name?.value || "Full name"}
                </h2>
                <h3
                  onClick={() => openModalForField("jobTitle")}
                  className="cursor-pointer flex justify-center mt-[2px]"
                  style={{ color: fields.jobTitle?.textColor || "#000" }}
                >
                  <span className="text-[16px] text-center font-medium px-[10px] border-[1px] border-black rounded-[10px]">{fields.jobTitle?.value || "Job title"}</span>
                </h3>
                <h4
                  // onClick={() => openModalForField("companyName")}
                  className="text-[25px] font-normal text-center cursor-pointer mt-2"
                  style={{ color: fields.companyName?.textColor || "#000" }}
                >
                  {/* ({fields.companyName?.value || "PiePay"}) */}
                  (PiePay)
                </h4>
                {/* Social Links */}
                <div className="flex flex-col gap-3 mt-2.5 mb-11 mx-12">
                  <div
                    onClick={() => openModalForField("email")}
                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                  >
                    <div
                      className="rounded-full flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F]"
                      style={{
                        // backgroundColor: fields.email.bgColor,
                        height: "50px",
                        width: "50px",
                      }}
                    >
                      <div className="w-[25px] h-[25px]">
                        <img className="w-full h-full" src="mail.png" alt="Email Icon" />
                      </div>
                    </div>
                    <p className="text-base text-black font-medium" style={{ color: fields.email.textColor }}>
                      {fields.email.value || "info@getpie.com"}
                    </p>
                  </div>
                  <div
                    onClick={() => openModalForField("phone")}
                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                  >
                    <div
                      className="rounded-full flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F]"
                      style={{
                        // backgroundColor: fields.phone.bgColor,
                        height: "50px",
                        width: "50px",
                      }}
                    >
                      <div className="w-[25px] h-[25px]">
                        <img className="w-full h-full" src="phone.png" alt="Phone Icon" />
                      </div>
                    </div>
                    <p className="text-base text-black font-medium" style={{ color: fields.phone.textColor }}>
                      {fields.phone.value || "(207) 424-69934"}
                    </p>
                  </div>
                  <div
                    onClick={() => openModalForField("website")}
                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                  >
                    <div
                      className="rounded-full flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F]"
                      style={{ 
                        // backgroundColor: fields.website.bgColor, 
                        height: "50px",
                        width: "50px", }}
                    >
                      <div className="w-[25px] h-[25px]">
                        <img className="w-full h-full" src="globe.png" alt="Globe Icob" />
                      </div>
                    </div>
                    <p className="text-base text-black font-medium" style={{ color: fields.website.textColor }}>
                      {fields.website.value || "https://getpie.io"}
                    </p>
                  </div>
                  <div
                    onClick={() => openModalForField("primaryEmail")}
                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                  >
                    <div
                      className="rounded-full flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F]"
                      style={{ 
                        // backgroundColor: fields.primaryEmail.bgColor,
                        height: "50px",
                        width: "50px", }}
                    >
                      <div className="w-[25px] h-[25px]">
                        <img className="w-full h-full" src="emails.png" alt="Emails Icon" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[12px] leading-[0.99rem] font-medium" style={{ color: fields.primaryEmail.textColor }}>
                        Primary Email
                      </p>
                      <p className="text-base text-black font-medium" style={{ color: fields.primaryEmail.textColor }}>
                        {fields.primaryEmail.value || "info@getpie@gmai.com"}
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => openModalForField("seconndaryEmail")}
                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                  >
                    <div
                      className="rounded-full flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F]"
                      style={{ 
                        // backgroundColor: fields.seconndaryEmail.bgColor, 
                        height: "50px",
                        width: "50px", }}
                    >
                      <div className="w-[25px] h-[25px]">
                        <img className="w-full h-full" src="emails.png" alt="Phone Icob" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[12px] leading-[0.99rem] font-medium" style={{ color: fields.seconndaryEmail.textColor }}>
                        Secondary Email
                      </p>
                      <p className="text-base text-black font-medium" style={{ color: fields.seconndaryEmail.textColor }}>
                        {fields.seconndaryEmail.value || "info@getpiepay@gmail.com"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-medium text-[20px] text-white text-center py-2.5 rounded-bl-[9px] rounded-br-[8px] bg-gradient-to-r from-[#002F5F] to-[#0071E3]">
                  GET YOUR PIECE
                </div>
              </div>
            </div>
          </div>

          {/* Business Card Data Inputs */}
          <div
            className="lg:w-[50%] h-[calc(100vh-72px)] lg:px-6 xl:px-12 custom-scrollbar flex flex-col justify-center"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <h2 className="text-[40px] font-semibold leading-16">Create your <br /><span className="font-extrabold text-[64px] gradient-text2">Business Card</span></h2>
            <p className="ml-1 font-medium text-xl text-[#5F5F5F]">
              Ready to design your card? Pick a field below to get started!
            </p>

            <div className="lg:mt-4 xl:mt-6">
              <h3 className="text-2xl font-semibold">Add Profile Picture</h3>
              <div className="flex gap-5 mt-2.5">
                <div
                  onClick={() => openFileSelector("profile")}
                  className="flex gap-2.5 w-[49%] px-2.5 py-5 cursor-pointer justify-center items-center transition-all duration-300 border-[1px] border-[#B0C3D6] bg-[#F1F8FF] rounded-[20px]"
                >
                  <div className="w-[25px] h-[25px]"><img className="w-full h-full" src="pencil-square.png" alt="" /></div>
                  <p className="text-base text-[#5F5F5F] font-medium">Profile Picture</p>
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
              {/* Image previews */}
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
              </div>
            </div>
            {/* Add Links Section */}
            <div className="mt-2">
              <h3 className="text-2xl font-semibold">Add your details</h3>
              <div className="mt-3">
                <h4 className="text-base font-semibold">Personal</h4>
                <div className="flex flex-row gap-3 mt-2 xl:mt-3 flex-wrap">
                  <div
                    onClick={() => openModalForField("name")}
                    className="flex gap-2.5 w-[49%] px-2.5 py-5 cursor-pointer justify-center items-center transition-all duration-300 border-[1px] border-[#B0C3D6] bg-[#F1F8FF] rounded-[20px]"
                  >
                    <div className="w-[25px] h-[25px]"><img className="w-full h-full" src="pencil-square.png" alt="" /></div>
                    <p className="text-base text-[#5F5F5F] font-medium">Name</p>
                  </div>
                  <div
                    onClick={() => openModalForField("jobTitle")}
                    className="flex gap-2.5 w-[49%] px-2.5 py-5 cursor-pointer justify-center items-center transition-all duration-300 border-[1px] border-[#B0C3D6] bg-[#F1F8FF] rounded-[20px]"
                  >
                    <div className="w-[25px] h-[25px]"><img className="w-full h-full" src="pencil-square.png" alt="" /></div>

                    <p className="text-base text-[#5F5F5F] font-medium">Job Title</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 xl:mt-5">
                <h4 className="text-base font-semibold">General</h4>
                <div className="flex flex-row gap-3 mt-2 xl:mt-3 flex-wrap">
                  <div
                    onClick={() => openModalForField("email")}
                    className="flex gap-2.5 w-[49%] px-2.5 py-5 cursor-pointer justify-center items-center transition-all duration-300 border-[1px] border-[#B0C3D6] bg-[#F1F8FF] rounded-[20px]"
                  >
                    <div className="w-[25px] h-[25px]"><img className="w-full h-full" src="pencil-square.png" alt="" /></div>
                    <p className="text-base text-[#5F5F5F] font-medium">Email</p>
                  </div>
                  <div
                    onClick={() => openModalForField("phone")}
                    className="flex gap-2.5 w-[49%] px-2.5 py-5 cursor-pointer justify-center items-center transition-all duration-300 border-[1px] border-[#B0C3D6] bg-[#F1F8FF] rounded-[20px]"
                  >
                    <div className="w-[25px] h-[25px]"><img className="w-full h-full" src="pencil-square.png" alt="" /></div>
                    <p className="text-base text-[#5F5F5F] font-medium">Phone</p>
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
            <div
              className="absolute top-[-30px] right-[-30px] p-3 rounded-full duration-200 transition-all ease-in-out hover:bg-slate-200 cursor-pointer"
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
                {activeField === "jobTitle" ? (
                  <select
                    value={modalFieldData.value}
                    onChange={(e) => handleModalFieldChange("value", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 bg-white"
                  >
                    <option value="Accountant">Accounts Executive </option>
                    <option value="Manager">Accounts Manager</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={modalFieldData.value}
                    onChange={(e) => handleModalFieldChange("value", e.target.value)}
                    placeholder={`Enter your ${formatFieldName(activeField).toLowerCase()}`}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  />
                )}
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Text Color:</label>
                <input
                  type="color"
                  value={modalFieldData.textColor}
                  onChange={(e) => handleModalFieldChange("textColor", e.target.value)}
                  className="mt-1 h-10 w-16 rounded-md border"
                />
              </div> */}
              {/* {!(["name", "jobTitle", "companyName", "companySlogan"].includes(activeField)) && (
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
              )} */}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                onClick={handleSaveField}
                className="bg-[#0071E3] py-2.5 px-[30px] rounded-[25px] text-xl font-medium text-white cursor-pointer hover:bg-blue-600/90 transition-all hover:shadow-blue-500/30 hover:shadow-lg ease-in-out duration-200"
              >
                Save
              </button>
              <button
                onClick={handleDeleteField}
                className="bg-red-700 py-2.5 px-[30px] rounded-[25px] text-xl font-medium text-white cursor-pointer transition-all hover:shadow-blue-800/30 hover:shadow-lg ease-in-out duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="lg:hidden">
        <Tab6MobileVersion />
      </div>
    </>
  );
};

export default Tab6MainPage;