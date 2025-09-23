import React, { useState } from "react";
import LayoutUser from "./LayoutUser";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:3000/api/contact`, form);
      toast.success(res.data.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send message. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutUser>
      <div className="relative min-h-screen flex items-center justify-center py-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.petsfolio.com/in/wp-content/themes/petsfolio/images/contact-bnr.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Contact Card */}
        <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl max-w-4xl w-full p-8">
          <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="py-3 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </LayoutUser>
  );
}

export default Contact;
