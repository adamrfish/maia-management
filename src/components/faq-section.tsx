"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "@/components/ui/motion-primitives";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
}

export function FAQSection({ title = "Resident FAQ", items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[48rem] mx-auto border-[0.5px] border-dark bg-white p-5 sm:p-8 md:p-12">
      {/* Title */}
      <div className="mb-6 text-[0.833rem] font-semibold tracking-[0.05em]">
        {title}
      </div>

      {/* Items */}
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="group flex w-full items-center justify-between border-t border-[#efede6] py-4 px-2 sm:px-4 md:px-6 text-left transition-colors duration-200"
          >
            <span className="text-[0.833rem] font-medium tracking-[0.05em] text-dark/80 transition-colors duration-200 group-hover:text-dark">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="ml-6 flex-shrink-0 text-lg text-gray-text"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-2 pt-1 pb-5 sm:px-4 md:px-6">
                  <p className="max-w-[40rem] text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
