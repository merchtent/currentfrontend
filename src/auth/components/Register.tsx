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
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { urlAccounts } from '../../endpoints';
import AuthenticationContext from '../AuthenticationContext';
import { userCredentials, authenticationResponse, newUserCredentials } from '../auth.models';
import { saveToken, getClaims } from '../handleJwt';
import ColorSchemeToggle from '../../utils/ColorSchemeToggle';
import Banner from '../../assests/banners/banner_2.png'
import Logo from '../../images/Logo';
import { useSnackbar } from '../../context/snackbar/SnackbarContext';
import { Select, Option } from '@mui/joy';
import { useDataContext } from '../../context/data/DataContext';

const Register = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const { update } = useContext(AuthenticationContext);
    const navigate = useNavigate()
    const { showMessage } = useSnackbar();

    const [processing, setProcessing] = useState<any>(false)

    const { genres, fetchGenres }
        = useDataContext();

    useEffect(() => {
        fetchGenres();
    }, [])

    async function register(credentials: newUserCredentials) {
        try {
            setProcessing(true); // Indicate that processing has started
            setErrors([]); // Clear previous errors

            // Make the request to create the account
            const response = await axios.post<authenticationResponse>(`${urlAccounts}/create`, credentials);

            // Check for a successful response
            if (response.status >= 200 && response.status < 300) {
                saveToken(response.data);
                update(getClaims());
                navigate('/account'); // Navigate to the home page on success
            }
        } catch (error: any) {
            // Handle errors specifically
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // If the server responded with a status other than 2xx
                    setErrors(error.response.data || ['An error occurred, please try again.']);
                    showMessage(error.response.data, 'error');

                } else {
                    // If there's a network error or no response from the server
                    setErrors(['Network error, please check your connection.']);
                    showMessage('Network error, please check your connection.', 'error');
                }
            } else {
                // Handle unexpected errors
                setErrors(['An unexpected error occurred.']);
                showMessage('An unexpected error occurred.', 'error');
            }
        } finally {
            // Ensure processing is set to false in all cases
            setProcessing(false);
        }

    }

    interface FormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement;
        password: HTMLInputElement;
    }
    interface SignInFormElement extends HTMLFormElement {
        readonly elements: FormElements;
    }

    const [accountType, setAccountType] = useState('artist');

    const handleAccountTypeChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
        if (newValue) {
            setAccountType(newValue as 'artist' | 'fan');
        }

        if (newValue == 'fan') {

        }
    };

    const [newGenre, setNewGenre] = useState<string>('Acid Jazz')

    const handleGenreChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
        if (newValue) {
            setNewGenre(newValue as 'artist' | 'fan');
        }
    };

    const [state, setState] = useState<string>('VIC')

    const handleStateChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
        if (newValue) {
            setNewGenre(newValue);
        }
    };

    return (
        <>
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
                        backgroundColor: 'background.level1', // Optional background color
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
                    <Stack gap={4} sx={{ mb: 2 }}>
                        <Stack gap={1}>
                            <Typography component="h1" level="h3">
                                Sign Up
                            </Typography>
                            <Typography level="body-sm">
                                Already have an account?{' '}
                                <Typography
                                    level="title-sm"
                                    sx={{
                                        color: '#cf602b',
                                        cursor: 'pointer', // Show pointer on hover
                                        '&:hover': {
                                            textDecoration: 'underline', // Optional: add underline on hover
                                        },
                                    }}
                                    onClick={() => navigate('login')}
                                >
                                    Login
                                </Typography>
                            </Typography>
                        </Stack>
                        {/* <Button
                                variant="soft"
                                color="neutral"
                          a      fullWidth
                                startDecorator={<Microsoft />}
                            >
                                Continue with 365
                            </Button> */}
                    </Stack>
                    <Divider
                    >
                        or
                    </Divider>
                    <Stack gap={4} sx={{ mt: 2 }}>
                        {/* <form
                            onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                                event.preventDefault();
                                const formElements = event.currentTarget.elements;
                                const data = {
                                    email: formElements.email.value,
                                    password: formElements.password.value,
                                    name: 'Test',
                                    genre: 'Rock'
                                };
                                await register(data)
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
                                </Box>
                                <Button type="submit" fullWidth loading={processing}>
                                    Sign Up
                                </Button>
                            </Stack>
                        </form> */}
                        <form
                            onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                const formElements = event.currentTarget.elements as any;
                                const data = {
                                    email: formElements.email.value,
                                    password: formElements.password.value,
                                    name: accountType === 'artist' ? formElements.name.value : 'default',
                                    genre: newGenre,
                                    accountType: accountType,
                                };
                                setProcessing(true);
                                await register(data);
                                setProcessing(false);
                            }}
                        >
                            {/* Account Type Select */}
                            <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
                                <FormControl required>
                                    <FormLabel>Are you signing up as an Artist or Fan?</FormLabel>
                                    <Select
                                        name="accounttype"
                                        value={accountType}
                                        onChange={handleAccountTypeChange}
                                    >
                                        <Option value="artist">Artist (I want to sell merch)</Option>
                                        <Option value="fan">Fan (I just want to buy merch)</Option>
                                    </Select>
                                </FormControl>
                            </Box>
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Password (min 6, 1 number, 1 upper, 1 lower and special character)</FormLabel>
                                <Input type="password" name="password" />
                            </FormControl>



                            {/* Conditionally render Name and Genre fields based on account type */}
                            {accountType === 'artist' && (
                                <>
                                    <Divider
                                    >
                                        Artist Details
                                    </Divider>
                                    <FormControl required>
                                        <FormLabel>Artist / Band Name</FormLabel>
                                        <Input type="text" name="name" />
                                    </FormControl>
                                    <FormControl required>
                                        <FormLabel>Genre</FormLabel>
                                        {genres &&
                                            <>
                                                <Select
                                                    name="genre"
                                                    value={newGenre}
                                                    onChange={handleGenreChange}
                                                >
                                                    {genres.map((genre) => (
                                                        <Option key={genre} value={genre}>
                                                            {genre}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </>}
                                    </FormControl>
                                </>
                            )}

                            <Stack gap={2} sx={{ mt: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
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
                                    Sign Up
                                </Button>
                            </Stack>
                        </form>

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
        </>
    )
}

export default Register