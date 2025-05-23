import { Box, Card } from '@mui/joy'
import React, { ReactNode } from 'react'

interface InfoContainerProps {
    children?: ReactNode; // Define children as a prop
}

const InfoContainer: React.FC<InfoContainerProps> = ({ children }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems='center' sx={{ minHeight: '30vh' }}>
            {children} {/* Render children here */}
        </Box>
    )
}

export default InfoContainer
