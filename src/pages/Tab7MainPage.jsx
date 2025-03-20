import { useState } from 'react';

const Tab7MainPage = () => {
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
    // Validate the second form
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
      alert("Form submitted successfully!");
      // Handle final submission here (e.g., send the data to the server)
    } else {
      alert("Please answer all the questions.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex justify-center items-center bg-gradient-to-r from-[#0071E3] to-[#002F5F] w-full px-4 sm:px-8 py-10">
      <div className="max-w-[1440px] mx-auto w-[99%] flex justify-center items-center gap-x-9 ">

        <div className="w-[886px] bg-white px-10 py-12 h-full rounded-[25px] shadow-2xl shadow-black/10">
          <h3 className="text-4xl text-[#1E1E1E] font-semibold uppercase text-center mb-3 tracking-wide">
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
                <button className='text-white w-full font-medium text-xl bg-[#0071E3] py-2.5 px-8 rounded-[10px] cursor-pointer  hover:shadow-blue-500/20 duration-300 transition-all ease-in-out hover:shadow-xl'>
                  Next
                </button>
              </>



          </form>
        </div>
      </div>
    </div>
  );
};

export default Tab7MainPage
