import React from "react";
import { Card, CardContent, Typography, Grid, Avatar, styled } from "@mui/joy";
import { Artist } from "../../models/artist";
import YellowButton from "../app/YellowButton";
import { useNavigate } from "react-router-dom";

// Styled Card with hover effect
const StyledCard = styled(Card)({
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.1)",
        cursor: 'pointer'
    },
});

export const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
    const navigate = useNavigate(); // ← Add it here

    return (
        <StyledCard sx={{ minWidth: '300px', backgroundColor: 'transparent' }}>
            <Avatar
                src={artist.profileImage}
                alt={artist.name}
                sx={{
                    width: 100,
                    height: 100,
                    marginX: "auto",
                    marginY: 2,
                }}
            />
            <CardContent>
                <Typography textAlign="center">
                    {artist.name}
                </Typography>
                <Typography textAlign="center" color="neutral">
                    {artist.genre}
                </Typography>
                <YellowButton
                    title='View Merch'
                    url=''
                    onClick={() => navigate(`/categories/artists?id=${artist.name?.toLowerCase().replaceAll(" ", "-")}`)}
                />
            </CardContent>
        </StyledCard>
    );
};