// SupplierSize interface
export interface SupplierSize {
    id: number;
    value: string | null;
}

// SupplierColour interface
export interface SupplierColour {
    id: number;
    value: string | null;
}

// SupplierVariation interface
export interface SupplierVariation {
    id: number;
    colour: string | null;
    size: string | null;
    variantId: number;
}

// SupplierProductBound interface
export interface SupplierProductBound {
    id: number;
    type: string;
    width: number;
    height: number;
    left: number;
    top: number;
}

// SupplierProductBound interface
export interface SupplierProductImage {
    id: number;
    type: string;
    colour: string;
    fileReference: string;
    isDefaultImage: boolean;
    data: string;
}

// Supplier interface
export interface Supplier {
    id: number;
    name: string | null;
    country: string | null;
    fulfillmentExternalId: number;
}

// SupplierProduct interface
export interface SupplierProduct {
    id: number;
    description: string | null;
    shopDescription: string | null;
    title: string | null;
    price: number | null;
    fulfillmentId: number;
    supplierSizes: SupplierSize[] | null;
    supplierColours: SupplierColour[] | null;
    supplierVariations: SupplierVariation[] | null;
    supplierProductBounds: SupplierProductBound[] | null;
    supplierProductImages: SupplierProductImage[] | null;
    supplierProductPricings: SupplierProductPricing[] | null;
    supplier: Supplier | null;
    supplierProductLineId: number;
    frontBack: string | null;
}

export interface SupplierProductPricing {
    id: number;
    effectiveFrom: string; // ISO date string
    effectiveTo: string; // ISO date string
    buyPrice: number;
    artistProfit: number;
    donationAmount: number;
    sellPrice: number;
}


// SupplierProductLine interface
export interface SupplierProductLine {
    id: number;
    line: string | null;
    description: string | null;
    supplierProducts: SupplierProduct[] | null;
    category: string | null;
}

export interface SupplierProductLineDTO {
    category?: string;
    supplierProductLines?: SupplierProductLine[];
}