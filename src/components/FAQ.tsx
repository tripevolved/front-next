'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string | { html: string }
}

interface FAQProps {
  questions: FAQItem[]
}

export default function FAQ({ questions }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {questions.map((item, index) => (
        <div 
          key={index}
          className="border-b border-secondary-200 last:border-b-0"
        >
          <button
            className="w-full py-6 flex justify-between items-center text-left"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-xl font-baloo font-semibold text-secondary-900 pr-4">
              {item.question}
            </h3>
            <span className="flex-shrink-0">
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="pb-6 text-secondary-600 font-comfortaa">
              {typeof item.answer === 'string' ? (
                <p>{item.answer}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: item.answer.html }} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 