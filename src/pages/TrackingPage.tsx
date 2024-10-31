// src/pages/TrackingPage.tsx
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MapPin, Check, ArrowLeft, Loader } from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';
import ProgressBar from '../components/ProgressBar';
import { FormState } from '../types/shipping';
import { PackageDetailsSchema, PaymentSchema } from '../validations/shipping';

const WEIGHT_RATE = 2.5;
const STEPS = ['Tracking ID', 'Package Details', 'Payment', 'Confirmation'];

// Types for Payment API
type PaymentResponse = {
  success: boolean;
  transactionId?: string;
  error?: string;
};

// API Functions
const processPayment = async (paymentDetails: any): Promise<PaymentResponse> => {
    const data = {
        amount: paymentDetails.amount,
        cardNumber: paymentDetails.cardNumber,
        expiryDate: paymentDetails.expiryDate,
        cvv: paymentDetails.cvv,
        trackingId: paymentDetails.trackingId,
      }
      console.log('data',data);
      
  try {
    const response = await fetch('https://readyprepared.acityenergy.tech/api/v1/transaction/latrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Payment processing failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

// Loading Spinner Component
const LocationLoadingSpinner = () => {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      <Loader className="w-5 h-5 text-fedex-purple animate-spin" />
    </div>
  );
};

const TrackingPage = () => {
  const [formState, setFormState] = useState<FormState>({
    currentStep: 1,
    trackingId: '',
    packageDetails: {
      weight: '',
      deliveryLocation: '',
      packageType: 'small'
    },
    paymentDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      amount: 0
    }
  });

  const handleBack = () => {
    setFormState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  // Step 1: Tracking ID Generation
  const TrackingIdStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Generate Tracking ID</h2>
      <button
        onClick={() => {
          const newId = `FDX${Math.random().toString().slice(2, 12)}`;
          setFormState(prev => ({
            ...prev,
            trackingId: newId,
            currentStep: 2
          }));
        }}
        className="bg-fedex-purple text-white px-6 py-3 rounded-md hover:bg-fedex-purple/90 transition"
      >
        Generate ID
      </button>
      {formState.trackingId && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-600">Your Tracking ID:</p>
          <p className="text-lg font-mono font-bold">{formState.trackingId}</p>
        </div>
      )}
    </div>
  );

  // Step 2: Package Details
  const PackageDetailsStep = () => {
    const [isLocationLoading, setIsLocationLoading] = useState(false);

    return (
      <Formik
        initialValues={formState.packageDetails}
        validationSchema={PackageDetailsSchema}
        onSubmit={(values) => {
          const amount = parseFloat(values.weight) * WEIGHT_RATE;
          setFormState(prev => ({
            ...prev,
            packageDetails: values,
            paymentDetails: { ...prev.paymentDetails, amount },
            currentStep: 3
          }));
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold">Package Details</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Weight (lbs)
                </label>
                <Field
                  name="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  className={`w-full p-3 border ${
                    errors.weight && touched.weight
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-fedex-purple focus:border-transparent`}
                />
                {errors.weight && touched.weight && (
                  <div className="text-red-500 text-sm mt-1">{errors.weight}</div>
                )}
                {values.weight && (
                  <p className="mt-1 text-sm text-gray-500">
                    Shipping cost: ${(parseFloat(values.weight) * WEIGHT_RATE).toFixed(2)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Location
                </label>
                <div className="relative">
                  <LocationAutocomplete
                    value={values.deliveryLocation}
                    onChange={(value) => {
                      setIsLocationLoading(true);
                      setFieldValue('deliveryLocation', value);
                    }}
                    onSelect={(place) => {
                      if (place.formatted_address) {
                        setFieldValue('deliveryLocation', place.formatted_address);
                      }
                      setIsLocationLoading(false);
                    }}
                    onBlur={() => setIsLocationLoading(false)}
                    placeholder="Enter delivery address"
                    error={errors.deliveryLocation}
                    touched={touched.deliveryLocation}
                    className={`w-full p-3 border ${
                      errors.deliveryLocation && touched.deliveryLocation
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-fedex-purple focus:border-transparent`}
                  />
                  {isLocationLoading && <LocationLoadingSpinner />}
                </div>
                {errors.deliveryLocation && touched.deliveryLocation && (
                  <div className="text-red-500 text-sm mt-1">{errors.deliveryLocation}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Type
                </label>
                <Field
                  as="select"
                  name="packageType"
                  className={`w-full p-3 border ${
                    errors.packageType && touched.packageType
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-fedex-purple focus:border-transparent`}
                >
                  <option value="small">Small Package</option>
                  <option value="medium">Medium Package</option>
                  <option value="large">Large Package</option>
                </Field>
                {errors.packageType && touched.packageType && (
                  <div className="text-red-500 text-sm mt-1">{errors.packageType}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-fedex-purple text-white px-6 py-3 rounded-md hover:bg-fedex-purple/90 transition"
              >
                Continue to Payment
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  // Step 3: Payment
  const PaymentStep = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    return (
      <Formik
        initialValues={formState.paymentDetails}
        validationSchema={PaymentSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setIsProcessing(true);
          setPaymentError(null);

          try {
            const paymentResult = await processPayment({
              ...values,
              trackingId: formState.trackingId,
            });
            console.log(paymentResult);
            
            if (paymentResult) {
              setFormState(prev => ({
                ...prev,
                paymentDetails: {
                  ...values,
                },
                currentStep: 4,
              }));
            } else {
              setPaymentError('Payment processing failed');
            }
          } catch (error: any) {
           alert('An error occurred while processing your payment. Please try again.')
            setPaymentError('An error occurred while processing your payment. Please try again.');
          } finally {
            setIsProcessing(false);
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full"
                disabled={isProcessing}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold">Payment Details</h2>
            </div>

            {paymentError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {paymentError}
              </div>
            )}

            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-600">Shipping Cost:</p>
              <p className="text-2xl font-bold">
                ${formState.paymentDetails.amount.toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <Field
                  name="cardNumber"
                  render={({ field }:any) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={16}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-3 border ${
                        errors.cardNumber && touched.cardNumber
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md`}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFieldValue('cardNumber', value);
                      }}
                      disabled={isProcessing}
                    />
                  )}
                />
                {errors.cardNumber && touched.cardNumber && (
                  <div className="text-red-500 text-sm mt-1">{errors.cardNumber}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <Field
                    name="expiryDate"
                    render={({ field }: any) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="MM/YY"
                        className={`w-full p-3 border ${
                          errors.expiryDate && touched.expiryDate
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 4) {
                            const formattedValue = value.length > 2 
                              ? `${value.slice(0, 2)}/${value.slice(2)}`
                              : value;
                            setFieldValue('expiryDate', formattedValue);
                          }
                        }}
                        disabled={isProcessing}
                      />
                    )}
                  />
                  {errors.expiryDate && touched.expiryDate && (
                    <div className="text-red-500 text-sm mt-1">{errors.expiryDate}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <Field
                    name="cvv"
                    render={({ field }: any) => (
                      <input
                        {...field}
                        type="text"
                        maxLength={3}
                        className={`w-full p-3 border ${
                          errors.cvv && touched.cvv
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md`}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFieldValue('cvv', value);
                        }}
                        disabled={isProcessing}
                      />
                    )}
                  />
                  {errors.cvv && touched.cvv && (
                    <div className="text-red-500 text-sm mt-1">{errors.cvv}</div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-fedex-purple text-white px-6 py-3 rounded-md hover:bg-fedex-purple/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Processing Payment...
                  </div>
                ) : (
                  'Confirm Payment'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  // Delivery Animation Component
  const DeliveryAnimation = () => {
    const steps = [
      'Package Received',
      'In Transit',
      'Out for Delivery',
      'Delivered'
    ];
  
    return (
      <div className="w-full h-64 relative mb-8">
        {/* Track path */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200" />
        
        {/* Steps */}
        <div className="absolute top-1/2 w-full flex justify-between -mt-2 px-4">
          {steps.map((step, index) => (
            <div key={step} className="relative flex flex-col items-center">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div 
                  className="absolute w-full h-1 bg-fedex-purple -z-10 transform -translate-y-3"
                  style={{
                    width: '100%',
                    left: '50%'
                  }}
                />
              )}
              {/* Circle */}
              <div className="w-6 h-6 rounded-full bg-fedex-purple text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              {/* Label */}
              <span className="absolute top-8 text-sm text-gray-600 whitespace-nowrap">
                {step}
              </span>
            </div>
          ))}
        </div>
  
        {/* Animated Truck */}
        <div 
          className="absolute top-1/2 transform -translate-y-full"
          style={{
            animation: 'moveTruck 3s linear infinite'
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="transform -scale-x-100"
          >
            <path
              d="M3 12h12v5H3v-5zm13 0h4l3 3v2h-7v-5z"
              fill="#4F46E5"
              stroke="#4F46E5"
              strokeWidth="1.5"
            />
            <circle cx="7" cy="17" r="2" fill="#1F2937" />
            <circle cx="17" cy="17" r="2" fill="#1F2937" />
          </svg>
        </div>
      </div>
    );
  };
  // Step 4: Confirmation
  const ConfirmationStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Shipping Confirmed!
        </h2>
        <p className="text-gray-600 mt-2">
          Your package is being processed
        </p>
      </div>

      <DeliveryAnimation />

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">Transaction Details</h3>
          <p>Tracking ID: {formState.trackingId}</p>
          <p>Transaction ID: {formState.paymentDetails.transactionId}</p>
          <p>Amount Paid: ${formState.paymentDetails.amount.toFixed(2)}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold mb-2">Delivery Details</h3>
          <div className="space-y-2">
            <p className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-fedex-purple" />
              {formState.packageDetails.deliveryLocation}
            </p>
            <p className="text-sm text-gray-600">
              Estimated delivery: {new Date(Date.now() + 172800000).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            You will receive a confirmation email with these details shortly.
          </p>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <ProgressBar currentStep={formState.currentStep} steps={STEPS} />
        
        {formState.currentStep === 1 && <TrackingIdStep />}
        {formState.currentStep === 2 && <PackageDetailsStep />}
        {formState.currentStep === 3 && <PaymentStep />}
        {formState.currentStep === 4 && <ConfirmationStep />}
      </div>

      {/* Global styles for animations */}
      <style>
        {`
          @keyframes moveTruck {
            0% {
              left: 0%;
            }
            100% {
              left: calc(100% - 48px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default TrackingPage;