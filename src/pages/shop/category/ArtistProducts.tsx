import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/joy'
import { useLocation, useNavigate } from 'react-router-dom';
import { useShopContext } from '../../../context/shop/ShopContext';
import ProductCard from '../../customer/product/ProductCard';
import { ShopProduct } from '../../../models/shopProduct';
import Filter from '../filter/Filter';
import { useApi } from '../../../context/api/ApiContext';
import { Tracking } from '../../../models/tracking';
import { urlTracking } from '../../../endpoints';

interface RouteParams {
    product: string
    [key: string]: any;
}

const ArtistProducts = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const qrId = queryParams.get('qrid');

    const { post } = useApi()

    useEffect(() => {
        // log the visit
        handleTracking()
    }, [qrId])

    const handleTracking = async () => {

        if (qrId) {
            const tracking = {
                qrId: qrId,
                timestamp: new Date
            }

            try {
                const response = await post<Tracking, any>(`${urlTracking}`, tracking);
                if (response) {
                    if (response?.status >= 200 && response?.status < 300) {
                    } else {
                        throw new Error(`Unexpected response: ${response?.statusText || 'Unknown error'}`);
                    }
                }
            } catch (error) {

            }
        }
    };

    const artistName = id?.replaceAll("-", " ").toUpperCase();

    const { artistProducts, fetchArtistProducts } = useShopContext();
    const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>([]);

    useEffect(() => {
        setFilteredProducts(artistProducts);
    }, [artistProducts]);

    useEffect(() => {
        fetchArtistProducts(100, id || '')
    }, [id])

    const handleFilter = (filters: { category?: string; minPrice?: string; maxPrice?: string, artist?: string; }) => {
        let filtered = artistProducts;

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
                        {id &&
                            <Typography level='title-lg'>{artistName}</Typography>}
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

export default ArtistProducts