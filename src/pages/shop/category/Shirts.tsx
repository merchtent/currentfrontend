import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../../../context/shop/ShopContext';
import ProductCard from '../../customer/product/ProductCard';
import { ShopProduct } from '../../../models/shopProduct';
import Filter from '../filter/Filter';

const Shirts = () => {

    const navigate = useNavigate();

    const { latestProducts, fetchLatestProducts } = useShopContext();
    const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>([]);

    useEffect(() => {
        setFilteredProducts(latestProducts);
    }, [latestProducts]);

    useEffect(() => {
        fetchLatestProducts(5)
    }, [])

    const handleFilter = (filters: { category?: string; minPrice?: string; maxPrice?: string, artist?: string; }) => {
        let filtered = latestProducts;

        if (filters.category && filters.category !== '') {
            filtered = filtered.filter((product) =>
                product.category?.toLowerCase().includes(filters.category?.toLowerCase() || '')
            );
        }

        if (filters.artist && filters.artist !== '') {
            filtered = filtered.filter((product) =>
                product.artist?.toLowerCase().includes(filters.artist?.toLowerCase() || '')
            );
        }

        if (filters.minPrice && filters.minPrice !== undefined && filters.minPrice !== '') {
            filtered = filtered.filter((product) => product.price !== undefined && product.price >= parseFloat(filters.minPrice ?? ''));
        }

        if (filters.maxPrice && filters.maxPrice !== undefined && filters.maxPrice !== '') {
            filtered = filtered.filter((product) => product.price !== undefined && product.price <= parseFloat(filters.maxPrice ?? ''));
        }

        setFilteredProducts(filtered);
    };


    return (
        <>
            <Box sx={{
                height: 'auto',
                mt: 4
            }}>
                <Box
                    sx={{
                        width: '90vw',
                        height: 'auto',
                        backgroundColor: 'secondary.500', // Example background color
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '4vh',
                        marginBottom: '4vh',
                        margin: 'auto',
                    }}
                >
                    <Box>
                        <Typography level='title-lg'>TEES</Typography>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Filter onFilter={handleFilter} />
                    </Box>

                    <Box
                        sx={{
                            marginTop: '2vh',
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
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Shirts