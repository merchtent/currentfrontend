import { createContext, useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

const PaymentIntentContext = createContext();

export function PaymentIntentProvider({ children }) {
    const [paymentIntent, setPaymentIntent] = useState(null);

    // test
    //const stripePromise = loadStripe("pk_test_51QLGUyIMFZKTkGALTEXIuekcKCor7S6e6dJhwKX5yJsPjMOEFxeWDjbxxpfuR9PYMyNEaUkvQjnDCletenMhrBpe00i0FZ43GM");
    // live
    const stripePromise = loadStripe("pk_live_51QLGUyIMFZKTkGALFxnwfrKSTzY5cH6pdL9hjeDkxkzreb9TFgrZcVUyI3y5VndnMlGpfyWyXUrdGXhKvVXVG7cM00X7sD95zD");

    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    // stripe

    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [order, setOrder] = useState(null)

    function generatePaymentIntent(products) {
        // Create PaymentIntent as soon as the page loads
        if (products) {
            // fetch("https://localhost:7265/api/payments/create-payment-intent", {
            fetch("https://merchtentapi20250405195844.azurewebsites.net/api/payments/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
                body: JSON.stringify({ items: products }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setClientSecret(data.clientSecret);
                    setPaymentIntentId(data.paymentIntentId)
                    // [DEV] For demo purposes only
                    setDpmCheckerLink(data.dpmCheckerLink);
                });
        }
    }

    const appearance = {
        theme: 'stripe',
    };

    return (
        <PaymentIntentContext.Provider value={{
            paymentIntent, setPaymentIntent, clientSecret, dpmCheckerLink, appearance, loader,
            stripePromise, generatePaymentIntent, order, setOrder, paymentIntentId
        }}>
            {children}
        </PaymentIntentContext.Provider>
    );
}

export function usePaymentIntent() {
    return useContext(PaymentIntentContext);
}