import { Box, Card, Link, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import InfoBox from '../../components/app/InfoBox';
import InfoContainer from '../../components/app/InfoContainer';

const Ethos = () => {
    return (
        <>
            <PageHeader title='Ethos' />
            <Page>
                <InfoContainer>
                    <InfoBox>
                        <Box>
                            <Typography level='body-md'>
                                At the heart of the online shop is a deep commitment to supporting local and unsigned bands, providing them with a platform to create and sell merchandise without the financial barriers that often come with it. Having been in numerous bands ourselves, we know firsthand how expensive and inaccessible merch production can be, especially for emerging artists trying to make their mark.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography level='body-md'>
                                This site aims to level the playing field by offering free merch creation tools, allowing bands to design their own merchandise and have it listed for sale, all while keeping costs low. By eliminating the initial financial burden, the shop gives artists the freedom to focus on their music and building their community without worrying about upfront costs or inventory management.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography level='body-md'>
                                Beyond just supporting local bands, this vision extends to the greater music community. A portion of every sale goes toward supporting music-based charities that help nurture talent, provide resources, and keep the local music scene thriving.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography level='body-md'>
                                This approach not only benefits the bands directly, but it also contributes to the broader ecosystem of music by funding initiatives that help future artists and music programs. It’s about creating a sustainable and supportive environment where local talent can grow, thrive, and give back to the community that helped them along the way.
                            </Typography>
                        </Box>
                        <Typography level="body-md" mt={2}>
                            Vibing this? <Link href="mailto:hello@merchtent.com.au">hello@merchtent.com.au</Link>
                        </Typography>
                    </InfoBox>
                </InfoContainer>
            </Page>
        </>
    );
}

export default Ethos;
