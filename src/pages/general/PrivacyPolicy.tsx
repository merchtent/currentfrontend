import { Box, Card, Container, Divider, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';

const PrivacyPolicy = () => {
    return (
        <>
            <PageHeader title='Privacy Policy' />
            <Page>
                <Container sx={{ py: 4, maxWidth: "md" }}>
                    <Typography level="body-md" sx={{ mb: 2 }}>Effective Date: 01/03/2025</Typography>

                    <Typography level="h2" sx={{ mt: 3 }}>1. Introduction</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>Welcome to Merch Tent. We respect your privacy and are committed to protecting your personal information.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>2. Information We Collect</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>We collect information that you provide to us directly, such as when you create an account, place an order, or contact customer support. This may include your name, email, shipping address, and payment details.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>3. How We Use Your Information</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>We use your information to process transactions, improve our services, and communicate with you about orders, promotions, and updates.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>4. Sharing Your Information</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>We do not sell your personal information. However, we may share it with third-party services that help us operate our business, such as payment processors and shipping providers.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>5. Security</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>We implement security measures to protect your personal data, but please be aware that no method of transmission over the internet is 100% secure.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>6. Your Rights</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>7. Changes to This Policy</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>We may update this privacy policy from time to time. We encourage you to review it periodically.</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography level="h2" sx={{ mt: 3 }}>8. Contact Us</Typography>
                    <Typography level="body-md" sx={{ mb: 2 }}>If you have any questions about this privacy policy, please contact us at hello@merchtent.com.au</Typography>
                </Container>
            </Page>
        </>
    );
}

export default PrivacyPolicy;
