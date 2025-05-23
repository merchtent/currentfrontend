import { Box, Button, Card, Checkbox, Divider, Grid, Input, List, ListItem, TextField, Typography } from '@mui/joy'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useShopContext } from '../../context/shop/ShopContext'
import Authorised from '../../auth/Authorised';
import applepay from '../../assests/payment/apple-pay-payment.jpg'
import paypal from '../../assests/payment/paypal-payment.png'
import { FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartProduct } from '../../models/cart';
import { useApi } from '../../context/api/ApiContext';
import { urlOrders } from '../../endpoints';

import { Elements } from '@stripe/react-stripe-js';
import { usePaymentIntent } from '../../context/payment/PaymentContext';
import CheckoutForm from './StripePaymentForm';

interface ShippingInfo {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    company: string;
    apartment: string;
    phone: string;
    notes: string;
}

interface PaymentInfo {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

interface ShippingOption {
    label?: string;
    value: string;
}

export interface OrderDTO {
    shippingInfo: ShippingInfo;
    paymentInfo: PaymentInfo;
    shippingOption: ShippingOption;
    cartProducts: CartProduct[];
    paymentIntentId: string;
}

const Checkout = () => {

    const { cart, clearCart } = useShopContext()
    const { order, setOrder } = usePaymentIntent();

    useEffect(() => {
        if (cart.length !== 0) {
            const transformedItems = cart.map(product => ({
                id: product.code,
                amount: Math.round(product.price * product.quantity * 100)
            }));

            generatePaymentIntent(transformedItems)
        }
    }, [cart])

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        company: '',
        apartment: '',
        phone: '',
        notes: ''
    });


    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        type: 'shipping' | 'payment'
    ) => {
        const { name, value } = event.target;
        if (type === 'shipping') {
            setShippingInfo({ ...shippingInfo, [name]: value });
        } else if (type === 'payment') {
            setPaymentInfo({ ...paymentInfo, [name]: value });
        }
    };

    const navigate = useNavigate();
    const { post } = useApi()

    const handlePlaceOrder = async () => {

        const orderCreateDto: OrderDTO = {
            shippingInfo: shippingInfo,
            paymentInfo: paymentInfo,
            shippingOption: {
                value: selectedShipping ?? ''
            },
            cartProducts: cart,
            paymentIntentId: paymentIntentId
        }

        setPlacingOrder(true)

        const response = await post<OrderDTO, any>(`${urlOrders}`, orderCreateDto);

        if (response) {
            clearCart()
            navigate('/shop/order/confirmation')
        }
        else {
            // no good
            setPlacingOrder(false)
        }
    };

    const [subscribe, setSubscribe] = useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubscribe(event.target.checked);
    };

    const shippingMethods: ShippingOption[] = [
        { label: 'Standard Shipping - FREE', value: 'standard' },
        // { label: 'Express Shipping - $18.25', value: 'express' },
        // { label: 'Overnight Shipping (THE GIGS TOMORROW) - $34.65', value: 'overnight' },
    ];

    const [selectedShipping, setSelectedShipping] = useState<string | null>(shippingMethods[0]?.value);

    const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setSelectedShipping(event.target.checked ? value : null); // Only one shipping option can be selected
    };

    const [voucherCode, setVoucherCode] = useState<string>('');
    const [isVoucherValid, setIsVoucherValid] = useState<boolean | null>(null);

    const handleVoucherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(event.target.value);
        setIsVoucherValid(null); // Reset voucher validity when the code is changed
    };

    const handleApplyVoucher = () => {
        // Here you can implement the logic to validate the voucher code (e.g., check if it's valid)
        // For this example, let's assume the valid voucher code is "DISCOUNT10"
        if (voucherCode === 'DISCOUNT10') {
            setIsVoucherValid(true);
        } else {
            setIsVoucherValid(false);
        }
    };

    const [placingOrder, setPlacingOrder] = useState<boolean>(false)

    const { clientSecret, dpmCheckerLink, appearance, loader, stripePromise, generatePaymentIntent, paymentIntentId } = usePaymentIntent()

    useEffect(() => {
        const orderCreateDto: OrderDTO = {
            shippingInfo: shippingInfo,
            paymentInfo: paymentInfo,
            shippingOption: {
                value: selectedShipping ?? ''
            },
            cartProducts: cart,
            paymentIntentId: paymentIntentId
        }

        setOrder(orderCreateDto)
    }, [shippingInfo, paymentInfo, selectedShipping, cart])

    return (
        <>
            <Grid container>
                {/* 60% width column */}
                <Grid xs={12} md={7}>
                    <Box
                        sx={{

                            minHeight: '100vh',
                            width: { xs: '100%', md: '80%' },
                            float: { xs: '', md: 'right' }
                        }}
                    >
                        <Box sx={{ padding: 2 }}>
                            <Typography level="h2" component="h1" sx={{ marginBottom: 2 }}>
                                Checkout
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2.0,
                                alignItems: 'center',
                                marginBottom: 1
                            }}>
                                <Authorised
                                    authorised={
                                        <>

                                        </>
                                    }
                                    notAuthorised=
                                    {
                                        <>
                                            {/* <Button
                                                component="a"
                                                // onClick={() => navigate('/register')}
                                                size="sm"
                                                sx={{
                                                    bgcolor: '#fcd157',
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        bgcolor: '#ffdb70',
                                                    },
                                                }}
                                            >
                                                SIGN UP
                                            </Button>
                                            <Button
                                                component="a"
                                                // onClick={() => navigate('/login')}
                                                size="sm"
                                                sx={{
                                                    bgcolor: '#fcd157',
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        bgcolor: '#ffdb70',
                                                    },
                                                }}
                                            >
                                                LOGIN
                                            </Button> */}
                                        </>
                                    }
                                />
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Express Checkout
                                </Typography>
                                {/* <Box display="flex" width='50%' gap={2}>
                                    <img src={applepay} width={200} height={50} style={{ borderRadius: '12px' }} />
                                    <img src={paypal} width={200} height={50} style={{ borderRadius: '12px' }} />
                                </Box> */}
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Contact
                                </Typography>
                                <Input
                                    placeholder="Email"
                                    name="email"
                                    value={shippingInfo.email}
                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Checkbox
                                    checked={subscribe}
                                    onChange={handleChange}
                                    name="subscribeToNews"
                                    label="Email me with news and offers?"
                                />
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Shipping Information
                                </Typography>
                                <Box display="flex" width='100%' gap={2}>
                                    <Input
                                        placeholder="First Name"
                                        name="firstname"
                                        value={shippingInfo.firstname}
                                        onChange={(e) => handleInputChange(e, 'shipping')}
                                        sx={{ marginBottom: 1, background: 'white', padding: 1, flexGrow: 1 }}
                                    />
                                    <Input
                                        placeholder="Last Name"
                                        name="lastname"
                                        value={shippingInfo.lastname}
                                        onChange={(e) => handleInputChange(e, 'shipping')}
                                        sx={{ marginBottom: 1, background: 'white', padding: 1, flexGrow: 1 }}
                                    />
                                </Box>
                                <Input
                                    placeholder="Company (optional)"
                                    name="company"
                                    value={shippingInfo.company}
                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Input
                                    placeholder="Address"
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Input
                                    placeholder="Apartment, suite, etc. (optional)"
                                    name="apartment"
                                    value={shippingInfo.apartment}
                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Box display="flex" width="100%" gap={2}>
                                    <Input
                                        placeholder="Suburb"
                                        name="city"
                                        value={shippingInfo.city}
                                        onChange={(e) => handleInputChange(e, 'shipping')}
                                        sx={{ background: 'white', padding: 1, flexGrow: 1 }}
                                    />
                                    <Input
                                        placeholder="State"
                                        name="state"
                                        value={shippingInfo.state}
                                        onChange={(e) => handleInputChange(e, 'shipping')}
                                        sx={{ background: 'white', padding: 1, flexGrow: 1 }}
                                    />
                                    <Input
                                        placeholder="Post Code"
                                        name="zip"
                                        value={shippingInfo.zip}
                                        onChange={(e) => handleInputChange(e, 'shipping')}
                                        sx={{ background: 'white', padding: 1, flexGrow: 1 }}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ marginBottom: 2 }}>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Shipping Method
                                </Typography>
                                {shippingMethods.map((method) => (
                                    <List>
                                        <Checkbox
                                            checked={selectedShipping === method.value}
                                            onChange={(event) => handleShippingChange(event, method.value)}
                                            name={`shipping-${method.value}`}
                                            label={method.label}
                                            key={method.value}
                                        />
                                    </List>
                                ))}
                            </Box>

                            <Box sx={{ marginBottom: 2 }}>
                                {/* <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Order Notes
                                </Typography> */}
                                <Input
                                    placeholder="Any special instructions/delivery requirements"
                                    name="notes"
                                    value={shippingInfo.notes}
                                    onChange={(e) => handleInputChange(e, 'shipping')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                            </Box>

                            <Box sx={{ marginBottom: 2 }}>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Payment Information
                                </Typography>
                                {/* <Input
                                    placeholder="Card Number"
                                    name="cardNumber"
                                    value={paymentInfo.cardNumber}
                                    onChange={(e) => handleInputChange(e, 'payment')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Input
                                    placeholder="Expiry Date (MM/YY)"
                                    name="expiry"
                                    value={paymentInfo.expiry}
                                    onChange={(e) => handleInputChange(e, 'payment')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Input
                                    placeholder="CVV"
                                    name="cvv"
                                    value={paymentInfo.cvv}
                                    onChange={(e) => handleInputChange(e, 'payment')}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                /> */}
                                {clientSecret && (
                                    <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                                        <CheckoutForm handleProcessOrder={handlePlaceOrder} />
                                    </Elements>)}
                            </Box>

                            {/* <Button
                                size="md"
                                fullWidth
                                loading={placingOrder}
                                sx={{
                                    p: 1.5,
                                    bgcolor: '#fcd157',
                                    color: 'text.primary',
                                    '&:hover': {
                                        bgcolor: '#ffdb70',
                                    },
                                }}
                                onClick={() => handlePlaceOrder()}
                            >
                                Pay & Place Order
                            </Button> */}
                        </Box>
                    </Box>
                </Grid>

                {/* 40% width column */}
                <Grid xs={12} md={5} sx={{ background: '#f6f5f2' }}>
                    <Box
                        sx={{
                            p: 2,
                        }}
                    >
                        <Box sx={{ padding: 2 }}>
                            <Box>
                                <Typography level="h2" component="h1" sx={{ marginBottom: 2 }}>
                                    Items in your cart
                                </Typography>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    Your Cart
                                </Typography>
                                <List>
                                    {cart.map((item, index) => (
                                        <ListItem key={index}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography>
                                                    {item.product} | {item.size} | {item.colour}
                                                </Typography>
                                                <Typography>
                                                    <b>${item.price} x {item.quantity}</b>
                                                </Typography>
                                                <Typography level='body-xs' style={{ marginTop: '2px' }}>
                                                    CODE: {item.code}
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    ))}

                                </List>
                                <Divider sx={{ marginY: 1 }} />
                                <Typography level="h4">
                                    Total: $
                                    {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        {/* <Box>
                            <Box mt={2}>
                                <Input
                                    placeholder="Enter Voucher Code"
                                    name="vouchercode"
                                    value={voucherCode}
                                    onChange={handleVoucherChange}
                                    sx={{ marginBottom: 1, background: 'white', padding: 1 }}
                                />
                                <Button onClick={handleApplyVoucher} sx={{ mt: 1 }} variant="outlined">
                                    Apply Voucher
                                </Button>
                            </Box>
                        </Box> */}
                        {/* <Box sx={{ padding: 2 }}>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography level="h2" component="h1" sx={{ marginBottom: 2 }}>
                                    Merch Credits
                                </Typography>
                                <Typography level="h3" component="h2" sx={{ marginBottom: 1 }}>
                                    This order get you
                                </Typography>
                                <List>
                                    <ListItem key='1'>
                                        <Typography>
                                            45 Merch Credits <Typography level='body-xs'>to go towards future purchases</Typography>
                                        </Typography>
                                    </ListItem>
                                    <ListItem key='2'>
                                        <Typography>
                                            3 Charity Credits <Typography level='body-xs'>to allocate to your choice of music support</Typography>
                                        </Typography>
                                    </ListItem>
                                </List>
                                <Divider sx={{ marginY: 1 }} />
                                <Typography level="h4">
                                    Total: 47 Credits
                                </Typography>
                            </Box>
                        </Box> */}
                    </Box>
                </Grid>
            </Grid >
        </>
    )
}

export default Checkout