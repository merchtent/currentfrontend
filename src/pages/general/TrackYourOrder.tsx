import { Box, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import OrderTracking from './components/OrderTracking';

const TrackYourOrder = () => {
    return (
        <>
            <PageHeader title='Track Your Order' />
            <Page>
                <OrderTracking />
            </Page>
        </>
    );
}

export default TrackYourOrder;
