import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaCcVisa, FaCcAmex, FaCcMastercard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate()

    return (
        <>
            <Box
                className="merchtent-section"
                id="merchtent-footer"
                sx={{
                    height: 'auto',
                    backgroundColor: 'black'
                }}>
                {/* First Section */}
                <Box
                    sx={{
                        p: 2,
                        gap: 2,
                        bgcolor: 'black',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on mobile, horizontally on larger screens
                        justifyContent: 'space-between', // Evenly space out the columns
                        alignItems: 'flex-start', // Align items to the top of each column
                        gridColumn: '1 / -1',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        width: '100%',
                        zIndex: 1100,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on mobile, horizontally on larger screens
                            padding: 3,
                            gap: { xs: 4, sm: 0 }, // Increase gap on mobile (xs), no gap on larger screens (sm)
                        }}
                    >
                        <Stack
                            sx={{
                                width: { xs: '100%', sm: '25%' }, // Full width on mobile, 25% on larger screens
                                height: '100%',
                                alignItems: 'flex-start', // Align content to the left
                            }}
                        >
                            <Typography sx={{ color: 'white' }}>CUSTOMER SERVICE</Typography>
                            <Typography
                                level="body-sm"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                hello@merchtent.com.au
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                width: { xs: '100%', sm: '25%' }, // Full width on mobile, 25% on larger screens
                                height: '100%',
                                alignItems: 'flex-start', // Align content to the left
                            }}
                        >
                            <Typography sx={{ color: 'white' }}>MUSIC SUPPORT SCOPE</Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/ethos')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                ETHOS
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/gigs')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                GIGS
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/news')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                NEWS
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/charities')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                CHARITIES
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/privacy-policy')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                PRIVACY POLICY
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/terms-and-conditions')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                TERMS AND CONDITIONS
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                width: { xs: '100%', sm: '25%' }, // Full width on mobile, 25% on larger screens
                                height: '100%',
                                alignItems: 'flex-start', // Align content to the left
                            }}
                        >
                            <Typography sx={{ color: 'white' }}>USEFUL INFO</Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/faqs')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                FAQS
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/size-charts')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                SIZE CHARTS
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/track-your-order')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                TRACK YOUR ORDER
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/contact-us')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                CONTACT US
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/about-us')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                ABOUT US
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                width: { xs: '100%', sm: '25%' }, // Full width on mobile, 25% on larger screens
                                height: '100%',
                                alignItems: 'flex-start', // Align content to the left
                                color: 'white'
                            }}
                        >
                            <Typography sx={{ color: 'white' }}>SUBSCRIBE</Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/digital-mail')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                DIGITAL MAIL
                            </Typography>
                            <Typography
                                level="body-sm"
                                onClick={() => navigate('/actual-mail')}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#efba0b',
                                    },
                                }}
                            >
                                ACTUAL MAIL
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
                {/* Second Section */}
                <Box
                    sx={{
                        width: '100%',
                        backgroundColor: 'neutral.500',   // Example background color
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={[
                            {
                                p: 2,
                                gap: 2,
                                bgcolor: 'black',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gridColumn: '1 / -1',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                position: 'sticky',
                                minHeight: '10vh',
                                width: '100%',
                                top: 0,
                                zIndex: 1100,
                            }
                        ]}
                    >
                        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
                            <Stack
                                direction="row"
                                spacing={4}
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: { xs: 'flex', sm: 'flex' }, // Display flex for both sizes
                                    marginBottom: { xs: 2, sm: 0 }, // Add bottom margin for mobile
                                }}
                            >
                                {/* <Tooltip title="Facebook" variant="outlined">
                                    <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        component="a"
                                        href="https://www.facebook.com" // External link to Facebook
                                        target="_blank" // Opens in a new tab
                                        rel="noopener noreferrer" // Security best practice
                                        sx={{
                                            alignSelf: 'center',
                                            display: { xs: 'none', sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
                                            transition: 'border 0.3s ease', // Smooth transition for the border
                                            border: '2px solid transparent', // Initially no border
                                            '&:hover': {
                                                border: '2px solid white', // Add white border on hover
                                                backgroundColor: 'transparent', // Ensure background stays transparent
                                            },
                                        }}
                                    >
                                        <FacebookIcon fontSize="large" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip> */}
                                <Tooltip title="Instagram" variant="outlined">
                                    <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        component="a"
                                        href="https://www.instagram.com/merchtent.au/" // External link to Facebook
                                        target="_blank" // Opens in a new tab
                                        sx={{
                                            alignSelf: 'center',
                                            display: { xs: 'none', sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
                                            transition: 'border 0.3s ease', // Smooth transition for the border
                                            border: '2px solid transparent', // Initially no border
                                            '&:hover': {
                                                border: '2px solid white', // Add white border on hover
                                                backgroundColor: 'transparent', // Ensure background stays transparent
                                            },
                                        }}
                                    >
                                        <InstagramIcon fontSize="large" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip>
                                {/* <Tooltip title="YouTube" variant="outlined">
                                    <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        component="a"
                                        href="https://www.youtube.com" // External link to YouTube
                                        target="_blank" // Opens in a new tab
                                        sx={{
                                            alignSelf: 'center',
                                            marginRight: 2,
                                            display: { xs: 'none', sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
                                            transition: 'border 0.3s ease', // Smooth transition for the border
                                            border: '2px solid transparent', // Initially no border
                                            '&:hover': {
                                                border: '2px solid white', // Add white border on hover
                                                backgroundColor: 'transparent', // Ensure background stays transparent
                                            },
                                        }}
                                    >
                                        <YouTubeIcon fontSize="large" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip> */}
                            </Stack>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 2.0,
                                    alignItems: 'center',
                                    justifyContent: { xs: 'center', sm: 'flex-start' }, // Center on mobile, left-align on larger screens
                                    padding: { xs: '0px 0px 5vh', sm: '0' }, // Add padding for mobile
                                }}
                            >
                                <FaCcVisa color='white' size={40} />
                                <FaCcAmex color='white' size={40} />
                                <FaCcMastercard color='white' size={40} />
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Footer