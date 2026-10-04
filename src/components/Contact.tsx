import React, { useState } from 'react';
import { ArrowUpRight, Mail, AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { BRAND_INFO } from '../data';
import { ContactFormData, ContactResponse } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Please enter a subject (minimum 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please write a message with at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field once user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ContactResponse = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          honeypot: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Transmission failed. Please try again or email directly.');
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Network error while transmitting. Please contact directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
          <span>07</span>
          <span className="text-white/20">/</span>
          <span>CONTACT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Direct Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1]">
                START A <br />
                CONVERSATION.
              </h2>

              <p className="mt-6 text-base sm:text-lg text-[#929292] font-['Inter'] leading-relaxed">
                Have a project, collaboration, question or idea? <br />
                Send a message.
              </p>

              {/* Direct Email Block (Section 14) */}
              <div className="mt-12 p-6 sm:p-8 bg-[#0D0D0D] border border-white/[0.12] relative">
                <span className="text-xs font-mono text-[#B7FF00] uppercase tracking-widest block mb-2">
                  DIRECT CONTACT
                </span>
                <p className="text-xl sm:text-2xl font-bold font-mono text-[#F2F2F2] break-all select-all">
                  {BRAND_INFO.email}
                </p>

                <p className="mt-3 text-xs text-[#929292]">
                  Founder: {BRAND_INFO.founder} · Location: {BRAND_INFO.location}
                </p>

                <div className="mt-6">
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold tracking-wider text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>SEND EMAIL</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Note regarding telephone / communication */}
            <div className="mt-8 text-xs font-mono text-[#929292]/70">
              SECURE DISPATCH // ALL INQUIRIES ROUTED RESPONSIBLY
            </div>
          </div>

          {/* Right Column: Real Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#0C0C0C] border border-white/[0.12] relative">
              {submitStatus === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-12 text-center space-y-4 animate-in fade-in"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B7FF00]/10 border border-[#B7FF00]">
                    <CheckCircle2 className="w-7 h-7 text-[#B7FF00]" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#F2F2F2]">
                    MESSAGE RECEIVED.
                  </h3>
                  <p className="text-base text-[#929292] font-['Inter'] max-w-sm mx-auto">
                    We'll get back to you.
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      type="button"
                      className="px-6 py-2.5 text-xs font-mono font-semibold text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] transition-colors cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot for spam bots */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave this blank</label>
                    <input
                      type="text"
                      id="honeypot"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div
                      role="alert"
                      className="p-4 bg-red-950/40 border border-red-800 text-xs font-mono text-red-200 flex items-start gap-3"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* FULL NAME * */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono tracking-wider text-[#929292] uppercase mb-2"
                    >
                      FULL NAME <span className="text-[#B7FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Alex Vance"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 bg-[#070707] border text-sm text-[#F2F2F2] placeholder-[#929292]/40 focus:outline-none focus:border-[#B7FF00] transition-colors ${
                        fieldErrors.name ? 'border-red-500' : 'border-white/[0.12]'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-400 font-mono">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL * & PHONE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono tracking-wider text-[#929292] uppercase mb-2"
                      >
                        EMAIL <span className="text-[#B7FF00]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="alex@domain.com"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3 bg-[#070707] border text-sm text-[#F2F2F2] placeholder-[#929292]/40 focus:outline-none focus:border-[#B7FF00] transition-colors ${
                          fieldErrors.email ? 'border-red-500' : 'border-white/[0.12]'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-400 font-mono">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-mono tracking-wider text-[#929292] uppercase mb-2"
                      >
                        PHONE <span className="text-[#929292]/50 text-[10px]">(OPTIONAL)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91..."
                        className="w-full px-4 py-3 bg-[#070707] border border-white/[0.12] text-sm text-[#F2F2F2] placeholder-[#929292]/40 focus:outline-none focus:border-[#B7FF00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* SUBJECT * */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono tracking-wider text-[#929292] uppercase mb-2"
                    >
                      SUBJECT <span className="text-[#B7FF00]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Security Collaboration / Research Inquiry"
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                      className={`w-full px-4 py-3 bg-[#070707] border text-sm text-[#F2F2F2] placeholder-[#929292]/40 focus:outline-none focus:border-[#B7FF00] transition-colors ${
                        fieldErrors.subject ? 'border-red-500' : 'border-white/[0.12]'
                      }`}
                    />
                    {fieldErrors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-red-400 font-mono">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>

                  {/* MESSAGE * */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono tracking-wider text-[#929292] uppercase mb-2"
                    >
                      MESSAGE <span className="text-[#B7FF00]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your inquiry, project scope, or technical question..."
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 bg-[#070707] border text-sm text-[#F2F2F2] placeholder-[#929292]/40 focus:outline-none focus:border-[#B7FF00] transition-colors resize-y ${
                        fieldErrors.message ? 'border-red-500' : 'border-white/[0.12]'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-400 font-mono">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs sm:text-sm font-semibold font-mono tracking-widest text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
