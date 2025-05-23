import { Box, Link, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import image from '../../assests/images/under_construction.png'
import YellowButton from './YellowButton'

const UnderConstruction = () => {

    const ResponsiveImage = ({ image }: any) => {
        const [width, setWidth] = useState("35%");

        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth <= 768 ? "80%" : "65%");
            };

            handleResize(); // Set initial width
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return <img src={image} style={{ borderRadius: "25px", width }} alt="responsive" />;
    };

    return (
        <Box sx={{ flex: 'display', flexDirection: 'column' }}>
            <Box>
                <h2>Under Construction</h2>
            </Box>
            <Box sx={{ mb: 2 }}>
                <YellowButton title='Go back Home' url='/' />
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography level="body-md" mt={2}>
                    Register any interest: <Link href="mailto:hello@merchtent.com.au">hello@merchtent.com.au</Link>
                </Typography>
            </Box>
            <Box>
                <ResponsiveImage image={image} />
            </Box>
        </Box>

    )
}

export default UnderConstruction