import TrackingForm from '../components/TrackingForm';
import { Plane, Package, MapPin, Calendar } from 'lucide-react';

const HomePage = () => {
  const quickLinks = [
    { icon: <Package className="w-5 h-5" />, text: "Rate & Transit Time" },
    { icon: <Plane className="w-5 h-5" />, text: "Shipping History" },
    { icon: <MapPin className="w-5 h-5" />, text: "Find Locations" },
    { icon: <Calendar className="w-5 h-5" />, text: "Schedule a Pickup" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/75">
          <img 
            src="/images/image.jpeg"
            alt="Air freight loading cargo"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Global Air Flight & Logistics Solutions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Reliable worldwide shipping with end-to-end supply chain solutions
            </p>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tracking Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Track Your Shipment</h2>
            <TrackingForm />
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <span className="p-2 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    {link.icon}
                  </span>
                  <span className="ml-3 text-gray-700 font-medium">{link.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Global Network</h3>
            <p className="text-gray-600">Extensive worldwide coverage with reliable delivery partners</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Express Delivery</h3>
            <p className="text-gray-600">Fast and secure shipping solutions for time-sensitive cargo</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer service for your shipping needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;