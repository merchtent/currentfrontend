import { Box, Typography } from '@mui/joy'
import React from 'react'

const Dashboard = () => {
    return (
        <>
            <Box sx={{
                height: 'auto'
            }}>
                {/* First Section */}
                <Box
                    sx={{
                        width: '100vw',
                        minHeight: '30vh',
                        display: 'flex',            // Use flexbox
                        flexDirection: 'column',    // Stack items vertically
                        alignItems: 'center',       // Center horizontally
                        justifyContent: 'center',
                        marginBottom: '2vh'    // Center vertically
                    }}
                >
                    <Box
                        sx={{
                            width: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography level='title-lg'>FAN DASHBOARD</Typography>
                    </Box>
                </Box>

                {/* Second Section */}
                <Box
                    sx={{
                        width: '100vw',
                        minHeight: '30vh',
                        display: 'flex',            // Use flexbox
                        flexDirection: 'column',    // Stack items vertically
                        alignItems: 'center',       // Center horizontally
                        justifyContent: 'center',
                        marginBottom: '2vh'    // Center vertically
                    }}
                >
                    <Box
                        sx={{
                            width: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography level='title-lg'>SECTION 2</Typography>
                    </Box>
                </Box>

                {/* Third Section */}
                <Box
                    sx={{
                        width: '100vw',
                        minHeight: '30vh',
                        display: 'flex',            // Use flexbox
                        flexDirection: 'column',    // Stack items vertically
                        alignItems: 'center',       // Center horizontally
                        justifyContent: 'center',
                        marginBottom: '2vh'    // Center vertically
                    }}
                >
                    <Box
                        sx={{
                            width: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography level='title-lg'>SECTION 3</Typography>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default Dashboard