import { Box } from '@mui/joy'
import React from 'react'

const Hero = () => {
    return (
        <Box
            sx={{
                width: '100vw', // Full screen width
                position: 'relative', // Ensure the box is in normal flow
                overflow: 'hidden', // Ensures image won't overflow the container
            }}
        >
            <img
                src="https://24hundred.net/cdn/shop/files/HEADER-D2C_1_2000x.png?v=1718235432"
                alt="Banner"
                style={{
                    width: '100%', // Make image fill the parent container's width
                    height: '100%', // Maintain aspect ratio
                }}
            />
        </Box>
    )
}

export default Hero