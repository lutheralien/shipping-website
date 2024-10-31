import {
  Phone,
  Mail,
  MessageCircle,
  FileQuestion,
  Package,
  Clock,
  Truck,
  AlertCircle,
  ChevronRight,
  HeadphonesIcon
} from 'lucide-react';

function SupportPage() {
  const faqs = [
    {
      question: "How do I track my package?",
      answer: "Enter your tracking number on our tracking page or use our mobile app for real-time updates."
    },
    {
      question: "What are your delivery hours?",
      answer: "We deliver Monday to Saturday, 8:00 AM to 8:00 PM. Express delivery services are available 24/7."
    },
    {
      question: "How can I change my delivery address?",
      answer: "Log in to your account and update the delivery address under 'Active Shipments' or contact our support team."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer full refunds for canceled orders within 24 hours. Partial refunds may apply for delivery issues."
    }
  ];

  const commonIssues = [
    {
      icon: <Package className="w-6 h-6" />,
      title: "Package Tracking",
      description: "Track your delivery status"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Delivery Time",
      description: "Check estimated arrival"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Service Areas",
      description: "View delivery zones"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Report Issue",
      description: "Report delivery problems"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">How Can We Help You?</h1>
          <div className="flex justify-center items-center space-x-8">
            <a href="tel:+14502892687" className="flex items-center bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-600 font-semibold">+1 (450) 289-2687</span>
            </a>
            <button className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="font-semibold">Start Live Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Phone Support */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold">Phone Support</h2>
            </div>
            <p className="text-gray-600 mb-4">24/7 Customer Service</p>
            <a href="tel:+14502892687" className="text-blue-600 font-semibold hover:underline">
              +1 (450) 289-2687
            </a>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Mail className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold">Email Support</h2>
            </div>
            <p className="text-gray-600 mb-4">Response within 24 hours</p>
            <a href="mailto:support@latrix.com" className="text-blue-600 font-semibold hover:underline">
              support@latrix.com
            </a>
          </div>

          {/* Live Chat */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <HeadphonesIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold">Live Chat</h2>
            </div>
            <p className="text-gray-600 mb-4">Available 24/7</p>
            <button className="text-blue-600 font-semibold hover:underline">
              Start Chat Now
            </button>
          </div>
        </div>

        {/* Common Issues */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commonIssues.map((issue, index) => (
              <button
                key={index}
                className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mr-3">{issue.icon}</div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{issue.title}</h3>
                  <p className="text-sm text-gray-600">{issue.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                  <FileQuestion className="w-5 h-5 text-blue-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;