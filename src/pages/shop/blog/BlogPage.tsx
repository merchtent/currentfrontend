import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/joy";
import BlogPreview from "./BlogPreview"; // Import the BlogPreview component
import { BlogPost } from "../../../models/blogPost";
import { useShopContext } from "../../../context/shop/ShopContext";

const BlogPage: React.FC = () => {

    const { blogs, fetchBlogs } = useShopContext();

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'secondary.500', // Example background color
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '4vh',
                marginBottom: '4vh'
            }}
        >
            <Typography level="h1" sx={{ textAlign: "center", mb: 2 }}>
                News
            </Typography>

            {blogs.map((blog, index) => (
                <BlogPreview
                    key={blog.id}
                    imageUrl={blog.imageUrl}
                    title={blog.title}
                    description={blog.description}
                    post={blog.post}
                    id={blog.id}
                />
            ))}

        </Box>
    );
};

export default BlogPage;
