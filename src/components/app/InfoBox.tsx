import { Box, Card } from '@mui/joy'
import React, { ReactNode } from 'react'

interface InfoBoxProps {
    children?: ReactNode; // Define children as a prop
}

const InfoBox: React.FC<InfoBoxProps> = ({ children }) => {
    return (
        <Card variant="outlined" sx={{ maxWidth: { xs: 400, md: '80%' }, textAlign: "center", borderColor: 'transparent', backgroundColor: 'white' }}>
            {children} {/* Render children here */}
        </Card>
    )
}

export default InfoBox
