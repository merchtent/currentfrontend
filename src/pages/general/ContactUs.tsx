import { Box, Typography, Card, Link } from "@mui/joy";
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import InfoBox from "../../components/app/InfoBox";
import InfoContainer from "../../components/app/InfoContainer";
import ContactUsInfo from "./components/ContactUsInfo";

const ContactUs = () => {
    return (
        <>
            <PageHeader title='Contact Us' />
            <Page>
                <ContactUsInfo />
            </Page >
        </>
    );
}

export default ContactUs;
