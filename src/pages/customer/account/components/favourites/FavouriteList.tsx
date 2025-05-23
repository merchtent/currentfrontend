import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import YellowButton from '../../../../../components/app/YellowButton';
import { useShopContext } from '../../../../../context/shop/ShopContext';
import { useSnackbar } from '../../../../../context/snackbar/SnackbarContext';
import { urlFavourites } from '../../../../../endpoints';
import { FavouriteDTO, Favourite } from '../../../../../models/favourite';
import ProductCard from '../../../product/ProductCard';
import { Box } from '@mui/joy';

const FavouriteList = () => {

    const [favourites, setFavourites] = useState<FavouriteDTO[]>([]);

    const { showMessage } = useSnackbar(); // Using the snackbar

    const { removeFromFavourites } = useShopContext()

    const fetchFavourites = async () => {
        try {
            const response: AxiosResponse<FavouriteDTO[]> = await axios.get(`${urlFavourites}/token`);
            if (response.data.length > 0) {
                setFavourites(response.data);
                console.log('1')
            }
            else {
                setFavourites([])
                console.log('2')
            }

        } catch (error: any) {
            // if (axios.isAxiosError(error)) {
            //     if (error.response) {
            //         showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
            //     } else if (error.request) {
            //         showMessage('No response from the server. Please try again later.', 'error');
            //     } else {
            //         showMessage(`Error: ${error.message}`, 'error');
            //     }
            // } else {
            //     showMessage('An unexpected error occurred. Please try again later.', 'error');
            // }
        }
    };

    useEffect(() => {
        fetchFavourites();
    }, [])

    const handleRemoveFromFavourites = async (favourite: Favourite) => {
        removeFromFavourites(favourite)
        await fetchFavourites()
    }

    return (
        <>
            {favourites && favourites.length > 0 ?
                <>
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
                        {favourites.map((product, index) => (
                            <>
                                <Box>
                                    {product && <ProductCard key={index} product={product.product} />}
                                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                                        <YellowButton title='Remove from Favourites' url='' onClick={() => handleRemoveFromFavourites(product.favourite)} />
                                    </Box>
                                </Box>
                            </>
                        ))}
                    </Box>
                </>
                :
                <><Box sx={{ textAlign: 'center' }}>No favourites yet.</Box></>}
        </>
    )
}

export default FavouriteList