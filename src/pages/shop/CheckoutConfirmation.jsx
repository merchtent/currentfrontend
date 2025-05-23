import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { PaymentIntentProvider, usePaymentIntent } from '../../context/payment/PaymentContext';
import CheckoutSuccess from './CheckoutConfirmationComponents';


const CheckoutConfirmation = () => {

    const { stripePromise } = usePaymentIntent()

    return (
        <Elements options={{}} stripe={stripePromise}>
            <CheckoutSuccess />
        </Elements>
    )
}

export default CheckoutConfirmation