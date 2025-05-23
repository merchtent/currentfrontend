import { ProductColour, ProductImage } from "./product";

export interface ShopProduct {
    id: number;
    shopCode?: string;
    productName?: string;
    category?: string;
    price?: number;
    defaultImage?: Uint8Array;
    defaultImageBack?: Uint8Array;
    artist?: string;
    artistDescription?: string;
    productDescription?: string;
    productImages: ProductImage[];
    productColours: ProductColour[];
    artistBio?: string;
    artistVideoUrl?: string;
}