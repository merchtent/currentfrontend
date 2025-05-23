import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";
import { useShopContext } from "../../../context/shop/ShopContext";
import ProductCard from "../../customer/product/ProductCard";

const BlogPostPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get post ID from URL

    const { blogs, fetchBlogs, fetchFeaturedProducts, featuredProducts } = useShopContext();

    useEffect(() => {
        fetchBlogs();
        fetchFeaturedProducts(5);
    }, [])

    // Find the blog post by ID
    const blogPost = blogs.find((post) => post.id === Number(id));

    if (!blogPost) {
        return <Typography level="h2" sx={{ textAlign: "center", mt: 5, mb: 5 }}>Snap! Post Not Found</Typography>;
    }

    return (
        <>
            <Box
                sx={{
                    maxWidth: "80%",
                    margin: "auto",
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    minHeight: '45vh'
                }}
            >
                <Box
                    sx={{
                        margin: "auto",
                        padding: 3,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on large
                        gap: 3,
                        alignItems: "center"
                    }}
                >
                    <Box
                        sx={{
                            flex: "1",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={blogPost.imageUrl}
                            alt={blogPost.title}
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                            }}
                        />
                    </Box>

                    <Box sx={{
                        flex: "2", textAlign: "left",
                        minHeight: '30vh'
                    }}>
                        <Typography level="h1" sx={{ mb: 2 }}>
                            {blogPost.title}
                        </Typography>
                        <Typography sx={{ lineHeight: 1.8, mb: 2 }}>
                            {blogPost.post}
                        </Typography>
                        <Button
                            sx={{
                                p: 1.5,
                                bgcolor: '#fcd157',
                                color: 'text.primary',
                                '&:hover': {
                                    bgcolor: '#ffdb70',
                                },
                            }}
                            onClick={() => navigate(-1)}>
                            ← Back
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2, // Adjust the gap between items
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',  // Stack all cards on mobile (1 card per row)
                            sm: 'repeat(3, 1fr)',  // 3 cards on small screens (tablets)
                            md: 'repeat(4, 1fr)',  // 4 cards on medium screens (small laptops)
                            lg: 'repeat(5, 1fr)',  // 5 cards on large screens (desktops)
                        },
                        justifyItems: 'center',  // Center the items within the grid
                    }}
                >
                    {featuredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </Box>
            </Box>
        </>

    );
};

export default BlogPostPage;
