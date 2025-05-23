import { Box, Container, Divider, Link, Typography } from '@mui/joy';
import React from 'react';
import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';

const TermsAndConditions = () => {
    return (
        <>
            <PageHeader title='Terms & Conditions' />
            <Page>
                <Container sx={{ py: 4, maxWidth: "md" }}>
                    <Typography level="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Terms and Conditions
                    </Typography>
                    <Typography level="body-md" sx={{ mb: 4 }}>
                        Last Updated: March 12, 2025
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            1. Introduction
                        </Typography>
                        <Typography level="body-md">
                            Welcome to our online store! These Terms and Conditions govern your use of our website and services provided by [Store Name], a business registered in Australia. By using this website, you agree to comply with these terms.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            2. Use of Our Website
                        </Typography>
                        <Typography level="body-md">
                            By accessing and using our website, you agree to abide by the terms outlined here. If you do not agree with these terms, please do not use our services.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            3. Products and Availability
                        </Typography>
                        <Typography level="body-md">
                            All products on the website are subject to availability. We reserve the right to modify product offerings, prices, or discontinue products at any time without prior notice.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            4. Orders and Payment
                        </Typography>
                        <Typography level="body-md">
                            When placing an order, you agree to provide accurate and complete information. Payment for your order must be completed before shipment. We accept payments via credit cards, PayPal, and other payment methods as available on the site.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            5. Shipping and Delivery
                        </Typography>
                        <Typography level="body-md">
                            We ship to various locations across Australia. Shipping costs and delivery times may vary depending on your location. We aim to process and ship orders promptly but are not liable for delays caused by third-party couriers or events outside our control.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            6. Returns and Refunds
                        </Typography>
                        <Typography level="body-md">
                            You may return products within 30 days of receipt if they are in new, unopened, and resalable condition. Certain exclusions may apply, such as perishable goods or items marked as non-returnable. Please refer to our returns policy for full details.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            7. Privacy and Data Protection
                        </Typography>
                        <Typography level="body-md">
                            We respect your privacy and are committed to protecting your personal information. Please refer to our <Link href="/privacy-policy">Privacy Policy</Link> to understand how we collect, use, and safeguard your data.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            8. Limitation of Liability
                        </Typography>
                        <Typography level="body-md">
                            Our liability is limited to the amount paid for any goods purchased from our site. We are not responsible for any indirect, incidental, or consequential damages arising from the use of our website or products.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            9. Changes to These Terms
                        </Typography>
                        <Typography level="body-md">
                            We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page with an updated revision date. Your continued use of the website after any changes signifies your acceptance of those changes.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            10. Governing Law
                        </Typography>
                        <Typography level="body-md">
                            These Terms and Conditions are governed by and construed in accordance with the laws of Australia. Any disputes arising out of or relating to these terms shall be resolved under Australian law.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 3 }}>
                        <Typography level="h2" sx={{ mb: 1 }}>
                            11. Contact Us
                        </Typography>
                        <Typography level="body-md">
                            If you have any questions regarding these Terms and Conditions, please contact us at:
                        </Typography>
                        <Typography level="body-md">
                            Email: <Link href="mailto:support@[storename].com.au">support@[storename].com.au</Link><br />
                            Phone: [Insert Contact Number]<br />
                            Address: [Insert Physical Address in Australia]
                        </Typography>
                    </Box>
                </Container>
            </Page>
        </>
    );
}

export default TermsAndConditions;
