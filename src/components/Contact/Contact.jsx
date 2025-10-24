import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

// move IDs to env (safer). If you prefer hardcoding, keep your values.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_cm6pc0e";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_0kyu42s";
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "3m9BqnTWBFJUiUbI6";

const Contact = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const sendEmail = async (e) => {
    e.preventDefault();

    const fd = new FormData(formRef.current);
    const email = fd.get("user_email");
    const name = fd.get("user_name");
    const subject = fd.get("subject");
    const message = fd.get("message");
    const botTrap = fd.get("company"); // honeypot

    if (botTrap) return; // silently drop bots
    if (!validateEmail(email)) return toast.error("Please enter a valid email.");
    if (!name || !subject || !message) return toast.error("All fields are required.");

    try {
      setIsSending(true);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      formRef.current.reset();
      toast.success("Message sent successfully! ✅");
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-6 sm:px-8 md:px-12 lg:px-16"
    >
      <ToastContainer />
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          I’d love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>

      <div className="mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white text-center">Connect With Me</h3>

        <form ref={formRef} onSubmit={sendEmail} className="mt-4 flex flex-col space-y-4" noValidate>
          {/* Honeypot (spam trap) */}
          <input
            type="text"
            name="company"
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
          ></textarea>

          <button
            type="submit"
            disabled={isSending}
            className={`w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md transition ${
              isSending ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
