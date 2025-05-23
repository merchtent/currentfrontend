import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Microsoft } from '@mui/icons-material';
import { urlAccounts } from '../../endpoints';
import AuthenticationContext from '../AuthenticationContext';
import { getClaims, saveToken } from '../handleJwt';
import { authenticationResponse, userCredentials } from '../auth.models';
import ColorSchemeToggle from '../../utils/ColorSchemeToggle';
import Logo from '../../images/Logo';
import Banner from '../../assests/banners/banner_1.png'
import { useSnackbar } from '../../context/snackbar/SnackbarContext';

const Login = () => {

    interface FormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement;
        password: HTMLInputElement;
        persistent: HTMLInputElement;
    }
    interface SignInFormElement extends HTMLFormElement {
        readonly elements: FormElements;
    }

    const [processing, setProcessing] = useState<any>(false)
    const [error, setErrors] = useState<string[]>([])
    const { update } = React.useContext(AuthenticationContext);
    const navigate = useNavigate()

    const { showMessage } = useSnackbar();

    async function login(credentials: userCredentials) {
        try {
            setProcessing(true); // Indicate that processing has started
            setErrors([]); // Clear previous errors

            const response = await axios.post<authenticationResponse>(`${urlAccounts}/login`, credentials);

            // Check if response status is in the success range (2xx)
            if (response.status >= 200 && response.status < 300) {
                saveToken(response.data);
                update(getClaims());
                navigate('/account');
            }
        } catch (error: any) {
            // Handle Axios errors specifically
            if (axios.isAxiosError(error)) {
                // Check if error.response exists
                if (error.response) {
                    // Server responded with a status other than 2xx
                    setErrors(error.response.data);
                    showMessage(error.response.data, 'error');
                } else {
                    // Network error or no response from the server
                    setErrors(['Network error, please try again later.']);
                    showMessage('Network error, please try again later.', 'error');
                }
            } else {
                // Handle other types of errors (e.g., unexpected errors)
                setErrors(['An unexpected error occurred.']);
                showMessage('An unexpected error occurred.', 'error');

            }
        } finally {
            // Ensure processing is set to false in all cases
            setProcessing(false);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Column on mobile, row on larger screens
                minHeight: '80vh'
            }}
        >
            {/* First Column */}
            <Box
                sx={{
                    flex: 1, // Makes it take up half the width
                    backgroundColor: 'transparent', // Optional background color
                    padding: 2,
                    display: 'flex', // Make this box a flex container
                    flexDirection: 'column', // Stack the content vertically
                    justifyContent: 'center', // Vertically center the content
                    alignItems: 'center', // Horizontally center the content
                }}
            >
                <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                    <Logo width='100' />
                    <Typography level="title-lg">Merch Tent</Typography>
                </Box>
                <Typography component="h1" level="h3">
                    Login
                </Typography>
                <Stack gap={4} sx={{ mt: 2 }}>
                    <form
                        onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                            event.preventDefault();
                            const formElements = event.currentTarget.elements;
                            const data = {
                                email: formElements.email.value,
                                password: formElements.password.value,
                                persistent: formElements.persistent.checked,
                            };
                            await login(data)
                        }}
                    >
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" />
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Checkbox size="sm" label="Remember me" name="persistent" />
                                <Typography
                                    level="title-sm"
                                    sx={{
                                        color: '#cf602b',
                                        cursor: 'pointer', // Show pointer on hover
                                        '&:hover': {
                                            textDecoration: 'underline', // Optional: add underline on hover
                                        },
                                    }}
                                    onClick={() => navigate('/account/forgot')}
                                >
                                    Forgot Password
                                </Typography>
                            </Box>
                            <Button type="submit" fullWidth loading={processing}
                                size="sm"
                                sx={{
                                    bgcolor: '#fcd157',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: '#d4a847',
                                    },
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
                <Divider
                >
                    or
                </Divider>
                <Typography component="h1" level="h3" sx={{ marginBottom: '2vh' }}>
                    Sign Up
                </Typography>
                <Stack gap={4} sx={{ mb: 2 }}>
                    <Stack gap={1}>
                        <Typography level="body-sm">
                            New to Merch Tent?{' '}
                            <Typography
                                level="title-sm"
                                sx={{
                                    color: '#cf602b',
                                    cursor: 'pointer', // Show pointer on hover
                                    '&:hover': {
                                        textDecoration: 'underline', // Optional: add underline on hover
                                    },
                                }}
                                onClick={() => navigate('/register')}
                            >
                                Sign up for an account
                            </Typography>
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            {/* Second Column */}
            <Box
                sx={{
                    flex: 1, // Makes it take up half the width
                    backgroundColor: 'background.level2', // Optional background color
                    padding: 2,
                    position: 'relative', // Ensure the box is positioned correctly
                    overflow: 'hidden', // Hide any overflow to keep the image within the box
                }}
            >
                <img
                    src={Banner}
                    style={{
                        width: '100%', // Fill the width of the box
                        height: '100%', // Fill the height of the box
                        objectFit: 'cover', // Cover the area without distorting the image
                        position: 'absolute', // Position the image absolutely
                        top: 0, // Align to the top
                        left: 0, // Align to the left
                    }}
                    alt="Banner" // Always add an alt tag for accessibility
                />
            </Box>
        </Box >
    )
}

export default Login