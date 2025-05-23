import * as React from 'react';
import { Card, Typography, Box, IconButton, Button } from '@mui/joy';
import CircleIcon from '@mui/icons-material/Circle';
import { Product } from '../../../models/productCard'; // Adjust path as necessary
import { ShopProduct } from '../../../models/shopProduct';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../../../context/shop/ShopContext';
import { urlShop } from '../../../endpoints';
import { useEffect } from 'react';
import { CartProduct } from '../../../models/cart';

interface ProductCardProps {
    product: ShopProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { category, productName, price, defaultImage, id, shopCode, artist } = product; // Destructure product properties
    const colors = ['black', 'white', 'grey']; // Example color options
    const navigate = useNavigate()

    function createSlug(text: string) {
        return text
            .toLowerCase()
            .replace(/'/g, '')
            .replace(/\s+/g, '-');
    }

    function navigateToProductPage() {
        const slug = createSlug(productName || '');
        navigate(`/shop/products/${slug}?id=${id}`)
    }

    const [adding, setAdding] = React.useState<boolean>(false)
    const { getProduct, addToCart } = useShopContext();

    return (
        //<Card sx={{ width: 325, height: 'auto', margin: 0.5, border: 'none' }}>
        <Card variant="outlined" sx={{ maxWidth: 325, p: 3, textAlign: "left", background: 'transparent', borderStyle: 'none' }}>
            <Box sx={{ p: 0, }}>
                {/* <Box
                    sx={{
                        backgroundColor: '#cf602b',
                        color: 'white',
                        paddingLeft: 1,
                        paddingRight: 1,
                        borderRadius: 1,
                        display: 'inline-block',
                    }}
                >
                    <Typography sx={{ color: 'inherit' }}>
                        On Sale
                    </Typography>
                </Box> */}
                <Box
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        paddingLeft: 1,
                        paddingRight: 1,
                        borderRadius: 1,
                        display: 'inline-block',
                    }}
                >
                    <Typography sx={{ color: 'inherit' }}>
                        {artist}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%' }} >
                <img
                    onClick={() => navigateToProductPage()}
                    src={`data:image/png;base64,${defaultImage}`}
                    alt={productName}
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "300px",
                        transition: "transform 0.3s ease", // Smooth transition for zoom
                        cursor: "pointer", // Change cursor on hover
                    }}
                    className="zoom-image"
                />
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography
                    sx={{ color: 'text.secondary', fontSize: '12px' }}>
                    <b>{category?.toUpperCase()}</b>
                </Typography>
                <Typography
                    sx={{ color: 'text.secondary', fontSize: '16px' }}>
                    <b>{productName?.toUpperCase()}</b>
                </Typography>
                <Typography sx={{ color: 'grey', fontSize: '14px' }}>
                    ${price?.toFixed(2)} {/* Formatting the price to two decimal places */}
                </Typography>
                <Typography sx={{ fontSize: '14px' }}>
                    XS S M L XL 2XL 3XL
                </Typography>
                {/* <Box sx={{ display: 'flex', marginTop: 1 }}>
                    {colors.map((color, index) => (
                        <IconButton key={index} sx={{ padding: 0 }}>
                            <CircleIcon sx={{ color: color, fontSize: 24, borderColor: 'black', borderStyle: 'solid', borderWidth: 1 }} />
                        </IconButton>
                    ))}
                </Box> */}
                <Box sx={{ display: 'flex', marginTop: 1 }}>
                    <Button
                        onClick={() => navigateToProductPage()}
                        sx={{
                            bgcolor: '#fcd157',
                            color: 'black',
                            '&:hover': {
                                bgcolor: '#d4a847',
                            },
                        }}>View Merch</Button>
                </Box>
            </Box>
        </Card>
    );
};

export default ProductCard;
