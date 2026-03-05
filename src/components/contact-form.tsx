"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "@/components/ui/motion-primitives";
import { Check } from "lucide-react";
import { submitContactForm, submitInquiryForm } from "@/app/actions/contact";

interface ContactFormProps {
  variant?: "contact" | "inquiry";
}

const contactReasons = [
  "Schedule a Showing",
  "Leasing Question",
  "Maintenance Request",
  "General Inquiry",
  "Other",
];

const propertyTypes = [
  "Single Family Home",
  "Condo / Townhouse",
  "Multi-Family (2–4 units)",
  "Apartment Building (5+ units)",
  "Commercial Property",
  "Other",
];

const unitOptions = ["1", "2–4", "5–10", "11–25", "26–50", "50+"];

export function ContactForm({ variant = "contact" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const defaultReason = variant === "contact" ? (searchParams.get("reason") ?? "") : "";

  const labelClass =
    "block text-[0.694rem] font-medium uppercase tracking-[0.1em] text-gray-text mb-2";
  const inputClass =
    "h-12 w-full border border-border-form bg-white px-4 text-[0.833rem] text-dark outline-none transition-all duration-200 placeholder:text-gray-text/40 hover:border-dark/40 focus-visible:border-dark focus-visible:ring-1 focus-visible:ring-dark";
  const selectClass =
    "h-12 w-full appearance-none border border-border-form bg-white px-4 text-[0.833rem] text-dark outline-none transition-all duration-200 hover:border-dark/40 focus-visible:border-dark focus-visible:ring-1 focus-visible:ring-dark cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234a4a4a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-10";
  const textareaClass =
    "min-h-[8rem] w-full resize-none border border-border-form bg-white px-4 py-3 text-[0.833rem] text-dark outline-none transition-all duration-200 placeholder:text-gray-text/40 hover:border-dark/40 focus-visible:border-dark focus-visible:ring-1 focus-visible:ring-dark";

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="border border-dark/10 bg-white px-8 py-16 text-center md:px-12 md:py-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-dark bg-dark"
          >
            <Check size={24} strokeWidth={2} className="text-cream" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <p className="mt-6 text-[1.2rem] font-medium tracking-[0.025em]">
              Thank you for reaching out
            </p>
            <p className="mt-3 text-[0.833rem] leading-[1.7] tracking-[0.05em] text-gray-text">
              {variant === "inquiry"
                ? "We've received your property inquiry. A member of our team will review the details and get back to you within one business day."
                : "We've received your message. Our team will be in touch shortly — typically within one business day."}
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            const formData = new FormData(e.currentTarget);
            const action =
              variant === "inquiry" ? submitInquiryForm : submitContactForm;
            startTransition(async () => {
              const result = await action(formData);
              if (result.success) {
                setSubmitted(true);
              } else {
                setError(result.error);
              }
            });
          }}
          className="border border-dark/10 bg-white p-6 sm:p-8 md:p-10"
        >
          {/* Section: Personal info */}
          <div className="mb-2 text-[0.694rem] font-medium uppercase tracking-[0.1em] text-dark">
            {variant === "inquiry" ? "Your information" : "Your details"}
          </div>
          <div className="mb-6 border-t border-dark/10" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name <span className="text-dark/30">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name <span className="text-dark/30">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-dark/30">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={inputClass}
              />
            </div>
          </div>

          {variant === "inquiry" ? (
            <>
              {/* Section: Property details */}
              <div className="mb-2 mt-10 text-[0.694rem] font-medium uppercase tracking-[0.1em] text-dark">
                Property details
              </div>
              <div className="mb-6 border-t border-dark/10" />

              <div>
                <label htmlFor="propertyAddress" className={labelClass}>
                  Property address
                </label>
                <input
                  id="propertyAddress"
                  name="propertyAddress"
                  type="text"
                  autoComplete="street-address"
                  className={inputClass}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="propertyType" className={labelClass}>
                    Property type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="numberOfUnits" className={labelClass}>
                    Number of units
                  </label>
                  <select
                    id="numberOfUnits"
                    name="numberOfUnits"
                    defaultValue=""
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section: Message */}
              <div className="mb-2 mt-10 text-[0.694rem] font-medium uppercase tracking-[0.1em] text-dark">
                Message
              </div>
              <div className="mb-6 border-t border-dark/10" />

              <div>
                <label htmlFor="message" className={labelClass}>
                  Tell us about your property <span className="text-dark/30">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Current situation, goals, any specific needs..."
                  className={textareaClass}
                />
              </div>
            </>
          ) : (
            <>
              {/* Section: Your message */}
              <div className="mb-2 mt-10 text-[0.694rem] font-medium uppercase tracking-[0.1em] text-dark">
                Your message
              </div>
              <div className="mb-6 border-t border-dark/10" />

              <div>
                <label htmlFor="reason" className={labelClass}>
                  Reason for contact <span className="text-dark/30">*</span>
                </label>
                <select
                  id="reason"
                  name="reason"
                  required
                  defaultValue={defaultReason}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  {contactReasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className={labelClass}>
                  Message <span className="text-dark/30">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can we assist you?"
                  className={textareaClass}
                />
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-[0.694rem] text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-8 w-full border border-dark bg-dark py-4 text-[0.694rem] font-medium uppercase tracking-[0.1em] text-cream transition-all duration-200 hover:bg-cream hover:text-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                Sending...
              </span>
            ) : variant === "inquiry" ? (
              "Submit inquiry"
            ) : (
              "Send message"
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
