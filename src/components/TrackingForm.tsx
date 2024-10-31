import { useState } from 'react';

const TrackingForm = () => {
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tracking logic
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Track Your Package
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter tracking number"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fedex-purple focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-fedex-purple text-white py-3 rounded-md hover:bg-fedex-purple/90 transition duration-200 ease-in-out"
        >
          Track
        </button>
      </form>
    </div>
  );
};

export default TrackingForm;