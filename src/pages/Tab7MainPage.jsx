import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

const Tab7MainPage = () => {

  const { pictureId, tabName } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    processor: '',
    businessDuration: '',
    previousProcessor: '',
    volume: '',
    priceIncrease: '',
    growthPlans: '',
    profitMargin: '',
    ticketPrice: '',
    foodDelivery: '',
    costIncreasePlans: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const submitData = {
      ...formData,
      tabName: tabName
    };

    // Add image ID fields based on tabName
    if (tabName === "Flyer") {
      submitData.flyerId = Number(pictureId);
    } else if (tabName === "Business-Card") {
      submitData.businessCardImageId = Number(pictureId);
    } else if (tabName === "Calculator") {
      submitData.calculatorImageId = Number(pictureId);
    }

    // Send the data
    axiosInstance.post('/finalForm', submitData)
    .then((response) => {
      setIsLoading(false);
      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Congratulations! Your request has been recieved. We will response you soon.`,
        });
        navigate("/");
      } else {
        throw new Error("Unexpected status code: " + response.status);
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.error("Error submitting form: ", error.response || error.message || error);
      alert("There was an error submitting the form.");
    })

    if (
      formData.processor &&
      formData.businessDuration &&
      formData.previousProcessor &&
      formData.volume &&
      formData.priceIncrease &&
      formData.growthPlans &&
      formData.profitMargin &&
      formData.ticketPrice &&
      formData.foodDelivery &&
      formData.costIncreasePlans
    ) {
      console.log("Form is ready to be submitted.")
    } else {
      alert("Please answer all the questions.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F] w-full px-4 sm:px-8 py-10">
      <div className="max-w-[1440px] mx-auto w-[99%] flex justify-center items-center gap-x-9 ">
        <div className="w-[886px] bg-white px-10 py-12 h-full rounded-[25px] shadow-2xl shadow-black/10">
          <h3 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-5 tracking-wide">
            Merchant Analysis
          </h3>
          <form onSubmit={handleSubmit}>
            <>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="processor" className="text-base font-light">
                  Who do you process with now?
                </label>
                <input
                  type="text"
                  id="processor"
                  name="processor"
                  value={formData.processor}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="businessDuration" className="text-base font-light">
                  How long have you been in business?
                </label>
                <input
                  type="text"
                  id="businessDuration"
                  name="businessDuration"
                  value={formData.businessDuration}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="previousProcessor" className="text-base font-light">
                  Have you used another processor before?
                </label>
                <input
                  type="text"
                  id="previousProcessor"
                  name="previousProcessor"
                  value={formData.previousProcessor}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="previousProcessor" className="text-base font-light">
                  How much volume in credit and debit do you do?
                </label>
                <input
                  type="text"
                  id="volume"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="priceIncrease" className="text-base font-light">
                  Have you raised your pricing inside your business in the past? What happened when you did?
                </label>
                <input
                  type="text"
                  id="priceIncrease"
                  name="priceIncrease"
                  value={formData.priceIncrease}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="growthPlans" className="text-base font-light">
                  What growth plans do you have for your business over the next 5 years?
                </label>
                <input
                  type="tel"
                  id="growthPlans"
                  name="growthPlans"
                  value={formData.growthPlans}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="profitMargin" className="text-base font-light">
                  What is your average profit margin across the business?
                </label>
                <input
                  type="text"
                  id="profitMargin"
                  name="profitMargin"
                  value={formData.profitMargin}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="ticketPrice" className="text-base font-light">
                  What's your average ticket price?
                </label>
                <input
                  type="text"
                  id="ticketPrice"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="foodDelivery" className="text-base font-light">
                  Do you utilize any food delivery services? (If a restaurant)
                </label>
                <input
                  type="text"
                  id="foodDelivery"
                  name="foodDelivery"
                  value={formData.foodDelivery}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <div className="mb-4 flex flex-col gap-1">
                <label htmlFor="costIncreasePlans" className="text-base font-light">
                  What plans or goals do you have to increase profit or decrease cost?
                </label>
                <input
                  type="text"
                  id="costIncreasePlans"
                  name="costIncreasePlans"
                  value={formData.costIncreasePlans}
                  onChange={handleChange}
                  className="text-lg border-[1px] font-medium border-[#D6D6D6] text-[#333] outline-none rounded-[10px] p-2.5"
                />
              </div>
              <button disabled={isLoading} className='text-white w-full font-medium text-xl bg-[#0071E3] py-2.5 px-8 rounded-[10px] cursor-pointer  hover:shadow-blue-500/20 duration-300 transition-all ease-in-out hover:shadow-xl'>
                {isLoading ? (<CircularProgress size={24} color="white" />) : "Next"}
              </button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tab7MainPage
