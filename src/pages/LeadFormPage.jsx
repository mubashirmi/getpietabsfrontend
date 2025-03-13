import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const LeadFormPage = () => {

  const navigate = useNavigate();

  const { pictureId, tabName } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!name || !email || !businessName || !phone) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required."
      });
      return;
    }

    navigate(`/tab7form/${tabName}`);

    // Validate email format
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email address."
      });
      return;
    }

    // Prepare payload and set loading state
    setIsLoading(true);
    const payload = { name, email, businessName, phone, pictureId, tabName };

    try {
      // Send POST request to a random API endpoint
      const response = await fetch("https://example.com/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      // On successful submission, show success modal via SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Congratulations! Your card has been sent to your email: ${email}`
      });

      // Optionally clear the form
      setName('');
      setEmail('');
      setBusinessName('');
      setPhone('');
      navigate(`/tab7form/${tabName}`)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "Submission failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-[95vh] flex justify-center items-center'>
      <div className='min-w-full sm:min-w-[1260px] rounded-4xl flex shadow-2xl h-full shadow-black/15 border-[1px] border-[#f4f4f4] '>
        <div className="w-[35%] bg-[#0071E3] min-h-full rounded-tl-4xl rounded-bl-4xl flex justify-center items-center">
          <img src={tabName==="flyer"?"/flyerformimage.png":"flyerformimage.png"} alt="form description image" className="w-[70%] object-contain" />
        </div>
        <div className="w-[65%] p-10 h-full">
          <h3 className="text-4xl text-[#1E1E1E] font-semibold text-center mb-3 tracking-wide">
            GET MORE INFO
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
              />
            </div>
            <button type="submit" className="bg-[#0071E3] cursor-pointer rounded-[10px] px-[30px] py-2.5 text-white w-full font-medium text-xl">
              {
                tabName === "flyer" ? "Get Flyer" :
                  tabName === "businessCard" ? "Submit & Get Your Business Card" :
                    tabName === "piebackCalculator" ? "Submit & Get Your Analysis" :
                      "Submit & Get Your Flyer"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadFormPage;
