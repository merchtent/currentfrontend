import React, { useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/joy';

interface FilterProps {
    onFilter: (filters: { category?: string; minPrice?: string; maxPrice?: string; artist?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
    const [category, setCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [artist, setArtist] = useState<string>('');

    const handleFilter = () => {
        onFilter({ category, minPrice, maxPrice, artist });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>Filter(s)</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px' }}>
                    <Input
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <Input
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <Input
                        placeholder="Min Price"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <Input
                        placeholder="Max Price"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Button
                    sx={{
                        bgcolor: '#fcd157',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#d4a847',
                        }
                    }}
                    onClick={handleFilter}>Apply Filter</Button>
            </Box>
        </Box>
    );
};

export default Filter;
