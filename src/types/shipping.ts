export type PackageType = 'small' | 'medium' | 'large';

export interface PackageDetails {
  weight: string;
  deliveryLocation: string;
  packageType: PackageType;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

export type FormState = {
    currentStep: number;
    trackingId: string;
    packageDetails: {
      weight: string;
      deliveryLocation: string;
      packageType: string;
    };
    paymentDetails: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      amount: number;
      transactionId?: string;
    };
  };
