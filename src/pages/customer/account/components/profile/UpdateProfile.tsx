import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input, Select, Option, Card, Typography, Stack, Avatar, Box, Sheet } from "@mui/joy";
import axios, { AxiosResponse } from "axios";
import { urlArtists } from "../../../../../endpoints";
import { useSnackbar } from "../../../../../context/snackbar/SnackbarContext";
import InfoBox from "../../../../../components/app/InfoBox";
import YellowButton from "../../../../../components/app/YellowButton";
import { useDataContext } from "../../../../../context/data/DataContext";
import { Artist } from "../../../../../models/artist";
import { useApi } from "../../../../../context/api/ApiContext";

const states: string[] = ["VIC", "NSW", "QLD", "SA", "WA", "NT", "TAS", "ACT"];

const ArtistForm: React.FC = () => {

    const [artist, setArtist] = useState<Artist>({
        id: 0,
        name: "",
        genre: "",
        state: "",
        profileImage: "",
        bio: "",
        facebookProfile: "",
        instagramProfile: "",
        youTubeProfile: "",
        videoUrl: ""
    });

    const { showMessage } = useSnackbar(); // Using the snackbar

    const [updating, setUpdating] = useState<boolean>(false)

    const fetchArtist = async () => {
        try {
            const response: AxiosResponse<Artist> = await axios.get(`${urlArtists}/token`);
            setArtist(response.data);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
                } else if (error.request) {
                    showMessage('No response from the server. Please try again later.', 'error');
                } else {
                    showMessage(`Error: ${error.message}`, 'error');
                }
            } else {
                showMessage('An unexpected error occurred. Please try again later.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchArtist();
    }, [])

    const { genres, fetchGenres }
        = useDataContext();

    useEffect(() => {
        fetchGenres();
    }, [])

    const handleChange = (field: keyof Artist, value: string) => {
        setArtist((prev) => ({ ...prev, [field]: value }));
    };

    const { post, put } = useApi(); // Use the post function from the API context

    const handleSubmit = async () => {
        setUpdating(true)
        try {
            const response = await put<Artist, any>(`${urlArtists}/${artist.id}`, artist);
            if (response) {
                if (response?.status >= 200 && response?.status < 300) {
                    showMessage('Profile Updated', 'success');
                } else {
                    throw new Error(`Unexpected response: ${response?.statusText || 'Unknown error'}`);
                }
            }
        } catch (error) {
            showMessage("Error updating profile:", 'error');
        }
        setUpdating(false)
    };

    const handleFileChangeFront = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();

            // Define what happens when the file is read
            reader.onloadend = () => {
                const base64String = reader.result as string; // Set the Base64 string

                // Extract MIME type and file name from the file object
                const mimeType = file.type; // e.g., 'image/png', 'image/jpeg'
                const fileName = file.name; // Extract the file name

                // Create an image object to load and get dimensions (width, height)
                const img = new Image();
                img.onload = () => {
                    const imageWidth = img.width;   // Get image width
                    const imageHeight = img.height; // Get image height                   
                };

                // Load the image from the Base64 string to get its dimensions
                img.src = base64String;

                handleChange("profileImage", base64String as string)
            };

            reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
        }
    };

    return (
        <>
            {artist &&
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on medium+
                            gap: 2, // Space between columns
                        }}
                    >
                        <Box
                            sx={{
                                flex: 3, // Takes 50% width
                                display: "flex",
                            }}
                        >
                            <Stack spacing={1} width='80%'>
                                {/* Name Field */}
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input disabled={true} value={artist.name} onChange={(e) => handleChange("name", e.target.value)} required />
                                </FormControl>

                                {/* Profile Image Upload */}
                                <FormControl>
                                    <FormLabel>Profile Image</FormLabel>

                                    <Box sx={{
                                        marginBottom: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChangeFront}
                                            style={{ display: 'none' }}
                                            id="file-input-front"
                                        />
                                        <label htmlFor="file-input-front">
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                component="span"
                                                size="sm"
                                                sx={{
                                                    alignSelf: 'center',
                                                    margin: 1,
                                                    backgroundColor: 'lightgray'
                                                }}
                                            >
                                                UPLOAD PROFILE PICTURE
                                            </Button>
                                        </label>
                                    </Box>
                                </FormControl>
                                {/* Profile Image Preview (if uploaded) */}
                                <Sheet
                                    variant="outlined"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 240,
                                        height: 240,
                                        borderRadius: "12px",
                                        mx: "auto",
                                    }}
                                >
                                    {artist.profileImage &&
                                        <Avatar
                                            src={artist.profileImage}
                                            sx={{ width: 240, height: 240, borderRadius: "50%" }}
                                        />}
                                </Sheet>


                                {/* Genre Selection */}
                                <FormControl>
                                    <FormLabel>Genre</FormLabel>
                                    <Select
                                        placeholder="Select Genre"
                                        value={artist.genre}
                                        onChange={(_, value) => handleChange("genre", value as string)}
                                    >
                                        {genres.map((genre) => (
                                            <Option key={genre} value={genre}>
                                                {genre}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* State Selection */}
                                <FormControl>
                                    <FormLabel>State</FormLabel>
                                    <Select
                                        placeholder="Select State"
                                        value={artist.state}
                                        onChange={(_, value) => handleChange("state", value as string)}
                                    >
                                        {states.map((state) => (
                                            <Option key={state} value={state}>
                                                {state}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormControl>


                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                flex: 7, // Takes 50% width
                                display: "flex",
                            }}
                        >
                            <Stack spacing={1} width='80%'>
                                {/* Name Field */}
                                <FormControl>
                                    <FormLabel>Bio</FormLabel>
                                    <Input fullWidth value={artist.bio} onChange={(e) => handleChange("bio", e.target.value)} required />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Facebook Profile Url</FormLabel>
                                    <Input value={artist.facebookProfile} onChange={(e) => handleChange("facebookProfile", e.target.value)} required />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Instagram Profile Url</FormLabel>
                                    <Input value={artist.instagramProfile} onChange={(e) => handleChange("instagramProfile", e.target.value)} required />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Youtube Profile Url</FormLabel>
                                    <Input value={artist.youTubeProfile} onChange={(e) => handleChange("youTubeProfile", e.target.value)} required />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Video Url</FormLabel>
                                    <Input disabled={true} value={artist.videoUrl} onChange={(e) => handleChange("videoUrl", e.target.value)} required />
                                </FormControl>

                                <FormControl>
                                    <YellowButton title="Save Changes" url={""} onClick={() => handleSubmit()} />
                                </FormControl>
                                {/* Submit Button */}

                            </Stack>
                        </Box>
                    </Box>
                </form>
            }
        </>
    );
};

export default ArtistForm;
