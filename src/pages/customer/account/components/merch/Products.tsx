import { Box, Button, Card, CardContent, CardCover, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { SupplierProductLine, SupplierProductLineDTO } from '../../../../../models/supplierProduct';
import axios, { AxiosResponse } from 'axios';
import { urlProducts, urlSupplierProductLines } from '../../../../../endpoints';
import { useSnackbar } from '../../../../../context/snackbar/SnackbarContext';
import YellowButton from '../../../../../components/app/YellowButton';
import { ShopProduct } from '../../../../../models/shopProduct';
import ProductCard from '../../../product/ProductCard';
import ProductAdminCard from '../../../product/ProductAdminCard';

const Products = () => {

    const [products, setProducts] = useState<ShopProduct[]>([])

    const { showMessage } = useSnackbar()

    const fetchProducts = async () => {
        try {
            const response: AxiosResponse<ShopProduct[]> = await axios.get(`${urlProducts}/token`);
            setProducts(response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
                } else if (error.request) {
                    showMessage('No response from the server. Please try again later.', 'error');
                } else {
                    showMessage(`Error: ${error.message}`, 'error');
                }
            } else {
                showMessage('An unexpected error occurred. Please try again later.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <Box>
            <Box>
                <h2>MY ACCOUNT</h2>
                <h3>YOUR MERCH</h3>
            </Box>
            {products && products.length > 0 ?
                <>
                    <Box sx={{ width: '80%' }}>
                        <Box
                            sx={{
                                display: 'grid',
                                gap: 2, // Adjust the gap between items
                                gridTemplateColumns: {
                                    xs: 'repeat(1, 1fr)',  // Stack all cards on mobile (1 card per row)
                                    sm: 'repeat(3, 1fr)',  // 3 cards on small screens (tablets)
                                    md: 'repeat(4, 1fr)',  // 4 cards on medium screens (small laptops)
                                    lg: 'repeat(5, 1fr)',  // 5 cards on large screens (desktops)
                                },
                                justifyItems: 'center',  // Center the items within the grid
                            }}
                        >
                            {products.map((product, index) => (
                                <ProductAdminCard key={index} product={product} />
                            ))}
                        </Box>
                    </Box>
                </>
                :
                <>Loading...</>}

        </Box>
    )
}

export default Products