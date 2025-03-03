import { useRef, useState } from "react";
import { BiListUl } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import domtoimage from 'dom-to-image';
import { TbMailCheck, TbMailPause } from "react-icons/tb";
// import { MdMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
// import { IoMdAdd } from "react-icons/io";
// import { FiUser, FiX } from "react-icons/fi";
import { RiShieldUserFill } from "react-icons/ri";
import { GoMail } from "react-icons/go";
// import { BsFacebook } from "react-icons/bs";

const Tab6MobileVersion = () => {
    const navigate = useNavigate();
    const cardRef = useRef(null);
    // const profileInputRef = useRef(null);
    // const coverInputRef = useRef(null);
    const profileImgRef = useRef(null);
    const coverImgRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        profileImage: "", // Added profile image field
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false); // Track if preview is visible

    // Validate required fields and email format
    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email))
                newErrors.email = "Please enter a valid email address";
        }
        if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        // if (!formData.coverPhoto) newErrors.coverPhoto = "Cover photo is required";
        if (!formData.profileImage) newErrors.profileImage = "Profile image is required"; // Validate profile image
        return newErrors;
    };

    // Update formData as user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, coverPhoto: e.target.files[0] });
    };

    const handleProfileImageChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] }); // Update profile image
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
        setIsPreviewVisible(true); // Show preview on submit
    };

    // Handle business card creation (capture and send image)
    const handleCreateBusinessCard = async () => {
        try {
            const element = cardRef.current;
            if (!element) return;

            const dataUrl = await domtoimage.toPng(element);
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append('image', blob, 'business_card.png');
            navigate(`/businesscardform/89787980`); // navigate test

            await fetch('http://localhost:4000/api/tab6', {
                method: 'POST',
                body: formData,
            });

            navigate(`/businesscardform/89787980`);
        } catch (error) {
            console.error('Error capturing and sending image:', error);
        }
    };

    return (
        <div className="min-h-[100vh] flex justify-center items-center bg-blue-200 w-full">
            {/* Form Section */}
            {!isPreviewVisible && (
                <div className="min-w-full md:min-w-[30rem] mt-[65px] mb-9 border-blue-400/60 border-2 bg-slate-50 rounded-4xl relative shadow-xl pt-16 pb-9 px-10 shadow-black/15">
                    <div className="absolute top-0 translate-y-[-50%] border-2 shadow-lg shadow-blue-100/70 border-blue-200 left-[50%] bg-blue-100/100 translate-x-[-50%] w-[6rem] h-[6rem] rounded-full flex justify-center items-center">
                        <BiListUl size={55} color="#222" />
                    </div>
                    <h3 className="text-xl text-[#333] font-medium text-center my-3">
                        Please enter the below details to create your Business Card
                    </h3>
                    <form onSubmit={handleSubmit}>
                        {/* Profile Image */}
                        <div className="mb-4 flex flex-col gap-0.5">
                            <label htmlFor="profileImage" className="text-lg font-medium text-[#444]">
                                Profile Image
                            </label>
                            <input
                                type="file"
                                name="profileImage"
                                onChange={handleProfileImageChange}
                                className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
                            />
                            {errors.profileImage && <span className="text-red-500 text-sm">{errors.profileImage}</span>}
                        </div>
                        {/* Full Name */}
                        <div className="mb-4 flex flex-col gap-0.5">
                            <label htmlFor="fullName" className="text-lg font-medium text-[#444]">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
                            />
                            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
                        </div>

                        {/* Job Title Dropdown */}
                        <div className="mb-4 flex flex-col gap-0.5">
                            <label htmlFor="jobTitle" className="text-lg font-medium text-[#444]">
                                Job Title
                            </label>
                            <select
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                className="text-[17px] border-2 font-medium border-slate-400 text-[#333] outline-none rounded-lg py-2 px-2.5"
                            >
                                <option value="">Select Job Title</option>
                                <option value="Accountant">Accounts Executive</option>
                                <option value="Management">Accounts Manager</option>
                            </select>
                            {errors.jobTitle && <span className="text-red-500 text-sm">{errors.jobTitle}</span>}
                        </div>

                        {/* Email */}
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
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        {/* Phone */}
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
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                        </div>

                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="rounded-xl text-xl mb-0.5 mt-4 shadow-lg shadow-black/15 text-white transition-all duration-300 cursor-pointer font-medium py-2.5 px-7 bg-blue-700/80 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Submit & Create Your Card"}
                            </button>
                        </div>
                    </form>
                </div>
            )}


            {/* Business Card Preview */}
            {isPreviewVisible && (
                <div
                    className="w-full pt-28 pb-7 px-3 flex flex-col justify-center items-center custom-scrollbar"
                    style={{ maxHeight: "100vh", minHeight: "100vh", overflowY: "auto" }}
                >
                    <div className="bg-white rounded-2xl max-w-[400px] shadow-lg shadow-blue-900/15" ref={cardRef}>
                        {/* Business Card Cover Photo */}
                        <div className="w-full h-[10rem] sm:h-[11rem] md:h-[12rem] lg:h-[10rem] xl:h-[12rem] 2xl:h-[14rem] relative mb-11 xl:mb-12 2xl:mb-16">
                            <img
                                ref={coverImgRef}
                                className="w-full h-full object-cover object-left rounded-tl-2xl rounded-tr-2xl"
                                src="coverphotodefault.png"
                                alt="Business Cover Photo"
                            />
                            {/* Business Card Logo */}
                            <div className="w-[4.8em] h-[4.8rem] sm:w-[5em] sm:h-[5rem] md:w-[5.8rem] md:h-[5.8rem] lg:w-[5.3rem] xl:w-[5.7rem] 2xl:w-[6.5rem] lg:h-[5.3rem] xl:h-[5.7rem] 2xl:h-[6.5rem] lg:shadow-lg xl:shadow-xl shadow-blue-900/20 border-[3px] border-gray-100 rounded-full left-5 xl:left-7 absolute translate-y-[-50%]">
                                <img
                                    ref={profileImgRef}
                                    crossOrigin="anonymous"
                                    className="w-full h-full object-center object-cover rounded-full"
                                    src={URL.createObjectURL(formData.profileImage) ||
                                        "https://t4.ftcdn.net/jpg/09/48/33/99/360_F_948339916_dhZpwpDeKVTcX8JWPdzUkaPVp3YQs4PX.jpg"
                                    }
                                    alt="Logo"
                                />
                            </div>
                        </div>
                        <div className=" px-2 pt-1 sm:px-4 sm:pt-3 pb-1.5">
                            <h2
                                // onClick={() => openModalForField("name")}
                                className="text-2xl font-semibold cursor-pointer text-[#222]"
                            >
                                {formData.fullName}
                            </h2>
                            <h3
                                // onClick={() => openModalForField("jobTitle")}
                                className="text-[16px] md:text-[18px] font-semibold cursor-pointer text-[#333]"
                            >
                                {formData.jobTitle}
                            </h3>
                            <h4 className="text-[17px] md:text-[18px] font-semibold cursor-pointer" >PiePay</h4>
                            <h6 className="text-[15px] md:text-[16px] font-medium text-[#333] mb-2">Get your piece</h6>
                            {/* Social Links – same design as email/phone */}
                            <div className="flex flex-col gap-3 my-4">
                                <div
                                    //   onClick={() => openModalForField("email")}
                                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                                >
                                    <div className="rounded-full flex justify-center p-2.5 items-center bg-[#333] h-[2.4rem] w-[2.4rem]">
                                        <GoMail size={25} color="#f4f4f4" />
                                    </div>
                                    <p className="text-base xl:text-lg font-medium">
                                        {formData.email}
                                    </p>
                                </div>
                                <div
                                    //   onClick={() => openModalForField("phone")}
                                    className="flex flex-row gap-2.5 items-center cursor-pointer"
                                >
                                    <div
                                        className="rounded-full flex justify-center p-2.5 items-center bg-[#333] h-[2.4rem] w-[2.4rem]"
                                    >
                                        <FaPhone size={25} color="#f4f4f4" />
                                    </div>
                                    <p className="text-base xl:text-lg font-medium">
                                        {formData.phone}
                                    </p>
                                </div>
                                <div className="flex flex-row gap-2.5 items-center cursor-pointer" >
                                    <div className="rounded-full flex justify-center p-2.5 items-center bg-[#333] h-[2.4rem] w-[2.4rem]"  >
                                        <RiShieldUserFill size={25} color="#f4f4f4" />
                                    </div>
                                    <p className="text-base xl:text-lg font-medium" > https://getpie.io </p>
                                </div>
                                <div className="flex flex-row gap-2.5 items-center cursor-pointer" >
                                    <div className="rounded-full flex justify-center p-2.5 items-center bg-[#333] h-[2.4rem] w-[2.4rem]"  >
                                        <TbMailCheck size={25} color="#f4f4f4" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <p className="text-sm xl:text-md leading-[0.97rem] font-medium xl:font-[400]"> Primary Email </p>
                                        <p className="text-base xl:text-lg font-medium" > info@getpie@gmail.com </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2.5 items-center cursor-pointer" >
                                    <div className="rounded-full flex justify-center p-2.5 items-center bg-[#333] h-[2.4rem] w-[2.4rem]" >
                                        <TbMailPause size={25} color="#f4f4f4" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <p className="text-sm xl:text-md leading-[0.97rem] font-medium xl:font-[400]"> Secondary Email </p>
                                        <p className="text-base xl:text-lg font-medium" > info@getpiepay@gmail.com </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
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
        </div>
    );
};

export default Tab6MobileVersion;
