import React, { useEffect, useState } from 'react'
import PageHeader from '../../../../../components/app/PageHeader'
import Page from '../../../../../components/app/Page'
import InfoContainer from '../../../../../components/app/InfoContainer'
import InfoBox from '../../../../../components/app/InfoBox'
import image from '../../../../../assests/images/productsuccess.png'
import { Box, LinearProgress, Typography } from '@mui/joy'
import { useLocation } from 'react-router-dom'
import { ShopProduct } from '../../../../../models/shopProduct'
import { useShopContext } from '../../../../../context/shop/ShopContext'
import { urlShop } from '../../../../../endpoints'
import ProductCard from '../../../product/ProductCard'
import YellowButton from '../../../../../components/app/YellowButton'

const CreateProductSuccess = () => {

    interface RouteParams {
        product: string
        [key: string]: any;
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const { getProduct, addToCart, addToFavourites } = useShopContext();

    const [data, setData] = useState<ShopProduct | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct(`${urlShop}/product?id=${id}`);
            if (data) {
                setData(data)
            }
        };

        fetchData();
    }, [getProduct]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

    return (
        <>
            <PageHeader title='PRODUCT CREATED' />
            <Page>
                <InfoContainer>
                    <InfoBox>
                        <Typography level='body-sm'>Your product is now available for purchase!</Typography>
                        {data &&
                            <>
                                <ProductCard product={data} />
                            </>}
                        <YellowButton title={'My Account'} url={'/account'} />
                        <YellowButton title={'Your Product Listing'} url={''} />
                    </InfoBox>
                </InfoContainer>
            </Page>
        </>
    )
}

export default CreateProductSuccess