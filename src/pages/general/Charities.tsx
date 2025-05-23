import { Box, Typography, Card, Grid } from "@mui/joy"; import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import soundwave from '../../assests/images/soundwave.png'
import harmony from '../../assests/images/harmony_for_all.png'
import InfoBox from "../../components/app/InfoBox";
import InfoContainer from "../../components/app/InfoContainer";

const Charities = () => {

    const charities = [
        {
            name: "Harmony for All",
            description:
                "Harmony for All is dedicated to providing musical instruments and lessons to underprivileged youth, helping them develop their talents and find a creative outlet through music.",
            image: harmony,
            impact:
                "Through scholarships and free music education programs, they ensure that every aspiring musician gets the chance to learn and grow."
        },
        {
            name: "SoundWave Foundation",
            description:
                "The SoundWave Foundation works to preserve independent music venues and provide grants to emerging artists, ensuring that grassroots music continues to thrive.",
            image: soundwave,
            impact:
                "By funding live performance spaces and supporting struggling artists, they help keep local music alive and accessible to all."
        }
    ];

    return (
        <>
            <PageHeader title='Charities & Local Support' />
            <Page>
                <InfoContainer>
                    <InfoBox>
                        <Typography level="h2" textAlign="center" mb={2}>
                            Charities We Currently Support
                        </Typography>
                        <Grid container spacing={3}>
                            {charities.map((charity, index) => (
                                <Grid key={index} xs={12} md={6}>
                                    <Card variant="soft" sx={{ p: 2, textAlign: "center", backgroundColor: 'transparent' }}>
                                        <img
                                            src={charity.image}
                                            alt={charity.name}
                                            style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
                                        />
                                        <Typography level="h4" mb={1}>{charity.name}</Typography>
                                        <Typography level="body-md" mb={1}>{charity.description}</Typography>
                                        <Typography level="body-lg" color="neutral">
                                            {charity.impact}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </InfoBox>
                </InfoContainer>
            </Page>
        </>
    );
}

export default Charities;
