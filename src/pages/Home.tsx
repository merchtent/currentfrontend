import { Box, Button, Grid, Typography } from '@mui/joy'
import { Product } from '../models/productCard'
import ProductCard from './customer/product/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useShopContext } from '../context/shop/ShopContext';
import { useEffect } from 'react';
import mainBanner from '../assests/banners/banner_3.png'
import halloween from '../assests/banners/halloween_sale.png'
import signup from '../assests/banners/spank_banner_2.png'
import BlogPreview from './shop/blog/BlogPreview';
import blogImage1 from '../assests/blog/blog1.png'
import allmerch from '../assests/banners/banner_3.png'
import signUpImage from '../assests/images/signup.png'
import MerchOutInTheWild from './shop/components/MerchOutInTheWild';
import MailingList from './general/components/MailingList';
import Page from '../components/app/Page';
import InfoContainer from '../components/app/InfoContainer';
import InfoBox from '../components/app/InfoBox';
import PageHeader from '../components/app/PageHeader';
import image from '../assests/images/about_us.png'
import YellowButton from '../components/app/YellowButton';

const Home = () => {

    const navigate = useNavigate();

    const { fetchFeaturedProducts, featuredProducts, latestProducts, fetchLatestProducts, blogs, fetchBlogs } = useShopContext();

    useEffect(() => {
        fetchFeaturedProducts(5)
        fetchLatestProducts(5)
        fetchBlogs();
    }, [])

    return (
        <>
            <Box sx={{
                height: 'auto'
            }}>
                {/* First Section */}
                {/* <Box
                    sx={{
                        width: '100vw',
                        backgroundColor: 'primary.500', // Example background color
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src="https://24hundred.net/cdn/shop/files/HEADER-D2C_1_2000x.png?v=1718235432"
                        alt="Banner"
                        style={{
                            width: '100%', // Make image fill the parent container's width
                            height: 'auto', // Maintain aspect ratio
                        }}
                    />
                </Box> */}
                {/* <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium and up
                        height: { xs: "auto" }, // Adjust height for mobile
                        width: "100%",
                        margin: "0 auto", // Center horizontally
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            margin: "0 auto", // Center horizontally
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        <img
                            src={mainBanner}
                            alt="Banner"
                            style={{
                                width: '100%', // Make image fill the parent container's width
                                maxHeight: '60vh',
                                // borderRadius: '25px',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                </Box> */}
                {/* <Box
                    sx={{
                        height: { xs: "auto", md: "auto" }, // Adjust height for mobile
                        width: "90%",
                        margin: "auto", // Center horizontally
                        mt: 2,
                        gap: 2,
                        textAlign: 'center'
                    }}
                >
                    <Typography level='title-md'>WHAT THE HECK IS MERCH TENT?</Typography>
                    <Typography>                                At the heart of the online shop is a deep commitment to supporting local and unsigned bands, providing them with a platform to create and sell merchandise without the financial barriers that often come with it. Having been in numerous bands ourselves, we know firsthand how expensive and inaccessible merch production can be, especially for emerging artists trying to make their mark.
                    </Typography>


                </Box> */}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium and up
                        height: { xs: "auto", md: "auto" }, // Adjust height for mobile
                        width: "90%",
                        margin: "auto", // Center horizontally
                        mt: 3,
                        gap: { xs: 2, md: 2 }
                    }}
                >
                    <Box
                        sx={{
                            flexBasis: "50%",
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={allmerch} // Replace with your image source
                            alt="Bottom Image"
                            sx={{
                                width: "100%",
                                height: "32%",
                                objectFit: "cover",
                                borderRadius: '25px',
                                minHeight: { xs: '20vh', md: '50vh' }
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flexBasis: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            component="img"
                            onClick={() => navigate(`/categories/artists?id=spank-the-90s`)}
                            src={signup} // Replace with your image source
                            alt="Bottom Image"
                            sx={{
                                width: "100%",
                                height: "32%",
                                objectFit: "cover",
                                borderRadius: '25px',
                                minHeight: { xs: '20vh', md: '50vh' },
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Box>
                {/* <Box
                    sx={{
                        width: '90vw',
                        height: 'auto',
                        backgroundColor: 'secondary.500', // Example background color
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '4vh',
                        marginBottom: '4vh',
                        margin: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            mt: 1
                        }}
                    >g
                        <Typography level='title-lg'>LATEST MERCH</Typography>

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
                        {latestProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </Box>
                </Box> */}
                {/* <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium and up
                        height: { xs: "auto", md: "auto" }, // Adjust height for mobile
                        width: "90%",
                        margin: "0 auto", // Center horizontally
                        mt: 2,

                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            flexBasis: "50%",
                            textAlign: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            src={allmerch} // Replace with your image source
                            alt="Bottom Image"
                            sx={{
                                width: "100%",
                                height: "32%",
                                objectFit: "cover",
                                borderRadius: '25px',
                                margin: '1vh',
                                minHeight: '50vh'
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flexBasis: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            component="img"
                            src={signup} // Replace with your image source
                            alt="Bottom Image"
                            sx={{
                                width: "100%",
                                height: "32%",
                                objectFit: "cover",
                                borderRadius: '25px',
                                margin: '1vh',
                                minHeight: '50vh'
                            }}
                        />
                    </Box>
                </Box> */}

                {/* Second Section */}
                <Box
                    sx={{
                        width: '90%',
                        height: 'auto',
                        backgroundColor: 'secondary.500', // Example background color
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '4vh',
                        marginBottom: '4vh',
                        margin: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                        }}
                    >
                        <Typography level='title-lg'>FEATURED MERCH</Typography>
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
                <PageHeader title='ABOUT US' />
                <Page>
                    <InfoContainer>
                        <InfoBox>
                            <Grid container spacing={2}>
                                <Grid xs={12} md={6}>
                                    <img
                                        src={image}
                                        alt="Merch Tent"
                                        style={{ width: "100%", borderRadius: "8px" }}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <Typography level="body-md">
                                        We are a passionate, locally founded startup with a mission to empower independent musicians by giving them
                                        the tools they need to create and sell their own merchandise. We understand the struggles of emerging artists
                                        firsthand because we’ve been there—balancing the dream of making music while trying to afford the essentials.
                                    </Typography>
                                    <Typography level="body-md" mt={1}>
                                        Our platform removes the typical financial roadblocks that come with producing merch. Bands and artists can
                                        design their own apparel and accessories without the upfront costs or inventory worries. Instead of investing
                                        in bulk orders, they can list their designs and make them available to fans instantly.
                                    </Typography>
                                    <Typography level="body-md" mt={2}>
                                        But we’re more than just a merch platform—we’re a community. Our store doesn’t just support artists; it fuels
                                        the local music ecosystem. A portion of every purchase goes toward initiatives that nurture emerging talent,
                                        fund music programs, and keep independent venues alive.
                                    </Typography>
                                    <Typography level="body-md" mt={2}>
                                        We offer a diverse range of high-quality products, from t-shirts and hoodies to posters and accessories, all
                                        designed to help artists express their identity while giving fans something unique to support their favorite
                                        bands. Every item is made with care, ensuring that both artists and supporters receive something they can be
                                        proud of.
                                    </Typography>
                                    <Typography level="body-md" mt={2}>
                                        At the core of our mission is the belief that music should be accessible, and so should the opportunities that
                                        come with it. We’re here to level the playing field, making it easier for independent artists to focus on what
                                        matters most—their music and their fans. By shopping with us, you’re not just buying merch—you’re helping
                                        sustain a movement that keeps grassroots music alive and thriving.
                                    </Typography>
                                    <Typography level="body-md" mt={2}>
                                        Hope to have you on the platform soon.
                                    </Typography>
                                    <Typography level="body-md" mt={2}>
                                        Merch Tent
                                    </Typography>
                                </Grid>
                            </Grid>
                        </InfoBox>
                    </InfoContainer>
                </Page>
                {/* Info Section */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',            // Use flexbox
                        flexDirection: 'column',    // Stack items vertically
                        alignItems: 'center',       // Center horizontally
                        justifyContent: 'center',
                        marginBottom: '2vh',
                        backgroundColor: '#fcd157',
                        pb: 2,
                        margin: 'auto'
                        // background: 'linear-gradient(135deg, #fcd157 85%, white 50%)', // Two-color background with an angled divider
                        // Center vertically
                    }}
                >
                    <Box sx={{ width: '90%', display: "flex", flexDirection: { xs: "column", md: "row" }, mt: 4, gap: { xs: 0, md: 5 } }}>
                        <Box>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    padding: 1
                                }}
                            >
                                <Typography level='title-lg'>ARE YOU AN ARTIST OR BAND?</Typography>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    padding: 1
                                }}
                            >
                                <Typography level='body-lg'>Sign up to Merch Tent and create your own merch instantly.</Typography>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    padding: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        padding: 1,
                                        background: 'white',
                                        borderRadius: '5px',
                                        p: 1, m: 1
                                    }}
                                >
                                    <Typography level='body-lg'>100% Free to use</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        padding: 1,
                                        background: 'white',
                                        borderRadius: '5px',
                                        p: 1, m: 1
                                    }}
                                >
                                    <Typography level='body-lg'>Australia Wide Delivery</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        padding: 1,
                                        background: 'white',
                                        borderRadius: '5px',
                                        p: 1, m: 1
                                    }}
                                >
                                    <Typography level='body-lg'>Sell Your Merch</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        padding: 1,
                                        background: 'white',
                                        borderRadius: '5px',
                                        p: 1, m: 1
                                    }}
                                >
                                    <Typography level='body-lg'>Earn Money</Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    padding: 1,
                                    textAlign: 'center', // Center the text
                                }}
                            >
                                <Typography level='body-md'>
                                    Unleash your artistry and amplify your brand with our electrifying print-on-demand service designed for musicians, bands, and artists!
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: 1,
                                    textAlign: 'center', // Center the text
                                }}
                            >
                                <Typography level='body-md'>
                                    Craft unique merch that resonates with your vibe using our user-friendly online designer—no upfront costs or cluttered inventory in sight. No pricey bulk orders, sell & print on demand.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: 1,
                                    textAlign: 'center', // Center the text
                                }}
                            >
                                <Typography level='body-md'>
                                    Leverage Merch Tent's online store, and simply share the links to your products over your socials, at gigs using QR codes or word of mouth to let everyone know your band now has merch!
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: 1,
                                    textAlign: 'center', // Center the text
                                }}
                            >
                                <Typography level='body-md'>
                                    Every piece is printed fresh to order, keeping it eco-friendly and reducing waste while you rock the stage.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: 1,
                                    textAlign: 'center', // Center the text
                                }}
                            >
                                <Typography level='body-md'>
                                    Turn your passion into profit as you groove your way to earnings with every sale, connecting with fans like never before!
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    padding: 1,
                                    textAlign: 'center', // Center the text
                                    mt: 2
                                }}
                            >
                                <Typography level='body-md'>
                                    Merch Tent will be launching officially in the next few months, so register your interest to get you band/artist on the platform.
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    padding: 1
                                }}
                            >
                                <Button
                                    size="md"
                                    sx={{
                                        p: 1.5,
                                        bgcolor: 'white',
                                        color: 'text.primary',
                                        '&:hover': {
                                            bgcolor: '#f2f2f2',
                                        },
                                        minWidth: '200px',
                                        mb: 2
                                    }}
                                    // onClick={() => navigate('/register')}
                                    onClick={() => navigate('/interested')}
                                >
                                    Register Interest Now
                                </Button>
                            </Box>

                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <img src={signUpImage} width={300} style={{ borderRadius: '25px' }} />
                        </Box>
                    </Box>

                </Box>

                {/* Latest Merch */}
                <Box
                    sx={{
                        width: '90%',
                        height: 'auto',
                        backgroundColor: 'secondary.500', // Example background color
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '4vh',
                        marginBottom: '4vh',
                        margin: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            mt: 1
                        }}
                    >
                        <Typography level='title-lg'>LATEST MERCH</Typography>

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
                        {latestProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </Box>
                </Box>
                <MerchOutInTheWild />
                {/* News Section*/}
                <MailingList />
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '50vh',
                        display: 'flex',            // Use flexbox
                        flexDirection: 'column',    // Stack items vertically
                        alignItems: 'center',       // Center horizontally
                        justifyContent: 'center',
                        marginBottom: '2vh'    // Center vertically
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center',
                            padding: 1
                        }}
                    >
                        <Typography level='title-lg'>NEWS</Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center',
                            padding: 1
                        }}
                    >
                        <Typography level='body-lg'>Latest news and updates from Merch Tent</Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '80%',
                            padding: 1,
                            textAlign: 'center', // Center the text
                        }}
                    >
                        {/* <BlogPreview
                            imageUrl={blogImage1}
                            title="Merch Tent is alive!"
                            post="Merch Tent is set to revolutionize the merch game for local and unsigned bands. By offering an on-demand merch solution, artists can now create and sell custom merchandise without the need for large upfront investments or worrying about excess inventory. 
                            This means more creative freedom and financial flexibility for bands, allowing them to focus on what they do best: making music...."
                            description="Merch Tent is set to revolutionize the merch game for local and unsigned bands. By offering an on-demand merch solution, artists can now create..."
                            id={1}
                        /> */}
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={4}>
                                    {blogs.slice(0, 2).map((post, index) => (
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
                                                    {post.description}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: 2 }}>
                            {/* Add to Cart Button */}
                            <Button
                                size="md"
                                sx={{
                                    p: 1.5,
                                    bgcolor: '#fcd157',
                                    color: 'text.primary',
                                    '&:hover': {
                                        bgcolor: '#ffdb70',
                                    },
                                }}
                                onClick={() => navigate(`/news`)}
                            >
                                See All News
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Box >
        </>
    )
}

export default Home