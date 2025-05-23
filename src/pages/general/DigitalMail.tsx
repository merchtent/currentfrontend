import { Box, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import MailingList from './components/MailingList';

const DigitalMail = () => {
    return (
        <>
            <PageHeader title='Digital Mail' />
            <Page>
                <MailingList />
            </Page>
        </>
    );
}

export default DigitalMail;
