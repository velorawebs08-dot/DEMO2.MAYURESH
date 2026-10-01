import React, { useState } from 'react';
import { FadeUp } from './FadeUp';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    location: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const WHATSAPP_NUMBER = '919595955220';
  const DISPLAY_NUMBER = '95959 55220';

  const generateWhatsAppMessage = () => {
    let msg = `*New Inquiry - Aura & Kin*\n\n`;
    msg += `*Name:* ${formData.name.trim() || 'Not specified'}\n`;
    msg += `*Phone / WhatsApp:* ${formData.phone.trim() || 'Not specified'}\n`;
    if (formData.date.trim()) {
      msg += `*Event Date:* ${formData.date.trim()}\n`;
    }
    if (formData.location.trim()) {
      msg += `*Location / Venue:* ${formData.location.trim()}\n`;
    }
    if (formData.message.trim()) {
      msg += `*Message:* ${formData.message.trim()}\n`;
    }
    return msg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    
    // Open WhatsApp in a new tab / window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello, I would like to inquire about wedding photography & films.'
  )}`;

  return (
    <section id="contact" className="scroll-mt-24 sm:scroll-mt-28 py-20 md:py-28 px-5 sm:px-6 md:px-10 bg-[#F1EFEA]">
      <div className="max-w-[760px] mx-auto">
        {/* Section Heading */}
        <FadeUp>
          <div className="text-center relative max-w-xl mx-auto mb-10 sm:mb-12 select-none">
            <span
              className="block text-[#9E896A] text-2xl sm:text-3xl font-normal lowercase tracking-normal mb-2"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              inquire
            </span>
            <h2
              className="text-[#1E1E1C] text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.2em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              BOOK YOUR DATE
            </h2>
            <p className="mt-3 text-[#6B6860] text-xs sm:text-sm font-light tracking-wide max-w-md mx-auto">
              Fill in your details below to connect with us directly on WhatsApp.
            </p>
          </div>
        </FadeUp>

        {/* Form Container (No Option Selections, Clean Simple Inputs, Direct WhatsApp Integration) */}
        <FadeUp delay={0.15}>
          <div className="bg-[#E8E5DE] border border-[#B7A58C]/35 rounded-[3px] p-7 sm:p-10 md:p-12 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full border border-[#1E1E1C] mx-auto flex items-center justify-center text-[#1E1E1C] mb-4 text-lg">
                  ✓
                </div>
                <h3
                  className="font-serif text-2xl uppercase tracking-[0.15em] text-[#1E1E1C] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Redirected to WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6860] font-light leading-relaxed max-w-md mx-auto mb-6">
                  Thank you! Your message has been prepared for WhatsApp number{' '}
                  <span className="font-medium text-[#1E1E1C]">{DISPLAY_NUMBER}</span>. If WhatsApp did not open automatically, please click below.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1E1E1C] text-[#F1EFEA] text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-[#9E896A] transition-colors"
                  >
                    Open WhatsApp Chat →
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        date: '',
                        location: '',
                        message: '',
                      });
                    }}
                    className="text-[10px] uppercase tracking-[0.2em] text-[#6B6860] hover:text-[#1E1E1C] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#6B6860] mb-2 font-medium"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya & Rohan"
                      className="w-full bg-[#F1EFEA] border border-[#B7A58C]/40 px-4 py-3 text-xs sm:text-sm text-[#1E1E1C] placeholder-[#6B6860]/45 rounded-[2px] focus:outline-none focus:border-[#1E1E1C] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#6B6860] mb-2 font-medium"
                    >
                      PHONE / WHATSAPP NUMBER *
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 95959 55220"
                      className="w-full bg-[#F1EFEA] border border-[#B7A58C]/40 px-4 py-3 text-xs sm:text-sm text-[#1E1E1C] placeholder-[#6B6860]/45 rounded-[2px] focus:outline-none focus:border-[#1E1E1C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="inquiry-date"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#6B6860] mb-2 font-medium"
                    >
                      DATE OR OCCASION
                    </label>
                    <input
                      id="inquiry-date"
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. 15 December 2026"
                      className="w-full bg-[#F1EFEA] border border-[#B7A58C]/40 px-4 py-3 text-xs sm:text-sm text-[#1E1E1C] placeholder-[#6B6860]/45 rounded-[2px] focus:outline-none focus:border-[#1E1E1C] transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="inquiry-location"
                      className="block text-[10px] uppercase tracking-[0.2em] text-[#6B6860] mb-2 font-medium"
                    >
                      LOCATION / CITY
                    </label>
                    <input
                      id="inquiry-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Pune / Kolhapur / Goa"
                      className="w-full bg-[#F1EFEA] border border-[#B7A58C]/40 px-4 py-3 text-xs sm:text-sm text-[#1E1E1C] placeholder-[#6B6860]/45 rounded-[2px] focus:outline-none focus:border-[#1E1E1C] transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-[10px] uppercase tracking-[0.2em] text-[#6B6860] mb-2 font-medium"
                  >
                    MESSAGE / VISION (OPTIONAL)
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us a little bit about your celebration..."
                    className="w-full bg-[#F1EFEA] border border-[#B7A58C]/40 px-4 py-3 text-xs sm:text-sm text-[#1E1E1C] placeholder-[#6B6860]/45 rounded-[2px] focus:outline-none focus:border-[#1E1E1C] transition-colors resize-none"
                  />
                </div>

                {/* Submit Action directly sending to WhatsApp */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#1E1E1C] text-[#F1EFEA] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#9E896A] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>SEND ON WHATSAPP</span>
                    <span className="font-serif">→</span>
                  </button>

                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-[0.2em] text-[#6B6860] hover:text-[#1E1E1C] flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <span>DIRECT CHAT: {DISPLAY_NUMBER}</span>
                    <span>↗</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
