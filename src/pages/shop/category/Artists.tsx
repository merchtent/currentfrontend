import { Box, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../../../context/shop/ShopContext';
import { Artist } from '../../../models/artist';
import { ArtistsGrid } from '../../../components/artists/ArtistGrid';

const Artists = () => {

    const navigate = useNavigate();

    const { artists, fetchArtists } = useShopContext();
    const [filteredartists, setFilteredArtists] = useState<Artist[]>([]);

    useEffect(() => {
        setFilteredArtists(artists);
    }, [artists]);

    useEffect(() => {
        fetchArtists()
    }, [])

    return (
        <>
            <Box sx={{
                height: 'auto'
            }}>
                {/* First Section */}
                <Box
                    sx={{
                        width: '100vw',
                        height: 'auto',
                        backgroundColor: 'secondary.500', // Example background color
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '4vh',
                        marginBottom: '4vh'
                    }}
                >
                    <Box
                        sx={{
                            width: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'cenpm nter',
                        }}
                    >
                        <Typography level='title-lg'>ARTISTS</Typography>
                    </Box>
                </Box>

                {/* Second Section */}
                <Box
                    sx={{
                        width: '100vw',
                        minHeight: '30vh',
                        display: 'flex',            // Use flexbox
                        flexDirection: 'column',    // Stack items vertically
                        alignItems: 'center',       // Center horizontally
                        justifyContent: 'center',
                        marginBottom: '2vh'    // Center vertically
                    }}
                >
                    <Box
                        sx={{
                            width: '100vw',
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens and horizontally on larger ones
                            justifyContent: 'center',
                        }}
                    >
                        {artists && (
                            <>
                                <ArtistsGrid artists={artists} />
                            </>
                        )}
                    </Box>

                </Box>
            </Box >
        </>
    )
}

export default Artists