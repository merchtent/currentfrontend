import { Box, Grid, Typography } from '@mui/joy'
import React from 'react'
import YellowButton from '../../../components/app/YellowButton'

const Investment = () => {
    return (
        <Box sx={{ flexGrow: 1, background: '#f5f5f0', margin: 'auto' }}>
            <Grid sx={{
                width: '80%',
                margin: 'auto',
                pt: 6,
                pb: 6
            }} container spacing={2} >
                <Grid xs={12} md={6}>
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 'lg',
                            height: '100%',
                            minHeight: '80vh'
                        }}
                    >
                        <Typography level='h1'>Start with $0 investment</Typography>
                        <Box sx={{ mt: 8 }}>
                            <Typography level='h3'>1. Select your product</Typography>
                            <Typography sx={{ mt: 2 }} level='body-md'>Choose from over 1000 top quality products including brands you know and love</Typography>
                        </Box>
                        <Box sx={{ mt: 8 }}>
                            <Typography level='h3'>2. Add your Artwork</Typography>
                            <Typography sx={{ mt: 2 }} level='body-md'>Designing your products is easy and fun!</Typography>
                        </Box>
                        <Box sx={{ mt: 8 }}>
                            <Typography level='h3'>3. Share your products and start selling</Typography>
                            <Typography sx={{ mt: 2 }} level='body-md'>You set your profit margin, we take care of production and delivery</Typography>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <YellowButton title={'Get Started for Free'} url={''} sx={{ width: '300px', height: '50px' }} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography level='body-md'>Learn more</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={12} md={6}>
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 'lg',
                            height: '100%',
                            minHeight: '80vh'
                        }}
                    >
                        <div className="flex items-center justify-center min-h-screen bg-gray-100">
                            <video
                                src="https://printify.com/pfh/assets/steps/design.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="rounded-2xl shadow-lg w-full max-w-sm"
                            />
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Investment