import React from "react";
import { Card, CardContent, Typography, Grid, Avatar, styled, Box } from "@mui/joy";
import { ArtistCard } from "./ArtistCard";
import { Artist } from "../../models/artist";

// Component for the grid layout to display artists
export const ArtistsGrid: React.FC<{ artists: Artist[] }> = ({ artists }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }, // Adjust grid layout based on screen size
            gap: 4,
            padding: 2,
        }}
    >
        {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
        ))}
    </Box>
);