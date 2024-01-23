"use client";
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqData: FAQItem[] = [

    {
      question: 'What payment methods do you accept?',
      answer: 'We use stripe payment gateway through which we accepts credit and debit cards from various card networks (Visa, Mastercard, American Express, Discover, Diners Club, China UnionPay, etc.)'
    },
    {
      question: 'Is there a return policy?',
      answer: 'Unfortunately, we currently do not have a return policy. However we are fully available to address any problem you may have with the system. Sign up for a free trial and proceed to a payment plan after consideration. Please review our Returns & Refunds page for details.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team via email at support@example.com or by phone at +1-123-456-7890.'
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section className=" bg-inherit py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-zinc-100 mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-8">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-zinc-100 p-6 rounded-lg shadow-md cursor-pointer ${
                expandedIndex === index ? 'bg-green-100' : ''
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl text-gray-700 font-semibold mb-4">{item.question}</h3>
                <span className={`text-2xl ${expandedIndex === index ? 'text-green-500' : 'text-gray-400'}`}>
                  {expandedIndex === index ? '-' : '+'}
                </span>
              </div>
              <div
                className={`transition-max-h duration-300 ease-in-out overflow-hidden ${
                  expandedIndex === index ? 'max-h-full' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 mt-2">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
