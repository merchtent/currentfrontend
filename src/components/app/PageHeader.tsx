import { Box, Typography } from '@mui/joy';
import React from 'react';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: 'auto',
                backgroundColor: 'secondary.500', // Example background color
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4vh'
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: { xs: 'center' }
                }}
            >
                <Typography level='title-lg'>{title}</Typography>
            </Box>
        </Box>
    );
};

export default PageHeader;