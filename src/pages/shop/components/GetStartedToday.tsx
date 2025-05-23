import { Box, Grid, Typography } from '@mui/joy'

import React from 'react'
import YellowButton from '../../../components/app/YellowButton'

const GetStartedToday = () => {
    return (
        <Box sx={{
            minHeight: '25vh',
            background: '#fcd157'
        }}>
            <Grid
                container
                spacing={2}
                sx={{
                    width: '80%',
                    margin: 'auto',
                    pt: 6,
                    pb: 6
                }}
            >
                <Grid xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: 2,
                            borderRadius: 'lg',
                            height: '100%',
                        }}
                    >
                        <Typography level='h1'>Get started today 100% free</Typography>
                        <YellowButton title={'Get started'} url={''} sx={{ mt: 4, background: 'black', color: 'white', maxWidth: '300px', height: '50px' }} />
                    </Box>
                </Grid>
                <Grid xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            borderRadius: 'lg',
                            height: '100%',
                        }}
                    >
                        <img src='https://printify.com/pfh/assets/call-to-action.webp' width={'50%'} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GetStartedToday;
