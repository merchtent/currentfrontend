import { Box, Link, Typography } from '@mui/joy'
import React from 'react'
import ContactUsInfo from '../../../general/components/ContactUsInfo'
import FAQs from '../../../general/FAQs'

const Help = () => {
    return (
        <Box>
            <h2>MY ACCOUNT</h2>
            <h3>HELP</h3>
            <Typography>Any issues contact us here at <Link href="mailto:hello@merchtent.com.au">hello@merchtent.com.au</Link></Typography>
        </Box>
    )
}

export default Help