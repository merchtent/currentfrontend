import { Box } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { Favourite, FavouriteDTO } from '../../../../models/favourite';
import axios, { AxiosResponse } from 'axios';
import { useSnackbar } from '../../../../context/snackbar/SnackbarContext';
import { urlFavourites } from '../../../../endpoints';
import ProductCard from '../../product/ProductCard';
import YellowButton from '../../../../components/app/YellowButton';
import { useShopContext } from '../../../../context/shop/ShopContext';
import FavouriteList from './favourites/FavouriteList';

const Favourites = () => {
    return (
        <>
            <Box>
                <h3>MY ACCOUNT</h3>
                <h2>FAVOURITES</h2>
            </Box>
            <FavouriteList />
        </>
    )
}

export default Favourites