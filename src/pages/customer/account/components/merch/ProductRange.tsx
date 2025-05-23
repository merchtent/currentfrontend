import { Box, Button, Card, CardContent, CardCover, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { SupplierProductLine, SupplierProductLineDTO } from '../../../../../models/supplierProduct';
import axios, { AxiosResponse } from 'axios';
import { urlSupplierProductLines } from '../../../../../endpoints';
import { useSnackbar } from '../../../../../context/snackbar/SnackbarContext';
import YellowButton from '../../../../../components/app/YellowButton';

const ProductRange = () => {

    const [supplierProductLinesDTO, setSupplierProductLinesDTO] = useState<SupplierProductLineDTO[]>([])

    const { showMessage } = useSnackbar()

    const fetchSupplierProductLines = async () => {
        try {
            const response: AxiosResponse<SupplierProductLineDTO[]> = await axios.get(`${urlSupplierProductLines}/listing`);
            setSupplierProductLinesDTO(response.data);
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
        fetchSupplierProductLines()
    }, [])

    return (
        <Box>
            <Box>
                <h2>MY ACCOUNT</h2>
                <h3>PRODUCTS</h3>
            </Box>
            {supplierProductLinesDTO && supplierProductLinesDTO.length > 0 ?
                <Box>
                    {supplierProductLinesDTO.map((category, index: number) => {
                        return (
                            <Box>
                                <Box>
                                    <h3>
                                        {category.category}
                                    </h3>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gap: 2, // Adjust the gap between items
                                        gridTemplateColumns: {
                                            xs: 'repeat(1, 1fr)',  // Stack all cards on mobile (1 card per row)
                                            sm: 'repeat(3, 1fr)',  // 3 cards on small screens (tablets)
                                            md: 'repeat(4, 1fr)',  // 4 cards on medium screens (small laptops)
                                            lg: 'repeat(5, 1fr)',  // 5 cards on large screens (desktops)
                                        },
                                        justifyItems: 'center',  // Center the items within the grid
                                    }}
                                >
                                    {category.supplierProductLines?.map((p, i) => {
                                        return (
                                            <Card variant="outlined" sx={{ width: 300, backgroundColor: 'transparent' }}>
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <Typography level="body-sm">{p.line}</Typography>
                                                    {p.supplierProducts && p.supplierProducts[0].supplierProductImages &&
                                                        <>
                                                            {p.supplierProducts[0].supplierProductImages && p.supplierProducts[0].supplierProductImages.length > 0 &&
                                                                <img
                                                                    src={p.supplierProducts[0].supplierProductImages[0].data}
                                                                    alt="Product"
                                                                />}
                                                        </>}
                                                    <Typography level="body-xs" sx={{ marginBottom: 1 }}>
                                                        {p.description}
                                                    </Typography>
                                                    <Typography level="title-md" sx={{ color: 'success.500' }}>
                                                        {p.supplierProducts && p.supplierProducts[0].supplierProductPricings &&
                                                            <>
                                                                ARTIST PROFIT: ${p.supplierProducts[0].supplierProductPricings[0].artistProfit}
                                                            </>}
                                                    </Typography>
                                                    <Typography level="title-md" sx={{ color: 'success.500' }}>
                                                        {p.supplierProducts && p.supplierProducts[0].supplierProductPricings &&
                                                            <>
                                                                DONATION: ${p.supplierProducts[0].supplierProductPricings[0].donationAmount}
                                                            </>}
                                                    </Typography>
                                                    <Typography level="title-md" sx={{ color: 'success.550' }}>
                                                        {p.supplierProducts && p.supplierProducts[0].supplierProductPricings &&
                                                            <>
                                                                RRP: ${p.supplierProducts[0].supplierProductPricings[0].sellPrice}
                                                            </>}
                                                    </Typography>
                                                    <Box sx={{ mt: 1 }}>
                                                        <YellowButton title='Create Now' url='' sx={{ width: '100%' }} />
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
                :
                <Box>
                    <Typography>Loading...</Typography>
                </Box>}
            <Box>

            </Box>
        </Box>
    )
}

export default ProductRange