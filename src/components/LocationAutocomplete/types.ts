export interface PlaceResult {
    formatted_address?: string;
    [key: string]: any;
  }
  
  export interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onSelect: (place: PlaceResult) => void;
    onBlur?: () => void; // Make onBlur optional since it might not always be needed
    placeholder: string;
    error?: string;
    touched?: boolean;
    className?: string;
  }