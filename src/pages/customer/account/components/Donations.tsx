import { Box, Table, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { Donation, DonationDTO } from '../../../../models/donation';
import { useSnackbar } from '../../../../context/snackbar/SnackbarContext';
import axios, { AxiosResponse } from 'axios';
import { urlDonations } from '../../../../endpoints';

const Donations = () => {

    const [donations, setDonations] = useState<DonationDTO>({});

    const { showMessage } = useSnackbar(); // Using the snackbar

    const fetchDonations = async () => {
        try {
            const response: AxiosResponse<DonationDTO> = await axios.get(`${urlDonations}/token`);
            setDonations(response.data);

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
                } else if (error.request) {
                    showMessage('No response from the server. Please try again later.', 'error');
                } else {
                    showMessage(`Error: ${error.message}`, 'error');
                }
            } else {
                showMessage('An unexpected error occurred. Please try again later.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchDonations();
    }, [])

    return (
        <>
            <Box>
                <h2>MY ACCOUNT</h2>
                <h3>DONATIONS</h3>
                <Typography>Thank you, you're purchases and sales are directly supporting local music and artists.</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '80%', gap: 1 }}>
                <Box>
                    <Box>
                        <h2>As a Buyer</h2>
                    </Box>
                    {donations.buyerDonations ?
                        <Table aria-label="basic table">
                            <thead>
                                <tr>
                                    <th>CHARITY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.buyerDonations.map((donation, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{donation.charity}</td>
                                            <td>${donation.amount} AUD</td>
                                        </tr>
                                    </>
                                ))}

                            </tbody>
                        </Table>
                        :
                        <><Box sx={{ textAlign: 'center' }}>No donations yet.</Box></>}
                </Box>
                <Box>
                    <Box>
                        <h2>As a Seller</h2>
                    </Box>
                    {donations.sellerDonations ?
                        <Table aria-label="basic table">
                            <thead>
                                <tr>
                                    <th>CHARITY</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.sellerDonations.map((donation, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{donation.charity}</td>
                                            <td>${donation.amount} AUD</td>
                                        </tr>
                                    </>
                                ))}

                            </tbody>
                        </Table>
                        :
                        <><Box sx={{ textAlign: 'center' }}>No donations yet.</Box></>}
                </Box>
            </Box>
        </>
    )
}

export default Donations