import { Box, Container, Divider, Link, Typography } from "@mui/joy";
import React from "react";

const SizeChart: React.FC = () => {
    return (
        <Container sx={{ py: 4, maxWidth: "md" }}>
            <Typography level="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Clothing Size Chart (in CM)
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography level="body-md" sx={{ mb: 4 }}>
                    Last Updated: March 12, 2025
                </Typography>

                <Typography level="h2" sx={{ mb: 2 }}>
                    T-shirt Size Chart
                </Typography>

                {/* HTML Table for T-Shirt Sizes */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Size</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Chest (cm)</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Length (cm)</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Sleeve (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>XS</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>88</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>64</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>19</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>S</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>92</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>66</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>20</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>M</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>96</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>68</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>21</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>L</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>102</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>70</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>22</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>XL</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>108</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>72</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>23</td>
                        </tr>
                    </tbody>
                </table>

                <Divider sx={{ my: 4 }} />

                <Typography level="h2" sx={{ mb: 2 }}>
                    Hoodies Size Chart
                </Typography>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Size</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Chest (cm)</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Length (cm)</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Sleeve Length (cm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>S</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>96</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>64</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>60</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>M</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>100</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>66</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>62</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>L</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>104</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>68</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>64</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>XL</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>110</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>70</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>66</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>XXL</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>116</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>72</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>68</td>
                        </tr>
                    </tbody>
                </table>


                <Divider sx={{ my: 4 }} />
                <Box sx={{ mt: 4 }}>
                    <Typography level="body-md">
                        If you're unsure about your size or need further assistance, please <Link href="/contact-us">contact us</Link>.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default SizeChart;
