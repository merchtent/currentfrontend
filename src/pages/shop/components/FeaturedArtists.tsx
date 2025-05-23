import { Box, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom'; // Make sure to import navigate if needed

const FeaturedArtists: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: '4vh',
                mb: '4vh',
                mx: 'auto',
                width: '100%',
            }}
        >
            {/* Title */}
            <Typography
                level="h3"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Boldonse',
                    mb: 3, // Margin below title for spacing
                    textAlign: 'center',
                }}
            >
                Featured Artists
            </Typography>

            {/* Content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, side-by-side on medium screens and up
                    gap: 2,
                    width: '90%', // Ensure it fits well on small screens
                    mx: 'auto',
                    mb: 4,
                    justifyContent: 'center', // Center content horizontally
                }}
            >
                {/* Left Image */}
                <Box
                    sx={{
                        flexBasis: '50%',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="your-image-source" // Replace with actual image URL
                        alt="Featured Artist Image 1"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            minHeight: { xs: '20vh', md: '50vh' }, // Responsive height based on screen size
                        }}
                    />
                </Box>

                {/* Right Image (Clickable) */}
                <Box
                    sx={{
                        flexBasis: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        component="img"
                        onClick={() => navigate(`/categories/artists?id=spank-the-90s`)} // Example navigation
                        src="your-image-source" // Replace with actual image URL
                        alt="Featured Artist Image 2"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '16px',
                            minHeight: { xs: '20vh', md: '50vh' },
                            cursor: 'pointer', // Indicating that the image is clickable
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default FeaturedArtists;
