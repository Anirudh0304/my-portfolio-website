import PropTypes from 'prop-types';
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiMail, HiPaperAirplane } from "react-icons/hi";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "service_cm6pc0e";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_0kyu42s";
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "3m9BqnTWBFJUiUbI6";

const contactLinks = [
  {
    icon: <FaGithub size={18} />,
    label: 'GitHub',
    value: 'Anirudh0304',
    href: 'https://github.com/Anirudh0304',
  },
  {
    icon: <FaLinkedin size={18} />,
    label: 'LinkedIn',
    value: 'konduri-anirudh',
    href: 'https://www.linkedin.com/in/konduri-anirudh/',
  },
  {
    icon: <HiMail size={18} />,
    label: 'Email',
    value: 'Drop me a message →',
    href: '#',
  },
];

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#f0eeff',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'all 0.2s ease',
  fontFamily: 'DM Sans, sans-serif',
};

const InputField = ({ type = 'text', name, placeholder, required, as: Tag = 'input', rows }) => {
  return (
    <Tag
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      rows={rows}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.background = 'rgba(124,58,237,0.06)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.boxShadow = 'none'; }}
      style={{ ...inputStyle, resize: Tag === 'textarea' ? 'vertical' : undefined }}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  as: PropTypes.elementType,
  rows: PropTypes.number,
};

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
    const botTrap = fd.get("company");

    if (botTrap) return;
    if (!validateEmail(email)) return toast.error("Please enter a valid email.");
    if (!name || !subject || !message) return toast.error("All fields are required.");

    try {
      setIsSending(true);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      formRef.current.reset();
      toast.success("Message sent successfully! ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto font-sans"
    >
      <ToastContainer
        theme="dark"
        toastStyle={{ background: '#0d0b22', border: '1px solid rgba(124,58,237,0.25)', color: '#f0eeff' }}
      />

      {/* Section title */}
      <div className="text-center mb-16">
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: '#7c3aed', letterSpacing: '0.2em' }}
        >
          Get in touch
        </p>
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
        >
          Contact
        </h2>
        <div
          className="w-12 h-0.5 mx-auto mb-5"
          style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }}
        />
        <p className="text-base max-w-lg mx-auto" style={{ color: '#9490b5', lineHeight: 1.7 }}>
          Have an opportunity or project in mind? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-start">
        {/* Left panel */}
        <div className="flex flex-col gap-6">
          <div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
            >
              Let&apos;s work together
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#9490b5', lineHeight: 1.8 }}>
              I&apos;m currently open to Data Science, Data Analyst, and Product Management opportunities
              — full-time or internships. Graduating May 2026 from VIT Vellore.
            </p>
          </div>

          {/* Contact links */}
          <div className="flex flex-col gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.12)', color: '#a855f7' }}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: '#4e4a6a' }}>{link.label}</p>
                  <p className="text-sm font-medium" style={{ color: '#c0bdd8' }}>{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div
          className="rounded-2xl p-7 relative overflow-hidden"
          style={{
            background: 'rgba(13,11,34,0.9)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Top accent */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
          />

          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4" noValidate>
            {/* Honeypot */}
            <input type="text" name="company" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />

            <InputField type="email" name="user_email" placeholder="Your email address" required />
            <InputField name="user_name" placeholder="Your name" required />
            <InputField name="subject" placeholder="Subject" required />
            <InputField as="textarea" name="message" placeholder="Your message..." rows={5} required />

            <button
              type="submit"
              disabled={isSending}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: isSending
                  ? 'rgba(124,58,237,0.4)'
                  : 'linear-gradient(135deg, #7c3aed, #a855f7)',
                boxShadow: isSending ? 'none' : '0 0 24px rgba(124,58,237,0.35)',
                cursor: isSending ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isSending) {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.55)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isSending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <HiPaperAirplane size={15} style={{ transform: 'rotate(90deg)' }} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;