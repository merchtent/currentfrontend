import { ShopProduct } from "./shopProduct";

export interface Favourite {
    id?: number,
    userId?: string;
    productId?: number
}

export interface FavouriteDTO {
    favourite: Favourite;
    product: ShopProduct;
}