import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { forwardRef, useImperativeHandle } from 'react';
import { IconButton, ListItemDecorator, Typography } from '@mui/joy';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../../context/shop/ShopContext';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export type CartState = {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
};

export type CartRef = {
    setState: React.Dispatch<React.SetStateAction<CartState>>;
};

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    code: string;
    onRemove: (product: string, code: string) => void;
}

const Cart = forwardRef<CartRef>((props, ref) => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // Expose the setState function to the parent
    useImperativeHandle(ref, () => ({
        setState,
    }));

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                    <ListItem key={text}>
                        <ListItemButton>{text}</ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text) => (
                    <ListItem key={text}>
                        <ListItemButton>{text}</ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, code, onRemove }) => (
        <>
            <ListItem
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderBottom: { xs: '', md: '1px solid' },
                    borderColor: { xs: '', md: 'divider' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                    <Typography level='body-xs'>{name}</Typography>
                    <Typography sx={{ fontSize: '14px' }}><b>Code: </b>{code}</Typography>
                </Box>
                <Typography level='body-xs' sx={{ mx: 1, display: { xs: 'none', md: 'block' } }}>
                    ${price}
                </Typography>
                <Typography level='body-xs' sx={{ mx: 1, display: { xs: 'none', md: 'block' } }}>
                    x{quantity}
                </Typography>
                <Typography level='body-xs' sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'block' } }}>
                    ${price * quantity}
                </Typography>
                <IconButton variant="outlined" color="danger" onClick={() => onRemove(name, code)}>
                    <Delete />
                </IconButton>
            </ListItem>
            <Box sx={{
                mt: 2, display: { xs: 'flex', md: 'none' }, flexDirection: 'row', justifyContent: '', float: 'left',
                borderBottom: { xs: '1px solid', md: '' },
                borderColor: { xs: 'divider', md: '' },
            }}>
                <Typography level='body-xs' sx={{ mx: 1, display: { xs: 'block', md: 'none' } }}>
                    ${price}
                </Typography>
                <Typography level='body-xs' sx={{ mx: 1 }}>
                    x{quantity}
                </Typography>
                <Typography level='body-xs' sx={{ fontWeight: 'bold' }}>
                    ${price * quantity}
                </Typography>
            </Box>
        </>
    );

    interface ShoppingCartListProps { }

    const ShoppingCartList: React.FC<ShoppingCartListProps> = () => {

        const { cart, removeFromCart } = useShopContext();

        return (
            <Box sx={{ width: '100%' }}>
                <Typography level="h4" sx={{ mb: 2 }}>
                    Items in your cart
                </Typography>
                <List sx={{ overflow: 'hidden' }}>
                    {cart.map((item, index) => (
                        <CartItem
                            key={index}
                            id={index}
                            name={item.product}
                            price={item.price}
                            quantity={item.quantity}
                            code={item.code}
                            onRemove={() => removeFromCart(item.product, item.code)}
                        />
                    ))}
                </List>
            </Box>
        );
    };

    const navigate = useNavigate();

    function navigateToCheckout() {
        setState({ ...state, right: false });
        navigate('/shop/checkout')
    }

    return (
        <React.Fragment>
            {(['top', 'right', 'bottom', 'left'] as const).map((anchor) => (
                <Drawer
                    size='md'
                    key={anchor}
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {/* {list(anchor)} */}
                    <Box sx={{ p: 2 }}>
                        <Box>
                            <Typography level='title-lg'>CART</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <ShoppingCartList />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {/* Add to Cart Button */}
                            <Button
                                onClick={() => navigateToCheckout()}
                                size="md"
                                fullWidth
                                sx={{
                                    p: 1.5,
                                    bgcolor: '#fcd157',
                                    color: 'text.primary',
                                    '&:hover': {
                                        bgcolor: '#ffdb70',
                                    },
                                }}
                            >
                                Checkout
                            </Button>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {/* Add to Cart Button */}
                            <Button
                                onClick={() => setState({ ...state, right: false })}
                                size="md"
                                fullWidth
                                sx={{
                                    p: 1.5,
                                    bgcolor: '#fcd157',
                                    color: 'text.primary',
                                    '&:hover': {
                                        bgcolor: '#ffdb70',
                                    },
                                }}
                            >
                                View More Merch
                            </Button>
                        </Box>
                    </Box>
                </Drawer>
            ))}
        </React.Fragment >
    )
});

export default Cart