import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Link } from '@mui/joy';
import UnderConstruction from '../../components/app/UnderConstruction';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import InfoBox from '../../components/app/InfoBox';
import InfoContainer from '../../components/app/InfoContainer';

const Gigs = () => {

    const sampleGigData = [
        {
            bandName: 'The Local Heroes',
            venue: 'The Rock Den',
            cost: '£10',
            address: '123 Rock St, London, UK',
            time: '8:00 PM',
            date: 'March 20, 2025',
            imageUrl: 'https://picsum.photos/800/800?random=1', // Replace with actual image URL
        },
        {
            bandName: 'Echoed Souls',
            venue: 'The Basement Club',
            cost: '£7',
            address: '456 Underground Ave, London, UK',
            time: '9:00 PM',
            date: 'March 22, 2025',
            imageUrl: 'https://picsum.photos/800/800?random=2', // Replace with actual image URL
        },
    ];

    const styles = {
        cardContainer: {
            display: 'flex',
            width: '100%',
            marginBottom: '16px',
            maxHeight: '25vh',
            borderRadius: '25px'
        },
        imageContainer: {
            width: '30%',
            paddingRight: '16px',
        },
        image: {
            width: 'auto',
            height: '23vh',
            borderRadius: '25px'
        },
        infoContainer: {
            width: '70%',
        },
    };

    return (
        <>
            <PageHeader title='Gigs' />
            <Page>
                <InfoContainer>
                    <InfoBox>
                        <UnderConstruction />
                    </InfoBox>
                </InfoContainer>
            </Page>
        </>
    );
}

export default Gigs;
