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
import Investment from './shop/components/Investment';
import GetStartedToday from './shop/components/GetStartedToday';
import ProductShowcase from './shop/components/ProductShowcase';

const HomeAlt = () => {

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
                height: 'auto',
                width: '100%'
            }}>
                <Box sx={{
                    width: '80%',
                    minHeight: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4vh',
                    marginBottom: '4vh',
                    margin: 'auto'
                }}>
                    <Box>
                        <Typography sx={{ mt: 6, fontSize: '50px' }} level='title-lg'>CREATE AND SELL</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ mt: 2, fontSize: '50px' }} level='title-lg'>YOUR OWN MERCH</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', mt: 4 }}>
                        <Typography level='body-xs'>100% Free to use</Typography>
                        <Typography level='body-xs'>Full merch range</Typography>
                        <Typography level='body-xs'>Australia Wide Delivery</Typography>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <YellowButton title={'Get Started for Free'} url={''} sx={{ width: '300px', height: '50px' }} />
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Typography level='body-xs'>No credit card required</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '80%',
                    minHeight: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4vh',
                    marginBottom: '4vh',
                    margin: 'auto'
                }}>
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <video
                            src="https://printify.com/pfh/assets/hero/newbies-hero-vertical.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="rounded-2xl shadow-lg w-full max-w-sm"
                        />
                    </div>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4vh',
                    marginBottom: '4vh',
                    margin: 'auto'
                }}>
                    <Typography level='title-lg'>FEATURED ARTISTS</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" }, // Stack on small screens, side-by-side on medium and up
                            height: { xs: "auto", md: "auto" }, // Adjust height for mobile
                            width: "90%",
                            margin: "auto", // Center horizontally
                            mt: 3,
                            mb: 4,
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
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4vh',
                    marginBottom: '4vh',
                    margin: 'auto'
                }}>
                    <Typography level='title-lg'>FEATURED MERCH</Typography>

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
                <Investment />
                <ProductShowcase />
                <MerchOutInTheWild />
                <MailingList />
                <GetStartedToday />
            </Box >
        </>
    )
}

export default HomeAlt