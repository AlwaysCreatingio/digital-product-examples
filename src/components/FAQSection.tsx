import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    question: "What is Very Good Products?",
    answer: "Very Good Products is a curated gallery showcasing the best digital products from creators around the world. We highlight inspiring examples of ebooks, templates, courses, and more to spark ideas for your next project."
  },
  {
    question: "How can I create my own digital products?",
    answer: (
      <>
        We recommend <a href="https://www.beehiiv.com/features/digital-products" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white underline decoration-brand-accent/30 transition-colors">beehiiv</a> for selling digital products. They take 0% commission on sales, offer built-in email marketing, and let you create branded storefronts on your own domain.
      </>
    )
  },
  {
    question: "What types of digital products can I sell?",
    answer: "You can sell guides, templates, ebooks, coaching sessions, checklists, spreadsheets, courses, audio files, and other downloadable content. The best platforms support multiple file types and instant delivery."
  },
  {
    question: "How do creators get paid?",
    answer: "Most platforms use Stripe for payments. When someone buys your product, money goes to your Stripe account instantly (minus processing fees). Payouts to your bank typically happen every few days once your account is verified."
  },
  {
    question: "Are there platform fees I should know about?",
    answer: (
      <>
        Fees vary by platform. Some take 5-10% commission on top of payment processing. However, platforms like <a href="https://www.beehiiv.com/features/digital-products" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white underline decoration-brand-accent/30 transition-colors">beehiiv</a> take 0% commission—you only pay standard Stripe fees (2.9% + $0.30 per transaction).
      </>
    )
  },
  {
    question: "Can I build an email list from product sales?",
    answer: "Yes, and it's one of the best strategies for growing your audience. Look for platforms that integrate email collection with your storefront so every buyer automatically joins your list."
  },
  {
    question: "How do I submit a product to be featured?",
    answer: "We're always looking for great digital products to showcase. If you've created something you're proud of, reach out to us and we may feature it in our gallery."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto w-full pt-16 lg:pt-24 pb-8 lg:pb-12 px-6">
      <h2 className="text-4xl md:text-5xl font-display font-bold text-white text-center mb-16 uppercase tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="space-y-0">
        {FAQS.map((faq, index) => (
          <div key={index} className="border-b border-white/10 last:border-b-0">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
            >
              <span className="text-lg md:text-xl font-bold text-white group-hover:text-brand-accent transition-colors pr-8">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-brand-accent shrink-0 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-brand-accent shrink-0 transition-all duration-300" />
              )}
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0 pb-0'}`}
            >
              <div className="overflow-hidden">
                <p className="text-gray-400 text-lg leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fee Breakdown Image */}
      <div className="mt-16 pt-12 border-t border-white/10">
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest mb-6">Platform Fee Comparison</p>
        <img
          src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,onerror=redirect/uploads/asset/file/bb5a9291-a033-420e-bcaa-5f545397a96f/fee_breakdown_digital_products.png"
          alt="Fee Breakdown Comparison"
          className="w-full rounded-[10px] border border-white/10 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default FAQSection;
