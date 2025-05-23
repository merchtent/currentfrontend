import { Box } from '@mui/joy'
import React, { useEffect } from 'react'
import Create from '../../../../artist/products/create/CreateProduct'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {

    const navigate = useNavigate()

    useEffect(() => {
        //navigate('/artist/createproduct')
    }, [])

    return (
        <Box>
            <h2>MY ACCOUNT</h2>
            <h3>CREATE PRODUCT</h3>
            <Box sx={{ width: '100%' }}>
                <Create />
            </Box>
        </Box>
    )
}

export default CreateProduct