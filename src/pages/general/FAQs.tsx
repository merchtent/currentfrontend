import PageHeader from '../../components/app/PageHeader';
import Page from '../../components/app/Page';
import React, { useState } from "react";
import { Container, Typography, Box, Divider, Accordion, AccordionSummary, AccordionDetails, Link } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
    return (
        <>
            <PageHeader title='FAQ' />
            <Page>
                <Container sx={{ py: 4, maxWidth: "md" }}>
                    <Typography level="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Frequently Asked Questions
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography level="body-md" sx={{ mb: 4 }}>
                            Last Updated: March 12, 2025
                        </Typography>

                        {/* FAQ 1 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                What sizes do you offer?
                            </Typography>
                            <Typography level="body-md">
                                We offer a wide range of sizes from XS to XXL. Our size charts are available on each product page to help you find the perfect fit.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* FAQ 2 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                How do I know what size to order?
                            </Typography>
                            <Typography level="body-md">
                                We recommend checking the size guide provided on each product page. You can also refer to our general size guide to compare measurements.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* FAQ 3 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                What is your return policy?
                            </Typography>
                            <Typography level="body-md">
                                We accept returns within 30 days of receiving your order. Items must be in new, unworn condition. For more details, refer to our <Link href="/returns-policy">Returns Policy</Link>.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* FAQ 4 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                Do you ship internationally?
                            </Typography>
                            <Typography level="body-md">
                                Currently, we only ship within Australia. However, we are working on expanding our international shipping options in the future.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* FAQ 5 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                How can I track my order?
                            </Typography>
                            <Typography level="body-md">
                                Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* FAQ 6 */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                Can I change or cancel my order after placing it?
                            </Typography>
                            <Typography level="body-md">
                                Once an order is placed, we begin processing it right away. Unfortunately, we cannot make changes or cancellations once the order is confirmed. If you need assistance, please contact us immediately.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Contact Information */}
                        <Box sx={{ mb: 3 }}>
                            <Typography level="h2" sx={{ mb: 1 }}>
                                Still have questions?
                            </Typography>
                            <Typography level="body-md">
                                If you didn’t find the answer to your question, please feel free to <Link href="/contact-us">contact us</Link>, and we’ll be happy to assist you!
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Page>
        </>
    );
}

export default FAQs;
