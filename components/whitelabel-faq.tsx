"use client";
import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
  
const WhitelabelFAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('General');

  interface FAQ {
    item: string;
    question: string;
    answer: string;
  }

  interface FAQCategory {
    name: string;
    faqs: FAQ[];
  }

  const categories: FAQCategory[] = [
    {
      name: 'General',
    faqs: [
      {
        item: "1",
        question: 'How can I effectively sell my AI platform?',
        answer: "With the AI boom, businesses are looking for ways to get into AI but often don't know how. That's where you come in. It's like selling water to a thirsty person. AI is booming and getting customers is easier than ever right now. For tips and tricks on how to scale from 0-1 million dollars you can enjoy really valueable content on Vitexy's Youtube Channel, Tiktok Page and also Instagram. We drop some really hidden gems on Twitter so make sure to follow us there",
      },
      {
        item: "2",
        question: 'How can I target the right audience for Vitexy?',
        answer: "Focus on businesses looking to modernize and adapt to the digital age. Small to medium enterprises, startups, and companies without a tech team can greatly benefit from Vitexy's simplicity. To be honest with you. Selling this AI software right now is like selling water to a thirsty person.",
      },
      {
        item: "3",
        question: 'Are there training sessions or webinars available for sales?',
        answer: "Yes indeed. We host scheduled webinars/sessions on Youtube and more spontaneous webinars/sessions on Twitter where you get the chance to ask your questions directly to the CEO of Vitexy."
      },
    ],
  },
  {
    name: 'Pre-Purchase',
    faqs: [
      {
          item: "4",
          question: 'How does Vitexy work?',
          answer: 'Vitexy provides a ready-to-use AI platform. You brand it, sell it, and profit from it. We handle all the tech stuff.',
        },
        {
          item: "5",
          question: 'What makes Vitexy different from other AI platforms?',
          answer: "We don't have any competition (yet). To start a AI company requires at least 50k dollars if you can't code. That's why we created Vitexy, to give everyone a chance to get rich with AI. Everybody knows AI is here to stay and it's up to every individual to either be a feather in the wind that gets his job taken by AI or take action and get rich on this AI Revolution. Vitexy is uniquely user-friendly. We focus on making AI accessible and profitable for everyone, no tech background needed.",
        },
        {
            item: "6",
            question: 'Can I customize the platform to fit my brand?',
            answer: "Absolutely! Vitexy is designed to be customizable, letting you make it truly yours. No one will know anything about Vitexy and it will be all about Your Brand!"},
      ],
    },
    {
      name: 'Post-Purchase',
      faqs: [
        {
          item: "7",
          question: 'How do I set up my Vitexy platform?',
          answer: 'We deliver the platform ready-to-go. Vitexy got you!',
        },
        {
          item: "8",
          question: 'I have questions about using the platform. Where can I get help?',
          answer: "You can use our AI Chatbot and if there are further questions which the AI can't answer you are fully welcome to contact Support.",
        },
        {
            item: "9",
            question: 'Can I upgrade my plan later?',
            answer: "Yes, you can! Vitexy offers flexible plans that can be upgraded as your business grows."},
      ],
    },
    {
      name: 'Sales and Marketing',
      faqs: [
        {
          item: "10",
          question: 'How can I effectively sell my AI platform?',
          answer: "With the AI boom, businesses are looking for ways to get into AI but often don't know how. That's where you come in. It's like selling water to a thirsty person. AI is booming and getting customers is easier than ever right now. For tips and tricks on how to scale from 0-1 million dollars you can enjoy really valueable content on Vitexy's Youtube Channel, Tiktok Page and also Instagram. We drop some really hidden gems on Twitter so make sure to follow us there",
        },
        {
          item: "11",
          question: 'How can I target the right audience for Vitexy?',
          answer: "Focus on businesses looking to modernize and adapt to the digital age. Small to medium enterprises, startups, and companies without a tech team can greatly benefit from Vitexy's simplicity. To be honest with you. Selling this AI software right now is like selling water to a thirsty person.",
        },
        {
            item: "12",
            question: 'Are there training sessions or webinars available for sales?',
            answer: 'Yes indeed. We host scheduled webinars/sessions on Youtube and more spontaneous webinars/sessions on Twitter where you get the chance to ask your questions directly to the CEO of Vitexy.',
          },
      ],
    },
    {
      name: 'Technical Support',
      faqs: [
        {
          item: "13",
          question: "I'm facing a technical issue. How can I get it resolved?",
          answer: "Don't worry! Just reach out to our dedicated support team, and we'll get things sorted. Vitexy got your back!",
        },
        {
          item: "14",
          question: 'How often do you update the platform?',
          answer: "We're always improving. Vitexy receives regular updates to ensure you have the latest and best in AI.",
        },
        {
            item: "15",
            question: 'Is my/my customers data secure with Vitexy?',
            answer: 'Absolutely. We are GDPR certificated. Data security is our top priority. Rest assured, your information is in safe hands.',
          },
      ],
    }
]

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="w-4/5  lg:w-2/3 py-8">
      <ScrollArea className="w-full py-3 overflow-y-hidden whitespace-nowrap rounded-md border lg:border-0">
      <nav className="flex">
      {categories.map((category) => (
          <button
            key={category.name}
            className={`${
              selectedCategory === category.name
              ? 'text-[#7075F3]'
              : 'text-white'
          } py-2 px-4 mr-2 rounded-md`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </nav>
      <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div>

      {categories.find((category) => category.name === selectedCategory)?.faqs.map((faq, index) => 
                <Accordion key={faq.item} type="single" collapsible>
                <AccordionItem value={faq.item} className='border-[#7075F3] p-3'>
                    <AccordionTrigger className='text-white '>{faq.question}</AccordionTrigger>
                    <AccordionContent className='text-slate-400'>
                    {faq.answer}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>

        )}
      </div>
    </div>
  );
};

export default WhitelabelFAQ;
