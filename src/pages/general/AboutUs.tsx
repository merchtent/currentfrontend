import { Box, Typography, Card, Grid } from "@mui/joy";
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import image from '../../assests/images/about_us.png'
import InfoContainer from "../../components/app/InfoContainer";
import InfoBox from "../../components/app/InfoBox";

const AboutUs = () => {
    return (
        <>
            <PageHeader title='About Us' />
            <Page>
                <InfoContainer>
                    <InfoBox>
                        <Grid container spacing={2}>
                            <Grid xs={12} md={6}>
                                <img
                                    src={image}
                                    alt="Merch Tent"
                                    style={{ width: "100%", borderRadius: "8px" }}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <Typography level="body-md">
                                    We are a passionate, locally founded startup with a mission to empower independent musicians by giving them
                                    the tools they need to create and sell their own merchandise. We understand the struggles of emerging artists
                                    firsthand because we’ve been there—balancing the dream of making music while trying to afford the essentials.
                                </Typography>
                                <Typography level="body-md" mt={1}>
                                    Our platform removes the typical financial roadblocks that come with producing merch. Bands and artists can
                                    design their own apparel and accessories without the upfront costs or inventory worries. Instead of investing
                                    in bulk orders, they can list their designs and make them available to fans instantly.
                                </Typography>
                                <Typography level="body-md" mt={2}>
                                    But we’re more than just a merch platform—we’re a community. Our store doesn’t just support artists; it fuels
                                    the local music ecosystem. A portion of every purchase goes toward initiatives that nurture emerging talent,
                                    fund music programs, and keep independent venues alive.
                                </Typography>
                                <Typography level="body-md" mt={2}>
                                    We offer a diverse range of high-quality products, from t-shirts and hoodies to posters and accessories, all
                                    designed to help artists express their identity while giving fans something unique to support their favorite
                                    bands. Every item is made with care, ensuring that both artists and supporters receive something they can be
                                    proud of.
                                </Typography>
                                <Typography level="body-md" mt={2}>
                                    At the core of our mission is the belief that music should be accessible, and so should the opportunities that
                                    come with it. We’re here to level the playing field, making it easier for independent artists to focus on what
                                    matters most—their music and their fans. By shopping with us, you’re not just buying merch—you’re helping
                                    sustain a movement that keeps grassroots music alive and thriving.
                                </Typography>
                                <Typography level="body-md" mt={2}>
                                    Hope to have you on the platform soon.
                                </Typography>
                                <Typography level="body-md" mt={2}>
                                    Merch Tent
                                </Typography>
                            </Grid>
                        </Grid>
                    </InfoBox>
                </InfoContainer>
            </Page>
        </>
    );
}

export default AboutUs;
