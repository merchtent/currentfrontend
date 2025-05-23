import { Box, Grid, Select, Typography, Option, Button, Accordion, AccordionSummary, AccordionDetails, Modal, ModalDialog, AspectRatio } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useShopContext } from '../../context/shop/ShopContext';
import { urlShop } from '../../endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ShopProduct } from '../../models/shopProduct';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Cart, { CartState } from './Cart';
import { CartProduct } from '../../models/cart';
import MerchOutInTheWild from './components/MerchOutInTheWild';
import { Favorite } from '@mui/icons-material';
import { Favourite } from '../../models/favourite';
import { ProductImage } from '../../models/product';
import SizeChart from '../general/components/SizeChart';

interface RouteParams {
    product: string
    [key: string]: any;
}

// const images = [
//     'https://picsum.photos/800/800?random=1',
//     'https://picsum.photos/800/800?random=2',
//     'https://picsum.photos/800/800?random=3',
//     'https://picsum.photos/800/800?random=4',
//     'https://picsum.photos/800/800?random=5',
//     'https://picsum.photos/800/800?random=6',
// ];

const blogPosts = [
    {
        imageUrl: 'https://picsum.photos/800/600?random=1',
        title: 'Blog Post One',
        excerpt: 'This is a brief excerpt from the first blog post. It summarizes the key points of the article...',
    },
    {
        imageUrl: 'https://picsum.photos/800/600?random=2',
        title: 'Blog Post Two',
        excerpt: 'This is a brief excerpt from the second blog post. It provides an overview of what the blog post covers...',
    },
];

