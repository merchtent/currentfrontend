import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { usePaymentIntent } from "../../context/payment/PaymentContext";
import { Button } from '@mui/joy';
import { useApi } from "../../context/api/ApiContext";

export default function CheckoutForm({ handleProcessOrder }) {

    const { dpmCheckerLink, generatePaymentIntent, order } = usePaymentIntent()

    useEffect(() => {
        generatePaymentIntent()
    }, [])

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { post } = useApi()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // add temp order to backend
        handleProcessOrder()

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                //return_url: "http://localhost:3000/complete?order=12345",
                return_url: "https://merchtent.com.au/shop/order/confirmation",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                {/* <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay & Place Order"}
                    </span>
                </button> */}
                <Button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    onClick={handleSubmit} // Add an onClick handler if you need it
                    fullWidth
                    sx={{
                        p: 1.5,
                        mt: 2,
                        bgcolor: '#fcd157',
                        color: 'text.primary',
                        '&:hover': {
                            bgcolor: '#ffdb70',
                        },
                    }}
                >
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay & Place Order"}
                    </span>
                </Button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                    <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a>
                </p>
            </div>
        </>
    );
}