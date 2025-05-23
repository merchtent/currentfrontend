import { Box, Button } from '@mui/joy';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface BlogPreviewProps {
    imageUrl: string;
    title: string;
    description: string;
    post: string;
    id: number
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ imageUrl, title, description, post, id }) => {

    const navigate = useNavigate()

    function createSlug(text: string) {
        return text
            .toLowerCase()
            .replace(/'/g, '')
            .replace(/\s+/g, '-');
    }

    function navigateToBlogPage() {
        const slug = createSlug(title || '');
        navigate(`/news/post/${slug}/${id}`)
    }

    return (
        <Box className="blog-preview"
            sx={{
                display: 'flex',
                gap: '2vh',
                // borderStyle: 'solid',
                // borderColor: '#fcd157',
                padding: '10px',
                borderRadius: '25px',
                flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium and up
                margin: "auto", // Center horizontally
                mt: 2,
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '80%'
                //background: 'linear-gradient(135deg, #fcd157, 85%, white 50%)', // Two-color background with an angled divider
            }}>
            <Box>
                <img src={imageUrl} alt={title} className="blog-preview-image" style={{ borderRadius: '25px', height: '200px' }} />
            </Box>
            <Box className="blog-preview-content" sx={{ textAlign: 'left' }}>
                <h2 className="blog-preview-title">{title}</h2>
                <Box sx={{ width: '100%' }}>
                    <p className="blog-preview-description">{description}</p>
                </Box>

                <Button
                    onClick={() => navigateToBlogPage()}
                    size="md"
                    sx={{
                        p: 1.5,
                        bgcolor: '#fcd157',
                        color: 'text.primary',
                        '&:hover': {
                            bgcolor: '#d4a847',
                        },
                        mb: 2
                    }}
                >
                    Read More
                </Button>
            </Box>
        </Box>
    );
};

export default BlogPreview