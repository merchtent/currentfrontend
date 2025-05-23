import { Box, Card, Link, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import InfoContainer from '../../components/app/InfoContainer';
import InfoBox from '../../components/app/InfoBox';

const ActualMail = () => {
    return (
        <>
            <PageHeader title='Actual Mail' />
            <Page>
                <InfoContainer>
                    <InfoBox>
                        <Typography level="h3" mb={2}>
                            Coming soon
                        </Typography>
                        <Typography level="body-md">
                            Once we have enough artists & products, we're seriously gonna do a catalog!
                        </Typography>
                        <Typography level="body-md" mt={2}>
                            Register any interest: <Link href="mailto:hello@merchtent.com.au">hello@merchtent.com.au</Link>
                        </Typography>
                    </InfoBox>
                </InfoContainer>
            </Page>
        </>
    );
}

export default ActualMail;
