import { useState } from "react";
import { Button } from "../../../components/button/Button";
import { PostEventBooking } from "./api/PostEventBooking";
import { RiPassportLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsChatSquare } from "react-icons/bs";
import { TiPhoneOutline } from "react-icons/ti";
import { ImSpoonKnife } from "react-icons/im";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    mobileNumber: "",
    eventType: "",
    guestCount: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    cateringType: "",
    eventAddress: "",
    dietaryRequirements: "",
    foodPackageReferences: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const { mutate, isError, isLoading } = PostEventBooking({ setResponseStatus })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     mutate(formData); // call your API
      setSubmitted(true);
      setResponseStatus("success");
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        mobileNumber: "",
        eventType: "",
        guestCount: "",
        eventDate: "",
        eventStartTime: "",
        eventEndTime: "",
        eventLocation: "",
        cateringType: "",
        eventAddress: "",
        dietaryRequirements: "",
        foodPackageReferences: "",
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      setResponseStatus("error");
      console.error(error);
    }
  };

  return (
    <div className="w-full pb-20 mx-auto p-6 bg-white shadow-gray-300 shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-4xl font-extrabold mt-8 text-center mb-4 text-[#d01110]">
        Book Us For Your Event
      </h2>
      <p className="text-center text-gray-700 mb-6 font-semibold">
        Let us be your professional caterer for your event. Fill in the form below to help refine and complete your booking.
      </p>

      {submitted && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          ✅ Your message has been sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-12 flex flex-col gap-4 md:grid grid-cols-2 md:gap-6">
        <div>
          <label className="font-bold inline-flex items-center gap-2"><RiPassportLine /> Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><MdOutlineMailOutline /> Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><BsChatSquare /> WhatsApp Number</label>
          <input
            type="text"
            name="whatsapp"
            placeholder="Enter Whatsapp Number"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><TiPhoneOutline />  Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><ImSpoonKnife /> Event Type</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full bg-white p-3 border rounded"
          >
            <option value="">Select Event Type</option>
            <option value="Marriage">Marriage</option>
            <option value="Naming">Naming</option>
            <option value="Birthday">Birthday</option>
          </select>
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><IoPeopleOutline /> Guest Count</label>
          <input
            type="number"
            name="guestCount"
            placeholder="Enter Guest Count"
            value={formData.guestCount}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><FaRegCalendarAlt /> Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><CiClock2 /> Event Start Time</label>
          <input
            type="time"
            name="eventStartTime"
            value={formData.eventStartTime}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><CiClock2 /> Event End Time</label>
          <input
            type="time"
            name="eventEndTime"
            value={formData.eventEndTime}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2"><CiLocationOn /> Event Location</label>
          <input
            type="text"
            name="eventLocation"
            placeholder="Event Venue or Location"
            value={formData.eventLocation}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>

        <div>
          <label className="font-bold inline-flex items-center gap-2">Catering Type</label>
          <select
            name="cateringType"
            value={formData.cateringType}
            onChange={handleChange}
            required
            className="w-full bg-white p-3 border rounded"
          >
            <option value="">Select Catering Type</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
          </select>
        </div>

        <div className="col-span-full">
          <label className="font-bold inline-flex items-center gap-2">Event Address</label>
          <textarea
            name="eventAddress"
            placeholder="Event Address"
            value={formData.eventAddress}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
            rows="3"
          ></textarea>
        </div>

        <div className="col-span-full">
          <label className="font-bold inline-flex items-center gap-2">Dietary Requirements</label>
          <textarea
            name="dietaryRequirements"
            placeholder="Any allergies, dietary restrictions or special requirements"
            value={formData.dietaryRequirements}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows="3"
          ></textarea>
        </div>

        <div className="col-span-full">
          <label className="font-bold inline-flex items-center gap-2">Food Package References</label>
          <textarea
            name="foodPackageReferences"
            placeholder="Preferred dishes, cuisine types or special requests"
            value={formData.foodPackageReferences}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows="3"
          ></textarea>
        </div>

        <Button
          type="submit"
          className="w-full col-span-full p-3 !py-4 !text-lg !font-bold !mt-7 md:!py-4 !rounded-full text-white hover:shadow-red-500 hover:shadow-md transition"
        >
          Send Message
        </Button>
      </form>

      {responseStatus === "error" && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          ❌ Something went wrong. Please try again!
        </div>
      )}
    </div>
  );
};

export default EventForm;
