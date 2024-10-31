import { QuickLink } from '../types';

const quickLinks: QuickLink[] = [
  { id: '1', title: 'Rate & Transit Time', url: '/rates' },
  { id: '2', title: 'Shipping History', url: '/history' },
  { id: '3', title: 'Find Locations', url: '/locations' },
  { id: '4', title: 'Schedule a Pickup', url: '/pickup' },
];

const QuickLinks = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Quick Links
      </h2>
      <ul className="space-y-3 text-gray-700">
        {quickLinks.map((link) => (
          <li 
            key={link.id}
            className="hover:text-fedex-purple cursor-pointer"
          >
            {link.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;