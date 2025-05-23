import { Box, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import SizeChart from './components/SizeChart';
import Page from '../../components/app/Page';

const SizeCharts = () => {
    return (
        <>
            <PageHeader title='Size Charts' />
            <Page>
                <SizeChart />
            </Page>
        </>
    );
}

export default SizeCharts;
