import { Box } from '@mui/joy'
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { Artist } from '../../../../models/artist';
import { urlArtists } from '../../../../endpoints';
import { useSnackbar } from '../../../../context/snackbar/SnackbarContext';
import InfoBox from '../../../../components/app/InfoBox';
import UpdateProfile from './profile/UpdateProfile';

const Profile = () => {
    return (
        <>
            <Box>
                <h3>MY ACCOUNT</h3>
                <h2>PROFILE</h2>
            </Box>
            <UpdateProfile />
        </>
    )
}

export default Profile