function LeftColumnImages({ data }: any) {

    const images = data?.productImages?.map((image: ProductImage) => image.url) ?? [];

    const [open, setOpen] = React.useState(false);
    const [selectedSrc, setSelectedSrc] = React.useState('');


    const handleImageClick = (src: string) => {
        setSelectedSrc(src);
        setOpen(true);
    };

    return (
        <Box sx={{ p: 2 }}>
            {/* Modal with dynamic src */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog layout="center" sx={{
                    width: '50%', height: '600', alignContent: 'center', alignItems: 'center', justifyContent: 'center'
                }}>
                    <img
                        src={selectedSrc}
                        alt="Enlarged preview"
                        loading="lazy"
                        width='500px'
                    />
                </ModalDialog>
            </Modal >
            <Cart />
            {
                data &&
                <Grid container spacing={3}>
                    <Grid xs={6} key={1}>
                        <Box
                            component="img"
                            onClick={() => handleImageClick(`data:image/png;base64,${data?.defaultImage}`)}
                            src={`data:image/png;base64,${data?.defaultImage}`}
                            alt={`Image ${1}`}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>
                    <Grid xs={6} key={2}>
                        <Box
                            component="img"
                            src={`data:image/png;base64,${data?.defaultImageBack}`}
                            onClick={() => handleImageClick(`data:image/png;base64,${data?.defaultImageBack}`)}

                            alt={`Image ${2}`}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>
                    {images.map((image: string, index: number) => (
                        <Grid xs={6} key={index + 1}>
                            <Box
                                component="img"
                                onClick={() => handleImageClick(image)}

                                src={image}
                                alt={`Image ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    aspectRatio: '1 / 1',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            }
        </Box >
    );
}

interface ProductPageProps {
    updateCartState: (newState: Partial<CartState>) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ updateCartState }) => {

    const [openSizes, setOpenSizes] = React.useState(false);

    const handleCartClick = () => {
        // Example usage of the function passed from the parent
        updateCartState({ right: true });
    };

    const { product } = useParams<RouteParams>();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const { getProduct, addToCart, addToFavourites, blogs, fetchBlogs } = useShopContext();

    const [data, setData] = useState<ShopProduct | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct(`${urlShop}/product?id=${id}`);
            if (data) {
                setData(data)
            }
        };

        fetchData();
    }, [getProduct]);

    useEffect(() => {
        fetchBlogs()
    }, [])

    const [adding, setAdding] = useState<boolean>(false)

    function addProductToCart() {
        setAdding(true)

        setTimeout(() => {
            const newProduct: CartProduct = {
                product: data?.productName ?? '',
                price: data?.price ?? 0,
                quantity: 1,
                code: `${data?.shopCode}-${selectedSize}-${selectedColour}`,
                size: selectedSize,
                colour: selectedColour,
                productId: data?.id ?? 0
            };

            addToCart(newProduct);
            // load drawer cart
            updateCartState({ right: true });

            // maybe log customers interactions here...

            setAdding(false)
        }, 1000);
    }

    const [selectedSize, setSelectedSize] = useState<string>('S'); // State to hold selected size
    const [selectedColour, setSelectedColour] = useState<string>('Black');

    const handleSizeChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
        if (newValue) {
            setSelectedSize(newValue);
        }
    };

    const handleColourChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
        if (newValue) {
            setSelectedColour(newValue);
        }
    };

    const handleFavouriteClick = (productId: number) => {
        // Create a new Favourite object with a productId and other optional data
        const newFavourite: Favourite = {
            productId: productId,
            // Optionally, you can add userId if required
            // userId: 'someUserId',
        };
        addToFavourites(newFavourite); // Pass the new Favourite object to the function
    };

    function createSlug(text: string) {
        return text
            .toLowerCase()
            .replace(/'/g, '')
            .replace(/\s+/g, '-');
    }

    const navigate = useNavigate()

    function navigateToBlogPage(title: string) {
        const slug = createSlug(title || '');
        navigate(`/news/post/${slug}/${id}`)
    }

    return (
        <>
            <Box sx={{
                height: 'auto'
            }}>
                <Modal open={openSizes} onClose={() => setOpenSizes(false)}>
                    <ModalDialog layout="center" sx={{
                        width: '50%', height: '600', alignContent: 'center', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <SizeChart />
                    </ModalDialog>
                </Modal >
                {/* First Section */}
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        {/* Left Column */}
                        <Grid xs={12} sm={5.4}>
                            {data &&
                                <Box sx={{ p: 2, borderRadius: 'sm' }}>
                                    <LeftColumnImages data={data} />
                                </Box>
                            }
                        </Grid>

                        {/* Right Column */}
                        <Grid xs={12} sm={6.6}>
                            <Box sx={{ bgcolor: 'secondary.300', p: 2, borderRadius: 'sm' }}>
                                <Box sx={{ p: 2 }}>

                                    {/* Product Title and Price with Review */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', mb: 0 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography level="h1" sx={{ mb: 1 }}>
                                                {data?.productName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', mb: 2 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography sx={{ fontSize: 'lg', color: 'text.secondary' }}>
                                                ${data?.price} AUD
                                            </Typography>
                                        </Box>
                                        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {[1, 2, 3, 4, 5].map((_, index) => (
                                                <FontAwesomeIcon key={index} icon={faStar} style={{ color: '#FFD700', marginRight: '4px' }} />
                                            ))}
                                            <Typography sx={{ ml: 1 }}>
                                                (123 Reviews)
                                            </Typography>
                                        </Box> */}
                                    </Box>
                                    {/* Size Selection */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                            Choose Size:
                                        </Typography>
                                        <Select defaultValue="M" sx={{ width: '100%' }}
                                            value={selectedSize}
                                            onChange={handleSizeChange}
                                        >
                                            <Option value="S">S</Option>
                                            <Option value="M">M</Option>
                                            <Option value="L">L</Option>
                                            <Option value="XL">XL</Option>
                                            <Option value="2XL">2XL</Option>
                                        </Select>
                                    </Box>

                                    {/* Colour Selection */}
                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                            Choose Colour:
                                        </Typography>
                                        <Select defaultValue="Black" sx={{ width: '100%' }}
                                            value={selectedColour}
                                            onChange={handleColourChange}>
                                            {data && data.productColours.map((colour, index) => {
                                                return (
                                                    <Option value={colour.value} key={index}>{colour.value}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                            Artist Description:
                                        </Typography>
                                        <Typography sx={{ mb: 1 }}>
                                            {data?.artistDescription}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ marginTop: 2 }}>
                                        {/* Find Your Perfect Fit Section */}
                                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                                            <center>Find Your Perfect Fit</center>
                                        </Typography>
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: 'sm',
                                                border: '1px solid',
                                                borderColor: 'neutral.outlinedBorder',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Button
                                                size="md"
                                                fullWidth
                                                sx={{
                                                    p: 1.5,
                                                    bgcolor: '#ecf0eb',
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        bgcolor: '#ecf0eb',
                                                    },
                                                }}
                                                onClick={() => setOpenSizes(true)}
                                            >
                                                View Size Chart
                                            </Button>
                                            {/* <Grid container spacing={2}>
                                                <Grid xs={6}>
                                                    <Button
                                                        size="md"
                                                        fullWidth
                                                        sx={{
                                                            p: 1.5,
                                                            bgcolor: '#ecf0eb',
                                                            color: 'text.primary',
                                                            '&:hover': {
                                                                bgcolor: '#ecf0eb',
                                                            },
                                                        }}
                                                    >
                                                        View Size Chart
                                                    </Button>
                                                </Grid>
                                                <Grid xs={6}>
                                                    <Button
                                                        size="md"
                                                        fullWidth
                                                        sx={{
                                                            p: 1.5,
                                                            bgcolor: '#ecf0eb',
                                                            color: 'text.primary',
                                                            '&:hover': {
                                                                bgcolor: '#ecf0eb',
                                                            },
                                                        }}
                                                    >
                                                        View Charities
                                                    </Button>
                                                </Grid>
                                            </Grid> */}
                                        </Box>
                                    </Box>
                                    {data &&
                                        <>
                                            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }}>
                                                {/* Add to Cart Button */}
                                                <Button

                                                    fullWidth
                                                    loading={adding}
                                                    sx={{
                                                        p: 1.5,
                                                        bgcolor: '#fcd157',
                                                        color: 'text.primary',
                                                        '&:hover': {
                                                            bgcolor: '#ffdb70',
                                                        },
                                                        width: '100%',
                                                        mr: 1
                                                    }}
                                                    onClick={() => addProductToCart()}
                                                >
                                                    Add to Cart
                                                </Button>
                                                {/* <Button
                                                    size="md"
                                                    loading={adding}
                                                    sx={{
                                                        p: 1.5,
                                                        bgcolor: '#fcd157',
                                                        color: 'text.primary',
                                                        '&:hover': {
                                                            bgcolor: '#ffdb70',
                                                        },
                                                        width: '70%',
                                                        mr: 1
                                                    }}
                                                    onClick={() => addProductToCart()}
                                                >
                                                    Add to Cart
                                                </Button>
                                                <Button
                                                    size="md"
                                                    loading={adding}
                                                    sx={{
                                                        p: 1.5,
                                                        bgcolor: '#ecf0eb',
                                                        color: 'text.primary',
                                                        '&:hover': {
                                                            bgcolor: '#ecf0eb',
                                                        },
                                                        width: '30%'
                                                    }}
                                                    onClick={() => handleFavouriteClick(data.id)}
                                                >
                                                    Add to Favourites
                                                </Button> */}
                                            </Box>
                                        </>}

                                    <Box sx={{ marginTop: 2 }}>
                                        {/* Shop with Confidence Section */}
                                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                                            Shop with Confidence
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid xs={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px', color: 'green' }} />
                                                    <Typography>Free returns*</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px', color: 'green' }} />
                                                    <Typography>Secure payment</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid xs={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px', color: 'green' }} />
                                                    <Typography>Quality guarantee</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '8px', color: 'green' }} />
                                                    <Typography>Local industry support</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                            Product Description:
                                        </Typography>
                                        <Typography sx={{ mb: 1 }}>
                                            {data?.productDescription}
                                        </Typography>
                                    </Box>

                                    {/* Accordion Section */}
                                    <Box sx={{ mt: 3 }}>
                                        <Accordion>
                                            <AccordionSummary>
                                                <Typography>Shipping</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box sx={{ p: 2 }}>
                                                    <Typography>
                                                        Currently we only ship to Australia. Orders are processed within 1 business day and should be with you in an average of 3-5 days.
                                                    </Typography>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion>
                                            <AccordionSummary>
                                                <Typography>Returns</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box sx={{ p: 2 }}>
                                                    <Typography>
                                                        We accept returns within 30 days of purchase for defects.
                                                    </Typography>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion>
                                            <AccordionSummary>
                                                <Typography>Charities Helped</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box sx={{ p: 2 }}>
                                                    <Typography>
                                                        A portion of every purchase goes to charities supporting local music communities.
                                                    </Typography>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
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
                            width: '90vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Box>
                            <Typography level='title-lg'><center>ABOUT THE ARTIST</center></Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
                                {data?.artist}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                {data?.artistBio}
                            </Typography>
                        </Box>
                        {data && data.artistVideoUrl && data.artistVideoUrl !== '' &&
                            <Box>
                                <div className="youtube-container">
                                    <iframe
                                        width="100%"
                                        height="auto"
                                        src={`https://www.youtube.com/embed/${data?.artistVideoUrl}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </Box>
                        }
                    </Box>
                </Box>

                {/* Blog Section */}
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
                            width: '90vw',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Box>
                            <Typography level='title-lg'><center>WHAT'S HAPPENING</center></Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={4}>
                                    {/* {blogPosts.map((post, index) => (
                                        <Grid xs={12} sm={6} key={index}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Box
                                                    component="img"
                                                    src={post.imageUrl}
                                                    alt={`Blog Post Image ${index + 1}`}
                                                    sx={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        borderRadius: '12px',
                                                        mb: 2,
                                                    }}
                                                />
                                                <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                                                    {post.title}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {post.excerpt}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))} */}
                                    {blogs.slice(0, 2).map((post, index) => (
                                        <Grid xs={12} sm={6} key={index}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <Box
                                                    component="img"
                                                    src={post.imageUrl}
                                                    alt={`Blog Post Image ${index + 1}`}
                                                    sx={{
                                                        width: '75%',
                                                        height: 'auto',
                                                        borderRadius: '12px',
                                                        mb: 2,
                                                    }}
                                                />
                                                <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                                                    {post.title}
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {post.description}
                                                </Typography>
                                                <Button sx={{
                                                    bgcolor: '#fcd157',
                                                    color: 'black',
                                                    '&:hover': {
                                                        bgcolor: '#d4a847',
                                                    }
                                                }} onClick={() => navigateToBlogPage(post.title)}>View Post</Button>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Third Section */}
                <MerchOutInTheWild />
            </Box>
        </>

    )
}

export default ProductPage