import { AspectRatio, Box, Typography } from '@mui/joy';
import React from 'react'

const ProductShowcase = () => {
    const images = [
        'https://printify.com/cdn-cgi/image/width=520,quality=100,format=avif/https://images.printify.com/api/catalog/66d82988a65761e5f9096537',
        'https://source.unsplash.com/random/300x300?sig=2',
        'https://source.unsplash.com/random/300x300?sig=3',
        'https://source.unsplash.com/random/300x300?sig=4',
        'https://source.unsplash.com/random/300x300?sig=5',
        'https://source.unsplash.com/random/300x300?sig=6',
    ];
    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography level='h3'>Your next bestseller merch awaits</Typography>
            </Box>
            <Box
                display="flex"
                gap={2}
                justifyContent="center"
                flexWrap="wrap"
                sx={{
                    maxWidth: '100%', minHeight: '30vh', alignItems: 'center'
                }}

            >
                {images.map((src, index) => (
                    <AspectRatio
                        key={index}
                        ratio="1"
                        sx={{ width: 200, borderRadius: 'md', overflow: 'hidden' }}
                    >
                        <img src={src} alt={`Image ${index + 1}`} loading="lazy" />
                    </AspectRatio>
                ))}
            </Box>
        </Box>

    )
}

export default ProductShowcase