import React, { useState } from "react";
import { Globe, MessageCircle, BookOpen, Info } from "lucide-react";

const Help = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const faqs = [
    {
      question: "How do I change my password?",
      answer: "Go to Settings > Account Management > Change Password. Fill in your old password and new password, then click Update.",
    },
    {
      question: "How do I logout?",
      answer: "Go to Settings > Account Management > Logout. Confirm the logout popup.",
    },
    {
      question: "How do I change my language?",
      answer: "Go to Settings > Language and select English or Hindi.",
    },
    {
      question: "Who can see my profile?",
      answer: "You can manage profile visibility in Settings > Privacy & Security > Profile Visibility.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 rounded-2xl shadow-lg text-white mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Info size={24} /> Help & Support
        </h2>
        <p className="text-orange-100 mt-1">Find answers to common questions</p>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} /> Frequently Asked Questions
        </h3>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => setFaqOpen(faqOpen === index ? null : index)}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-gray-500">{faqOpen === index ? "−" : "+"}</span>
            </button>
            {faqOpen === index && (
              <p className="text-gray-600 pb-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MessageCircle size={20} /> Contact Support
        </h3>
        <p className="text-gray-600 mb-4">
          If you have any issues or questions that are not answered in the FAQ, you can reach out to our support team.
        </p>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <Globe size={16} /> Email: <span className="font-medium">support@example.com</span>
          </p>
          <p className="flex items-center gap-2">
            <Globe size={16} /> Phone: <span className="font-medium">+91 12345 67890</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
