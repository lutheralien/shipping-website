import * as Yup from 'yup';

export const PackageDetailsSchema = Yup.object().shape({
  weight: Yup.string()
    .required('Weight is required')
    .test('is-number', 'Weight must be a valid number', value => !isNaN(parseFloat(value)))
    .test('is-positive', 'Weight must be greater than 0', value => parseFloat(value) > 0),
  deliveryLocation: Yup.string()
    .required('Delivery location is required')
    .min(5, 'Please enter a valid address'),
  packageType: Yup.string()
    .oneOf(['small', 'medium', 'large'], 'Invalid package type')
    .required('Package type is required')
});

export const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: Yup.string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date format (MM/YY)')
    .test('expiry', 'Card has expired', (value) => {
      if (!value) return false;
      const [month, year] = value.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }),
  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^\d{3}$/, 'CVV must be 3 digits'),
  amount: Yup.number()
    .min(0, 'Amount cannot be negative')
    .required('Amount is required')
});