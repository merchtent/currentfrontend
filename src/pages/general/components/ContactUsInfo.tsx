import { Box, Typography, Card, Link } from "@mui/joy";
import React from 'react';
import InfoContainer from "../../../components/app/InfoContainer";
import InfoBox from "../../../components/app/InfoBox";

const ContactUsInfo = () => {
    return (
        <InfoContainer>
            <InfoBox>
                <Typography level="body-md">
                    For any inquiries, feel free to reach out to us.
                </Typography>
                <Typography level="body-md">
                    Email: <Link href="mailto:hello@merchtent.com.au">hello@merchtent.com.au</Link>
                </Typography>
            </InfoBox>
        </InfoContainer>
    )
}

export default ContactUsInfo