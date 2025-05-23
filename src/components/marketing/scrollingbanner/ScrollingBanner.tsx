import { useMediaQuery } from "@mui/material";
import "./ScrollingBanner.css"; // The CSS file we just wrote
import { Box, Typography, useTheme } from "@mui/joy";

const ScrollingBanner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {/* <Box
                className="merchtent-annoucement"
                id='merchtent-annoucement'
                sx={[
                    {
                        bgcolor: 'black',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gridColumn: '1 / -1',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        position: 'sticky',
                        height: '6vh',
                        top: 0,
                        zIndex: 1100,
                    }
                ]}
            >
                <div className="scrolling-banner">
                    <div className="scrolling-text-container">
                        <p className="scrolling-text">
                            Just Launched | 100% Australian Owed | Eco-Friendly Print on Demand | Support Local Bands & Artists
                        </p>
                    </div>
                </div>             
            </Box> */}
            <Box
                sx={{
                    background: '#fcd157',
                    textAlign: 'center',
                    height: {
                        xs: '8vh', // mobile
                        sm: '6vh'  // tablet and up
                    },
                    // display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                {/* {isMobile ?
                    <>
                        <Box>
                            <Typography>No Cost Merch Solution</Typography>
                        </Box>
                        <Box sx={{ mt: 1 }}>

                            <Typography>Eco-Friendly Print on Demand</Typography>
                        </Box>
                    </> :
                    <>
                        <Typography>No Cost Merch Solution | Australian Owned | Eco-Friendly Print on Demand | Support Local Bands & Artists</Typography>

                    </>} */}
                <Typography>
                    {isMobile
                        ? 'Eco-Friendly Print| Support Local Artists'
                        : 'No Cost Merch Solution | Australian Owned | Eco-Friendly Print on Demand | Support Local Bands & Artists'}
                </Typography>
            </Box >
        </>

    );
};

export default ScrollingBanner;
