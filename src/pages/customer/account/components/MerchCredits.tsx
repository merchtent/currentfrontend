import { Box, Table, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { Donation, DonationDTO } from '../../../../models/donation';
import { useSnackbar } from '../../../../context/snackbar/SnackbarContext';
import axios, { AxiosResponse } from 'axios';
import { urlDonations, urlMerchCredits } from '../../../../endpoints';
import { MerchCredit } from '../../../../models/merchCredit';

const MerchCredits = () => {

    const [merchCredits, setMerchCredits] = useState<MerchCredit[]>([]);

    const { showMessage } = useSnackbar(); // Using the snackbar

    const fetchMerchCredits = async () => {
        try {
            const response: AxiosResponse<MerchCredit[]> = await axios.get(`${urlMerchCredits}/token`);
            setMerchCredits(response.data);

        } catch (error: any) {
            // if (axios.isAxiosError(error)) {
            //     if (error.response) {
            //         showMessage(`Error: ${error.response.data.message || error.message}`, 'error');
            //     } else if (error.request) {
            //         showMessage('No response from the server. Please try again later.', 'error');
            //     } else {
            //         showMessage(`Error: ${error.message}`, 'error');
            //     }
            // } else {
            //     showMessage('An unexpected error occurred. Please try again later.', 'error');
            // }
        }
    };

    useEffect(() => {
        fetchMerchCredits();
    }, [])

    const totalCredits = merchCredits.reduce((sum, credit) => sum + (credit.credits || 0), 0);

    return (
        <>
            <Box>
                <h2>MY ACCOUNT</h2>
                <h3>MERCH CREDITS</h3>
                <Typography>Credits help towards purchases. Use them on new orders for more merch.</Typography>
            </Box>
            <Box>
                <h3>TOTAL AVAILABLE CREDITS</h3>
                <h3>{totalCredits}</h3>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '80%', gap: 1, mt: 4 }}>
                <Box>
                    {merchCredits && merchCredits.length > 0 ?
                        <Table aria-label="basic table">
                            <thead>
                                <tr>
                                    <th>ORDER NUMBER</th>
                                    <th>CREDITS EARNED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {merchCredits.map((cred, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{cred.orderNumber}</td>
                                            <td>{cred.credits}</td>
                                        </tr>
                                    </>
                                ))}

                            </tbody>
                        </Table>
                        :
                        <><Box sx={{ textAlign: 'center' }}>No merch credits yet.</Box></>}
                </Box>
            </Box>
        </>
    )
}

export default MerchCredits