import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logo from '../../images/Logo';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Authorised from '../../auth/Authorised';
import { logout } from '../../auth/handleJwt';
import AuthenticationContext from '../../auth/AuthenticationContext';
import { useRef } from 'react';
import { CartRef, CartState } from '../../pages/shop/Cart';
import { Navigation } from './Navigation';

interface HeaderProps {
    updateCartState: (newState: Partial<CartState>) => void;
}

export const Header: React.FC<HeaderProps> = ({ updateCartState }) => {

    const handleCartClick = () => {
        // Example usage of the function passed from the parent
        updateCartState({ right: true });
    };

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { update, claims } = React.useContext(AuthenticationContext);

    return (
        <>
            <Box
                className="merchtent-section"
                id='merchtent-menu'
                sx={[
                    {
                        bgcolor: 'black',
                        color: 'white',
                        textAlign: 'center',
                        p: 2,
                        borderBottomStyle: 'solid',
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey'
                    }
                ]}
            >
                <Typography level='body-lg' onClick={() => navigate("/")} sx={{ textAlign: 'center', color: 'white', fontSize: '35px', cursor: 'pointer' }}>MERCH TENT</Typography>
            </Box >
            <Box
                className="merchtent-section"
                id='merchtent-menu'
                sx={[
                    {
                        // p: 2,
                        // gap: 2,
                        bgcolor: 'black',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gridColumn: '1 / -1',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        position: 'sticky',
                        height: '8vh',
                        top: 0,
                        zIndex: 1100,
                        color: 'white'
                    }
                ]}
            >
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly' }}>
                    <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: { xs: 'none', sm: 'flex' },

                        }}
                    >
                        <Logo width='50' />
                        <Box
                            sx={{
                                cursor: 'pointer', // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/categories/tees')}
                                sx={{
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    color: 'white',
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                TEES
                            </Typography>
                        </Box>
                        {/* <Box
                            sx={{
                                cursor: 'pointer', // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/categories/hoodies')}

                                sx={{
                                    color: 'white',
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                HOODIES
                            </Typography>
                        </Box> */}
                        {/* <Box
                            sx={{
                                cursor: 'pointer', // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/categories/hats')}

                                sx={{
                                    color: 'white',
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                HATS
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                cursor: 'pointer', // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/categories/bags')}

                                sx={{
                                    color: 'white',
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                BAGS
                            </Typography>
                        </Box> */}
                        <Box
                            sx={{
                                cursor: 'pointer', // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/artists')}
                                sx={{
                                    color: 'white',
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                ARTISTS
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/about-us')}
                                sx={{
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    color: 'white',
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                ABOUT
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/news')}
                                sx={{
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    color: 'white',
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                NEWS
                            </Typography>
                        </Box>
                        {/* <Box
                            sx={{
                                cursor: 'pointer',
                                // Show pointer cursor on hover
                            }}
                        >
                            <Typography
                                level='body-lg'
                                onClick={() => navigate('/gigs')}
                                sx={{
                                    transition: 'color 0.3s ease', // Smooth transition effect
                                    color: 'white',
                                    '&:hover': {
                                        color: '#efba0b', // Change text color on hover
                                    },
                                }}
                            >
                                GIGS
                            </Typography>
                        </Box> */}
                        <Authorised role='artist'
                            authorised={
                                <>

                                </>} />
                    </Stack>
                    {/* <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: { xs: 'none', sm: 'flex' },
                        }}
                    >
                        <Typography
                            level='body-md'
                            onClick={() => navigate('/')}

                            sx={{
                                color: 'white',
                                transition: 'color 0.3s ease', // Smooth transition effect
                                '&:hover': {
                                    color: '#efba0b', // Change text color on hover
                                    cursor: 'pointer'
                                },
                            }}
                        >
                            MERCH TENT
                        </Typography>
                    </Stack> */}
                    <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                        <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
                            <MenuRoundedIcon />
                        </IconButton>
                        <Drawer
                            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <ModalClose />
                            <DialogTitle>MERCH TENT</DialogTitle>
                            <Box sx={{ px: 1 }}>
                                {/* Pass setOpen as a prop to the Navigation component */}
                                <Navigation closeDrawer={() => setOpen(false)} updateCartState={updateCartState} />
                            </Box>
                        </Drawer>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2.0,
                            alignItems: 'center',
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
                        <Authorised
                            authorised={
                                <>
                                    {/* <Button
                                        component="a"
                                        onClick={() => {
                                            logout();
                                            update([]);
                                            navigate("/");
                                        }}
                                        size="sm"
                                        sx={{
                                            bgcolor: '#fcd157',
                                            color: 'black',
                                            '&:hover': {
                                                bgcolor: '#d4a847',
                                            },
                                        }}
                                    >
                                        LOGOUT
                                    </Button> */}
                                </>
                            }
                            notAuthorised=
                            {
                                <>
                                    {/* <Button
                                        component="a"
                                        onClick={() => navigate('/register')}
                                        size="sm"
                                        sx={{
                                            bgcolor: '#fcd157',
                                            color: 'black',
                                            '&:hover': {
                                                bgcolor: '#d4a847',
                                            },
                                        }}
                                    >
                                        SIGN UP
                                    </Button> */}
                                    <Button
                                        component="a"
                                        onClick={() => navigate('/interested')}
                                        size="sm"
                                        sx={{
                                            bgcolor: '#fcd157',
                                            color: 'black',
                                            '&:hover': {
                                                bgcolor: '#d4a847',
                                            },
                                        }}
                                    >
                                        REGISTER INTEREST
                                    </Button>

                                    {/* <Button
                                        component="a"
                                        onClick={() => navigate('/login')}
                                        size="sm"
                                        sx={{
                                            bgcolor: '#fcd157',
                                            color: 'black',
                                            '&:hover': {
                                                bgcolor: '#d4a847',
                                            },
                                        }}
                                    >
                                        LOGIN
                                    </Button> */}
                                </>
                            }
                        />
                        {/* <Tooltip title="Search" variant="outlined">
                            <IconButton
                                size="sm"
                                variant="plain"
                                color="neutral"
                                component="a"
                                // href="/blog/first-look-at-joy/"
                                sx={{
                                    alignSelf: 'center',
                                    display: { xs: 'none', sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
                                    transition: 'border 0.3s ease', // Smooth transition for the border
                                    border: '2px solid transparent', // Initially no border
                                    '&:hover': {
                                        border: '2px solid white', // Add white border on hover
                                        backgroundColor: 'transparent', // Ensure background stays transparent
                                    },
                                }}                            >
                                <SearchRoundedIcon fontSize="large" sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="See Favourites" variant="outlined">
                            <IconButton
                                onClick={() => navigate('/account/favourites')}
                                size="sm"
                                variant="plain"
                                color="neutral"
                                component="a"
                                sx={{
                                    alignSelf: 'center',
                                    display: { xs: 'none', sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
                                    transition: 'border 0.3s ease', // Smooth transition for the border
                                    border: '2px solid transparent', // Initially no border
                                    '&:hover': {
                                        border: '2px solid white', // Add white border on hover
                                        backgroundColor: 'transparent', // Ensure background stays transparent
                                    },
                                }}                            >
                                <FavoriteIcon fontSize="large" sx={{ color: 'white' }} />
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
                                    display: { sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
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
                        <Tooltip title="View Cart" variant="outlined">
                            <IconButton
                                size="sm"
                                variant="plain"
                                color="neutral"
                                component="a"
                                onClick={() => handleCartClick()}
                                sx={{
                                    alignSelf: 'center',
                                    display: { sm: 'inline-flex' }, // Hide on mobile (xs), show on sm and larger
                                    transition: 'border 0.3s ease', // Smooth transition for the border
                                    border: '2px solid transparent', // Initially no border
                                    '&:hover': {
                                        border: '2px solid white', // Add white border on hover
                                        backgroundColor: 'transparent', // Ensure background stays transparent
                                    },
                                }}                            >
                                <ShoppingCartIcon fontSize="large" sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Authorised authorised={
                            <>
                                {/* <Tooltip title="View Account" variant="outlined">
                                    <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        component="a"
                                        onClick={() => navigate('/account')}
                                        sx={{
                                            alignSelf: 'center',
                                            transition: 'border 0.3s ease', // Smooth transition for the border
                                            border: '2px solid transparent', // Initially no border
                                            '&:hover': {
                                                border: '2px solid white', // Add white border on hover
                                                backgroundColor: 'transparent', // Ensure background stays transparent
                                            },
                                        }}                            >
                                        <AccountCircle fontSize="large" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip> */}
                            </>
                        } />
                        {/* <Dropdown>
                            <MenuButton
                                variant="plain"
                                size="sm"
                                sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
                            >
                                <Avatar
                                    src=""
                                    srcSet=""
                                    sx={{ maxWidth: '32px', maxHeight: '32px' }}
                                />
                            </MenuButton>
                            <Menu
                                placement="bottom-end"
                                size="sm"
                                sx={{
                                    zIndex: '99999',
                                    p: 1,
                                    gap: 1,
                                    '--ListItem-radius': 'var(--joy-radius-sm)',
                                }}
                            >
                                <MenuItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src="https://i.pravatar.cc/40?img=2"
                                            srcSet="https://i.pravatar.cc/80?img=2"
                                            sx={{ borderRadius: '50%' }}
                                        />
                                        <Box sx={{ ml: 1.5 }}>
                                            <Typography level="title-sm" textColor="text.primary">
                                                Rick Sanchez
                                            </Typography>
                                            <Typography level="body-xs" textColor="text.tertiary">
                                                rick@email.com
                                            </Typography>
                                        </Box>
                                    </Box>
                                </MenuItem>
                                <ListDivider />
                                <MenuItem>
                                    <HelpRoundedIcon />
                                    Help
                                </MenuItem>
                                <MenuItem>
                                    <SettingsRoundedIcon />
                                    Settings
                                </MenuItem>
                                <ListDivider />
                                <MenuItem component="a" href="/blog/first-look-at-joy/">
                                    First look at Joy UI
                                    <OpenInNewRoundedIcon />
                                </MenuItem>
                                <MenuItem
                                    component="a"
                                    href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
                                >
                                    Sourcecode
                                    <OpenInNewRoundedIcon />
                                </MenuItem>
                                <ListDivider />
                                <MenuItem>
                                    <LogoutRoundedIcon />
                                    Log out
                                </MenuItem>
                            </Menu>
                        </Dropdown> */}
                    </Box>
                </Box >
            </Box >
        </>
    );
}