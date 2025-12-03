import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Card } from '../components/ui/card';

export default function FAQ() {
  const faqs = [
    {
      question: 'Are all phones sold on PhoneHub authentic?',
      answer: 'Yes, we only sell 100% authentic smartphones directly from authorized distributors. Every phone comes with the manufacturer\'s warranty and original packaging.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and secure online payment methods. All transactions are encrypted and secure.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'We offer free standard shipping on all orders, which typically takes 3-5 business days. Express shipping options are also available at checkout for faster delivery.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all products. If you\'re not satisfied with your purchase, you can return it in its original condition for a full refund. The device must be unopened and unused.',
    },
    {
      question: 'Do phones come unlocked?',
      answer: 'Most of our phones are sold unlocked and can be used with any carrier. Some models may be carrier-specific, which will be clearly indicated on the product page.',
    },
    {
      question: 'Is there a warranty on the phones?',
      answer: 'Yes, all phones come with the manufacturer\'s standard warranty, typically 1 year. Extended warranty options may be available at checkout for select models.',
    },
    {
      question: 'Can I trade in my old phone?',
      answer: 'Yes, we offer a trade-in program where you can exchange your old device for credit towards a new purchase. Contact our support team for a quote on your device.',
    },
    {
      question: 'Do you offer price matching?',
      answer: 'We strive to offer competitive prices. If you find a lower price from an authorized retailer, contact us and we\'ll do our best to match it.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to monitor your shipment\'s progress.',
    },
    {
      question: 'What if my phone arrives damaged?',
      answer: 'If your phone arrives damaged, please contact us immediately with photos of the damage. We\'ll arrange for a replacement or refund as quickly as possible.',
    },
    {
      question: 'Do you sell refurbished phones?',
      answer: 'Currently, we only sell brand new phones. All our devices are factory sealed and have never been used.',
    },
    {
      question: 'Can I cancel or modify my order?',
      answer: 'You can cancel or modify your order within 24 hours of placing it. After that, the order enters processing and cannot be changed. Please contact support as soon as possible if you need to make changes.',
    },
    {
      question: 'Are international purchases supported?',
      answer: 'We currently ship within the United States. International shipping may be available for select products - please contact our support team for more information.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can reach our customer support team via email at support@phonehub.com or call us at 1-800-PHONEHUB. Our team is available Monday-Friday, 9AM-6PM EST.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about shopping at PhoneHub
        </p>
      </div>

      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
        <h2 className="text-xl mb-2">Still have questions?</h2>
        <p className="text-gray-700 mb-4">
          Our customer support team is here to help! Contact us at support@phonehub.com or call 1-800-PHONEHUB.
        </p>
        <p className="text-sm text-gray-600">
          Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
        </p>
      </Card>
    </div>
  );
}
