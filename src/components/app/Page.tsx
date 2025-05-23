import { Box } from '@mui/joy'
import React, { ReactNode } from 'react'

interface PageProps {
    children?: ReactNode; // Define children as a prop
}

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            {children} {/* Render children here */}
        </Box>
    )
}

export default Page
