export interface OrderProduct {
    productId: number;
    product: string;
    price: number;
    quantity: number;
    code: string;
    size: string;
    colour: string;
}

// Represents the main order
export interface Order {
    id: number;

    // User Information
    userId?: string;

    // Shipping Info
    firstname?: string;
    lastname?: string;
    address?: string;
    city?: string;
    state?: string;
    postcode?: string;
    email?: string;
    company?: string;
    apartment?: string;
    phone?: string;
    notes?: string;

    // Payment Info
    cardNumber?: string;
    expiry?: string;
    cvv?: string;

    // Shipping Option
    shippingOptionLabel?: string;
    shippingOptionValue?: string;

    // Order Products
    orderProducts?: OrderProduct[];

    // Order Tracking and Status
    orderId?: number;
    orderDate?: Date;
    orderStatus?: string;
    paymentStatus?: string;
    shipmentTrackingNumber?: string;
    estimatedDeliveryDate?: Date;

    // Customer Information
    customerId?: number;
    customerName?: string;
    customerPhone?: string;
    customerNotes?: string;

    // Pricing and Discounts
    subtotal?: number;
    discount?: number;
    taxAmount?: number;
    shippingCost?: number;
    totalAmount?: number;

    // Shipping Details
    shippingMethod?: string;
    shippingAddress?: string;
    billingAddress?: string;

    // Payment and Invoicing
    invoiceNumber?: string;
}

export interface OrderStatusDTO {
    paymentIntentId?: string;
    status?: string;
    paymentMethod?: string;
}