// src/components/LocationInput.tsx
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  label,
  placeholder
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // This is where you'd integrate the Google Maps Places Autocomplete
  // You'll need to add the Google Maps script to your index.html and get an API key
  useEffect(() => {
    // Initialize Google Places Autocomplete here
    // This is just a mock implementation
    if (value.length > 2) {
      setSuggestions([
        `${value} Street, City`,
        `${value} Avenue, City`,
        `${value} Road, City`,
      ]);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-3 border rounded-md"
        />
        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                onChange(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;