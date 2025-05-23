import React from 'react'

import image from '../assests/logo/logo.png'
import { Box } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

const Logo = ({ width }: any) => {

    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    cursor: 'pointer', // Show pointer cursor on hover
                    transition: 'transform 0.5s ease', // Smooth transition for the spin effect
                    '&:hover img': {
                        transform: 'rotate(90deg)', // Rotate the image on hover
                    },
                }}
                onClick={() => navigate('/')} // Navigate when the box is clicked
            >
                <img
                    src={image}
                    width={width}
                    alt="Descriptive Alt Text" // Always include alt text for accessibility
                    style={{ transition: 'transform 0.5s ease' }} // Transition for smooth rotation
                />
            </Box>
        </>
    )
}

export default Logo