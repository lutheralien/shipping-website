import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

// Declare google maps types
declare global {
  interface Window {
    google: typeof google;
  }
}

export interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: google.maps.places.PlaceResult) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  className?: string;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
    value,
    onChange,
    onSelect,
    onBlur,
    placeholder = 'Enter address',
    error,
    touched,
    className
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (inputRef.current && window.google) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' }
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place) {
          onSelect(place);
          if (place.formatted_address) {
            onChange(place.formatted_address);
          }
        }
      });
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onSelect, onChange]);

  // Combine provided className with default styles
  const inputClassName = `w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-fedex-purple focus:border-transparent ${
    error && touched ? 'border-red-500' : 'border-gray-300'
  } ${className || ''}`.trim();

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClassName}
        aria-invalid={error && touched ? 'true' : 'false'}
      />
      <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
    </div>
  );
};

export default LocationAutocomplete;