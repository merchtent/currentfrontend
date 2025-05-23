import { Box, Typography } from '@mui/joy'
import React, { useEffect } from 'react'
import { useShopContext } from '../../../context/shop/ShopContext';
import InstagramEmbed from './InstagramEmbeded';

const MerchOutInTheWild = () => {

    const imageUrls = [
        'https://picsum.photos/800/800?random=1',
        'https://picsum.photos/800/800?random=2',
        'https://picsum.photos/800/800?random=3',
        'https://picsum.photos/800/800?random=4',
        'https://picsum.photos/800/800?random=5',
    ];

    const { feeds, fetchFeeds } = useShopContext()

    useEffect(() => {
        fetchFeeds()
    }, [])

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#e3ded3',
                padding: 2
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <Box>
                    <Typography level='title-lg'><center>MERCH OUT IN THE WILD</center></Typography>
                    <Typography><center>@merchtent.au</center></Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile (xs), row on larger screens (sm)
                        gap: 2,
                        p: 2,
                        overflowX: 'auto',
                    }}
                >
                    {feeds &&
                        <>
                            {feeds.map((url, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={url.imageData}
                                    alt={url.altText}
                                    sx={{
                                        width: '300px',
                                        height: '300px',
                                        borderRadius: '12px',
                                        objectFit: 'cover',
                                        flexShrink: 0,
                                    }}
                                />
                            ))}
                        </>}
                </Box>
                {/* <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
                    <InstagramEmbed url='https://www.instagram.com/p/DIWRcBRyjW2' />
                    <InstagramEmbed url='https://www.instagram.com/p/DIWSPErS_e9' />
                </Box> */}

            </Box>
        </Box>

    )
}

export default MerchOutInTheWild