import React, { useState } from "react";
import { Input, Button, Card, Typography, Stack } from "@mui/joy";
import YellowButton from "../../../components/app/YellowButton";

interface Order {
    orderNumber: string;
    status: string;
    trackingNumber: string;
    estimatedDelivery: string;
}

const fakeOrders: Order[] = [
    {
        orderNumber: "12345",
        status: "Shipped",
        trackingNumber: "TRACK12345",
        estimatedDelivery: "2025-03-20",
    },
    {
        orderNumber: "67890",
        status: "In Transit",
        trackingNumber: "TRACK67890",
        estimatedDelivery: "2025-03-22",
    },
    {
        orderNumber: "54321",
        status: "Delivered",
        trackingNumber: "TRACK54321",
        estimatedDelivery: "2025-03-10",
    },
];

const OrderTracking: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);

    const handleSearch = () => {
        const foundOrder = fakeOrders.find((order) => order.orderNumber === orderNumber) || null;
        setOrderDetails(foundOrder);
    };

    return (
        <Stack spacing={2} sx={{ maxWidth: { xs: '80%', md: 500 }, justifyContent: 'center', margin: "auto", minHeight: '30vh' }}>
            <Typography level="h4">Track Your Order</Typography>
            <Input
                placeholder="Enter Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
            />
            <YellowButton title='Track' onClick={handleSearch} url='/track-your-order'></YellowButton>
            {orderDetails && (
                <Card>
                    <Typography><b>Order Details</b></Typography>
                    <Typography>Order Number: {orderDetails.orderNumber}</Typography>
                    <Typography>Status: {orderDetails.status}</Typography>
                    <Typography>Tracking Number: {orderDetails.trackingNumber}</Typography>
                    <Typography>Estimated Delivery: {orderDetails.estimatedDelivery}</Typography>
                </Card>
            )}
        </Stack>
    );
};

export default OrderTracking;
