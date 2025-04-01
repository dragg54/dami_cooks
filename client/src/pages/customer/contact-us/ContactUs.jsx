import  { useState } from "react";
import { Button } from "../../../components/button/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);

    // Clear the form after submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold mt-8 text-center mb-4">Contact Us</h2>
      <p className="text-center text-[#fdb750]  mb-6">
        Have a question or feedback? We’d love to hear from you!
      </p>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          ✅ Your message has been sent successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
            rows="4"
          ></textarea>
          <Button
            type="submit"
            className="w-full p-3 md:py-4 !rounded-full  text-white !font-bold  hover:shadow-red-500 hover:shadow-md transition"
          >
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactUs;
