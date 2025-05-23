import React from 'react'
import PageHeader from '../../../../components/app/PageHeader'
import Page from '../../../../components/app/Page'
import { Box, Button, Link, Table, Typography } from '@mui/joy'

const Orders = () => {
    return (
        <>
            <Box>
                <h2>MY ACCOUNT</h2>
                <h3>ORDERS</h3>
                <Typography>All your orders are listed below. We update the status on orders every day. Any issues contact us here at <Link href="mailto:hello@merchtent.com.au">hello@merchtent.com.au</Link></Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Table aria-label="basic table">
                    <thead>
                        <tr>
                            <th style={{ width: '8%' }}>
                            </th>
                            <th style={{ width: '25%' }}>ORDER NUMBER</th>
                            <th>ITEMS</th>
                            <th>PRICE</th>
                            <th>STATUS</th>
                            <th>SHIPPING</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                            >
                                <Button
                                    component="a"
                                    size="lg"
                                    fullWidth
                                    sx={{
                                        bgcolor: '#fcd157',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                        marginBottom: '1vh'
                                    }}
                                >
                                    VIEW
                                </Button>
                            </td>
                            <td>MT33252</td>
                            <td>1</td>
                            <td>$69.95</td>
                            <td>IN PRODUCTION</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                            >
                                <Button
                                    component="a"
                                    size="lg"
                                    fullWidth
                                    sx={{
                                        bgcolor: '#fcd157',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                        marginBottom: '1vh'
                                    }}
                                >
                                    VIEW
                                </Button>
                            </td>
                            <td>MT33257</td>
                            <td>2</td>
                            <td>$117.95</td>
                            <td>SHIPPED</td>
                            <td>TCY6B000012</td>
                        </tr>
                        <tr>
                            <td style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                            >
                                <Button
                                    component="a"
                                    size="lg"
                                    fullWidth
                                    sx={{
                                        bgcolor: '#fcd157',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                        marginBottom: '1vh'
                                    }}
                                >
                                    VIEW
                                </Button>
                            </td>
                            <td>MT33222</td>
                            <td>1</td>
                            <td>$69.95</td>
                            <td>DELIVERED</td>
                            <td>TCY6B000012</td>
                        </tr>
                        <tr>
                            <td style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                            >
                                <Button
                                    component="a"
                                    size="lg"
                                    fullWidth
                                    sx={{
                                        bgcolor: '#fcd157',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                        marginBottom: '1vh'
                                    }}
                                >
                                    VIEW
                                </Button>
                            </td>
                            <td>MT33277</td>
                            <td>3</td>
                            <td>$169.95</td>
                            <td>DELIVERED</td>
                            <td>TCY6B000158</td>
                        </tr>
                        <tr>
                            <td>
                                <Button
                                    component="a"
                                    size="lg"
                                    fullWidth
                                    sx={{
                                        bgcolor: '#fcd157',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#d4a847',
                                        },
                                        marginBottom: '1vh'
                                    }}
                                >
                                    VIEW
                                </Button>
                            </td>
                            <td>MT33147</td>
                            <td>1</td>
                            <td>$69.95</td>
                            <td>DELIVERED</td>
                            <td>TCY6B000012</td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
        </>
    )
}

export default Orders