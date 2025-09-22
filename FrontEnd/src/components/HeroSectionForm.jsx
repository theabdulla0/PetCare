import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HeroSectionForm() {
  const [formData, setFormData] = useState({
    location: "",
    petType: "Cat",
    selectedService: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceClick = (service) => {
    setFormData((prev) => ({ ...prev, selectedService: service }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { location, selectedService } = formData;

    if (!location.trim()) {
      toast.error("Please enter your city or postal code.");
      return;
    }

    if (!selectedService) {
      toast.error("Please select a pet care service.");
      return;
    }

    toast.success("Searching for services...");

    navigate(
      `/services?service=${encodeURIComponent(
        selectedService
      )}&location=${encodeURIComponent(location)}&petType=${formData.petType}`
    );
  };

  const services = [
    "Pet Boarding",
    "House Sitting",
    "Dog Walking",
    "Pet Grooming",
    "Veterinary Care",
  ];

  return (
    <div className="bg-white py-10 px-6 md:px-12 w-full max-w-5xl mt-12 mx-auto shadow-xl rounded-xl">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Service Selection */}
        <div>
          <p className="text-left text-lg font-semibold mb-2">
            I am Looking for
          </p>
          <div className="flex flex-wrap gap-3 justify-around md:justify-start">
            {services.map((service, index) => (
              <button
                key={index}
                type="button"
                className={`py-2 px-5 border rounded-full text-sm font-medium transition-all duration-300 ${
                  formData.selectedService === service
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                }`}
                onClick={() => handleServiceClick(service)}
                aria-label={`Select ${service}`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Location and Pet Type */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Near Me</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter City or Postal Code"
              className="w-full py-3 px-4 border border-green-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
              aria-label="Enter city or postal code"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              My Pet Type
            </label>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-green-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
              aria-label="Select pet type"
            >
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Fish">Fish</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center md:justify-start">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full text-lg font-semibold transition-all duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default HeroSectionForm;
