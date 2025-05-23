export interface Asset {
    assetPhrase: string;
    imageData: string;
    userId?: string; // added in C#
    fileName?: string;
    mimeType?: string;
    uploadedAt?: string; // added in C#
}

export interface ProductAsset {
    assetPhrase: string;
    width: number;
    height: number;
    rotation: number;
    x: number;
    y: number;
    data?: string;
}

export interface ProductCreateDto {
    title?: string;
    artistDescription?: string;
    shopCode?: string;
    price?: number;
    onSale: boolean;
    active: boolean;
    userId?: string;
    artist?: string;
    frontAssets?: AssetDto[];
    frontProductAssets?: ProductAssetDto[];
    backAssets?: AssetDto[];
    backProductAssets?: ProductAssetDto[];
    supplierProduct?: SupplierProductDto;
    productColours?: ProductColourDto[];
    productSizes?: ProductSizeDto[];
}

export interface ProductColour {
    id: number;
    value: string;  // value is nullable (like the C# nullable string)
    productId: number;
}


export interface AssetDto {
    assetPhrase?: string;
    userId?: string;
    fileName?: string;
    mimeType?: string;
    imageData?: string;
}

export interface ProductAssetDto {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    assetPhrase?: string;
}

export interface SupplierProductDto {
    id: number;
}

export interface ProductColourDto {
    id?: number;
    value?: string;
}

export interface ProductSizeDto {
    id?: number;
    value?: string;
}

export interface ProductImage {
    id: number;
    imageData?: Uint8Array; // Represents byte[] in TS
    url?: string;
    productId: number;
}

