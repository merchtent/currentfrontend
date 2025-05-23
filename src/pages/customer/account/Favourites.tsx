import { Box, Typography } from '@mui/joy'
import React from 'react'
import PageHeader from '../../../components/app/PageHeader'
import Page from '../../../components/app/Page'
import FavouriteList from './components/favourites/FavouriteList'

const Favourites = () => {
    return (
        <>
            <PageHeader title='FAVOURITES' />
            <Page>
                <Box sx={{ width: '80%', margin: 'auto', minHeight: '30vh' }}>
                    <FavouriteList />
                </Box>
            </Page>
        </>
    )
}

export default Favourites