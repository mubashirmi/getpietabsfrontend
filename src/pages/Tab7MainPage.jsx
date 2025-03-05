import { useState } from 'react';

// Service options for the dropdown
const services = [
  "Payment Processing",
  "Consulting",
  "Web Development",
  "Marketing",
  "Design"
];

const Tab7MainPage = () => {
  const [formStep, setFormStep] = useState(1); // Track which form step is being displayed
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: '',
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

  const handleSubmitFirstForm = (e) => {
    e.preventDefault();
    // Validate the first form fields before submitting
    if (
      formData.fullName &&
      formData.businessName &&
      formData.email &&
      formData.phone &&
      formData.service
    ) {
      setFormStep(2); // Move to the second form
    } else {
      alert("Please fill all the fields correctly.");
    }
  };

  const handleSubmitSecondForm = (e) => {
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
    <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg my-6 border-2 border-slate-200">
      {formStep === 1 && (
        <form onSubmit={handleSubmitFirstForm}>
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">In which service are you interested?</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Submit</button>
        </form>
      )}

      {formStep === 2 && (
        <form onSubmit={handleSubmitSecondForm}>
          <h2 className="text-xl font-semibold mb-4">Additional Business Information</h2>

          <div className="mb-4">
            <label htmlFor="processor" className="block text-sm font-medium text-gray-700">Who do you process with now?</label>
            <input
              type="text"
              id="processor"
              name="processor"
              value={formData.processor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="businessDuration" className="block text-sm font-medium text-gray-700">How long have you been in business?</label>
            <input
              type="text"
              id="businessDuration"
              name="businessDuration"
              value={formData.businessDuration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="previousProcessor" className="block text-sm font-medium text-gray-700">Have you used another processor before?</label>
            <input
              type="text"
              id="previousProcessor"
              name="previousProcessor"
              value={formData.previousProcessor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="volume" className="block text-sm font-medium text-gray-700">How much volume in credit and debit do you do?</label>
            <input
              type="text"
              id="volume"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priceIncrease" className="block text-sm font-medium text-gray-700">Have you raised your pricing inside your business in the past? What happened when you did?</label>
            <input
              type="text"
              id="priceIncrease"
              name="priceIncrease"
              value={formData.priceIncrease}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="growthPlans" className="block text-sm font-medium text-gray-700">What growth plans do you have for your business over the next 5 years?</label>
            <input
              type="text"
              id="growthPlans"
              name="growthPlans"
              value={formData.growthPlans}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profitMargin" className="block text-sm font-medium text-gray-700">What is your average profit margin across the business?</label>
            <input
              type="text"
              id="profitMargin"
              name="profitMargin"
              value={formData.profitMargin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">What's your average ticket price?</label>
            <input
              type="text"
              id="ticketPrice"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="foodDelivery" className="block text-sm font-medium text-gray-700">Do you utilize any food delivery services? (If a restaurant)</label>
            <input
              type="text"
              id="foodDelivery"
              name="foodDelivery"
              value={formData.foodDelivery}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="costIncreasePlans" className="block text-sm font-medium text-gray-700">What plans or goals do you have to increase profit or decrease cost?</label>
            <input
              type="text"
              id="costIncreasePlans"
              name="costIncreasePlans"
              value={formData.costIncreasePlans}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Tab7MainPage
