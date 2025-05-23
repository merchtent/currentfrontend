import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import { useNavigate } from 'react-router-dom';
import { CartState } from '../../pages/shop/Cart';
import { IconButton, Stack, Tooltip } from '@mui/joy';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface NavigationProps {
    updateCartState: (newState: Partial<CartState>) => void;
    closeDrawer: () => void; // Add this line to close the drawer
}

export const Navigation: React.FC<NavigationProps> = ({ updateCartState, closeDrawer }) => {
    const navigate = useNavigate()

    const handleNavigation = (path: any) => {
        navigate(path);
        closeDrawer(); // Close the drawer after navigating
    };

    const handleCartClick = () => {
        // Example usage of the function passed from the parent
        closeDrawer(); // Close the drawer after navigating
        updateCartState({ right: true });
    };

    return (
        <>
            <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
                <ListItem nested>
                    <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
                        MENU
                    </ListSubheader>
                    <List aria-labelledby="nav-list-browse">
                        <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/")}>
                                <ListItemContent>Home</ListItemContent>
                            </ListItemButton>
                        </ListItem>

                        <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/about-us")}>
                                <ListItemContent>About</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/news")}>
                                <ListItemContent>News</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
                        CATEGORIES
                    </ListSubheader>
                    <List aria-labelledby="nav-list-browse">
                        <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/categories/tees")}>
                                <ListItemContent>Tees</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/categories/hoodies")}>
                                <ListItemContent>Hoodies</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/artists")}>
                                <ListItemContent>Artists</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <ListSubheader sx={{ letterSpacing: '2px', fontWeight: '800' }}>
                        SHOP
                    </ListSubheader>
                    <List aria-labelledby="nav-list-browse">
                        <ListItem>
                            <ListItemButton onClick={() => handleCartClick()}>
                                <ListItemContent>View Cart</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        {/* <ListItem>
                            <ListItemButton onClick={() => handleNavigation("/account/favourites")}>
                                <ListItemContent>Favourites</ListItemContent>
                            </ListItemButton>
                        </ListItem> */}
                    </List>
                </ListItem>
            </List>
            <Stack
                direction="row"
                sx={{
                    justifyContent: 'left',
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
                            transition: 'border 0.3s ease', // Smooth transition for the border
                            border: '2px solid transparent', // Initially no border
                            '&:hover': {
                                border: '2px solid white', // Add white border on hover
                                backgroundColor: 'transparent', // Ensure background stays transparent
                            },
                        }}
                    >
                        <FacebookIcon fontSize="large" sx={{ color: 'black' }} />
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
                            transition: 'border 0.3s ease', // Smooth transition for the border
                            border: '2px solid transparent', // Initially no border
                            '&:hover': {
                                border: '2px solid white', // Add white border on hover
                                backgroundColor: 'transparent', // Ensure background stays transparent
                            },
                        }}
                    >
                        <InstagramIcon fontSize="large" sx={{ color: 'black' }} />
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
                            transition: 'border 0.3s ease', // Smooth transition for the border
                            border: '2px solid transparent', // Initially no border
                            '&:hover': {
                                border: '2px solid white', // Add white border on hover
                                backgroundColor: 'transparent', // Ensure background stays transparent
                            },
                        }}
                    >
                        <YouTubeIcon fontSize="large" sx={{ color: 'black' }} />
                    </IconButton>
                </Tooltip> */}
            </Stack>
        </>
    );
}