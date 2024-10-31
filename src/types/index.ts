export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: 'jewelry' | 'bags' | 'clothes' | 'phones' | 'Hermès' | 'watches' | 'electronics' | 'home' | 'accessories' | 'shoes';
    brand: string;
  }
  export interface TrackingInfo {
    id: string;
    status: string;
    location: string;
    updatedAt: string;
  }
  
  export interface QuickLink {
    id: string;
    title: string;
    url: string;
  }


  // src/types/shipping.ts
export interface ShippingDetails {
  trackingId: string;
  weight: number;
  pickupLocation: string;
  deliveryLocation: string;
  packageType: 'small' | 'medium' | 'large';
  expectedDeliveryDate: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

export interface FormState {
  currentStep: number;
  shippingDetails: ShippingDetails;
  paymentDetails: PaymentDetails;
}