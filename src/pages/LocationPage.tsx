import { useState } from 'react';
import { 
  Search, 
  Store, 
  Package, 
  Truck, 
  HeadphonesIcon, 
  Clock, 
  MapPin 
} from 'lucide-react';

function LocationPage() {
  const [searchLocation, setSearchLocation] = useState('');

  const services = [
    {
      icon: <Store className="w-12 h-12 text-blue-600" />,
      title: "PICKUP POINTS",
      description: "Find nearest pickup location",
      link: "#"
    },
    {
      icon: <Package className="w-12 h-12 text-blue-600" />,
      title: "SEND PACKAGE",
      description: "Create new shipment",
      link: "#"
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "EXPRESS DELIVERY",
      description: "Same-day delivery service",
      link: "#"
    },
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: "TRACK ORDER",
      description: "Check shipment status",
      link: "#"
    },
    {
      icon: <HeadphonesIcon className="w-12 h-12 text-blue-600" />,
      title: "24/7 SUPPORT",
      description: "Get help anytime",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Find Delivery Services Near You</h1>
            <p className="text-blue-100 text-lg">Fast, reliable, and secure delivery at your fingertips</p>
          </div>
          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full p-4 pl-12 text-lg rounded-l-lg border-2 border-white focus:outline-none focus:border-blue-300 shadow-lg"
              />
            </div>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-r-lg hover:bg-orange-600 transition-colors shadow-lg font-semibold">
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Delivery Solutions for Every Need
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience seamless delivery services with Latrix. Download our 
            <a href="#" className="text-blue-600 hover:underline mx-1 font-medium">
              mobile app
            </a>
            for real-time tracking and instant notifications.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center group"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <span className="text-sm font-bold text-gray-800 mb-2">
                {service.title}
              </span>
              <span className="text-sm text-gray-600">
                {service.description}
              </span>
            </a>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Truck className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Same Day Delivery</h3>
                <p className="text-gray-600">Fast and reliable service</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Wide Coverage</h3>
                <p className="text-gray-600">Delivering nationwide</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <HeadphonesIcon className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">24/7 Support</h3>
                <p className="text-gray-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Experience Premium Delivery Services
          </h2>
          <p className="text-blue-100 mb-6">Join thousands of satisfied customers who trust Latrix for their delivery needs</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationPage;