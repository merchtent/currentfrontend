import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import routes from './route-config';
import artistRoutes from './route-config-artist';
import ProtectedRoute from './auth/ProtectedRoute';
import Register from './auth/components/Register';
import Login from './auth/components/Login';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Home from './pages/Home';
import { Box, CssBaseline } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';
import ScrollingBanner from './components/marketing/scrollingbanner/ScrollingBanner';
import Footer from './components/app/Footer';
import Favourites from './pages/customer/account/Favourites';
import Cart, { CartRef, CartState } from './pages/shop/Cart';
import Account from './pages/customer/account/Account';
import Forgot from './pages/customer/account/Forgot';
import AboutUs from './pages/general/AboutUs';
import ActualMail from './pages/general/ActualMail';
import Charities from './pages/general/Charities';
import ContactUs from './pages/general/ContactUs';
import DigitalMail from './pages/general/DigitalMail';
import Ethos from './pages/general/Ethos';
import FAQs from './pages/general/FAQs';
import Gigs from './pages/general/Gigs';
import PrivacyPolicy from './pages/general/PrivacyPolicy';
import SizeCharts from './pages/general/SizeCharts';
import TermsAndConditions from './pages/general/TermsAndConditions';
import TrackYourOrder from './pages/general/TrackYourOrder';
import { SnackbarProvider } from './context/snackbar/SnackbarContext';
import AuthenticationContext from './auth/AuthenticationContext';
import configureInterceptor from './utils/httpinterceptors';
import { getClaims } from './auth/handleJwt';
import { claim } from './auth/auth.models';
import { DataProvider } from './context/data/DataContext';
import ProtectedRoutesArtist from './auth/ProtectedRouteArtist';
import { ApiProvider } from './context/api/ApiContext';
import { ShopProvider } from './context/shop/ShopContext';
import Artists from './pages/shop/category/Artists';
import Bags from './pages/shop/category/Bags';
import Hats from './pages/shop/category/Hats';
import Hoodies from './pages/shop/category/Hoodies';
import Shirts from './pages/shop/category/Shirts';
import ProductPage from './pages/shop/ProductPage';
import { Header } from './components/app/Header';
import Checkout from './pages/shop/Checkout';
import { AccountProvider } from './context/account/AccountContext';
import CheckoutConfirmation from './pages/shop/CheckoutConfirmation';
import BlogPage from './pages/shop/blog/BlogPage';
import BlogPostPage from './pages/shop/blog/BlogPostPage';
import ArtistProducts from './pages/shop/category/ArtistProducts';
import Interested from './pages/general/Interested';
import PageViewTracker from './utils/PageViewTracker';
import HomeAlt from './pages/HomeAlt';

const theme = extendTheme({
  typography: {
    'title-lg': {
      fontSize: '2.2rem',
    },
    'body-xs': {
      fontSize: '1.0rem',
    },
    'body-sm': {
      fontSize: '1.1rem',
    },
    'body-md': {
      fontSize: '.8rem',
    },
    'body-lg': {
      fontSize: '1.0rem',
    },
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    }
  },
  fontFamily: {
    body: 'Boldonse, sans-serif',
    display: 'Boldonse, sans-serif',
    code: 'Boldonse, sans-serif',
    fallback: 'Boldonse, sans-serif',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          // backgroundColor: '#cf602b',
          // backgroundColor: '#fcd157',
          // color: 'white',
          // '&:hover': {
          //   backgroundColor: '#d69a0b',
          // },
        },
      },
    },
    JoyLink: {
      styleOverrides: {
        root: {
          color: '#cf602b', // Default color for links
          '&:hover': {
            color: '#b75324', // Darker shade for hover state
          },
        },
      },
    },
  },
});

configureInterceptor();

function App() {

  // auth
  const [claims, setClaims] = useState<claim[]>([])

  useEffect(() => {
    setClaims(getClaims())
  }, [])

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null; // This component doesn't need to render anything
  };

  const cartRef = useRef<CartRef>(null);

  const updateCartState = (newState: Partial<CartState>) => {
    if (cartRef.current) {
      cartRef.current.setState(prevState => ({
        ...prevState,
        ...newState
      }));
    }
  };

  return (
    <>
      <SnackbarProvider>
        <ShopProvider>
          <AccountProvider>
            <DataProvider>
              <CssVarsProvider theme={theme}>
                <CssBaseline />
                <Box
                  className="merchtent-pagecontainer"
                  id='merchtent-pagecontainer'
                  sx={[
                    {

                    }
                  ]}
                >
                  <ScrollingBanner />
                  <ApiProvider>
                    <Router>
                      <PageViewTracker />
                      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
                        <Header updateCartState={updateCartState} />
                        <ScrollToTop />
                        <Cart ref={cartRef} />
                        <Routes>
                          {/* <Route element={<ProtectedRoute />}>
                            {routes.map(route =>
                              <Route
                                path={route.path}
                                key={route.path}
                                element={
                                  route.component
                                }>
                              </Route>
                            )}
                          </Route> */}
                          <Route element={<ProtectedRoutesArtist />}>
                            {artistRoutes.map(route =>
                              <Route
                                path={route.path}
                                key={route.path}
                                element={
                                  route.component
                                }>
                              </Route>
                            )}
                          </Route>
                          <Route path="/news/post/:title/:id" element={<BlogPostPage />} />
                          <Route path="/news" element={<BlogPage />} />
                          <Route path="/shop/checkout" element={<Checkout />} />
                          <Route path="/interested" element={<Interested />} />
                          <Route path="/shop/order/confirmation" element={<CheckoutConfirmation />} />
                          <Route path="/ethos" element={<Ethos />} />
                          <Route path="/gigs" element={<Gigs />} />
                          <Route path="/charities" element={<Charities />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                          <Route path="/faqs" element={<FAQs />} />
                          <Route path="/size-charts" element={<SizeCharts />} />
                          <Route path="/track-your-order" element={<TrackYourOrder />} />
                          <Route path="/contact-us" element={<ContactUs />} />
                          <Route path="/about-us" element={<AboutUs />} />
                          <Route path="/digital-mail" element={<DigitalMail />} />
                          <Route path="/actual-mail" element={<ActualMail />} />
                          <Route path="/shop/cart" element={<Cart />} />
                          <Route path="/account/forgot" element={<Forgot />} />
                          <Route path="/account/favourites" element={<Favourites />} />
                          <Route path="/artists" element={<Artists />} />
                          <Route path="/categories/artists" element={<ArtistProducts />} />
                          <Route path="/categories/bags" element={<Bags />} />
                          <Route path="/categories/hats" element={<Hats />} />
                          <Route path="/categories/hoodies" element={<Hoodies />} />
                          <Route path="/categories/tees" element={<Shirts />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/shop/products/:product" element={<ProductPage updateCartState={updateCartState} />} />
                          <Route path="/" element={<Home />} />
                          <Route path="*" element={<Login />} />
                        </Routes>
                        <Footer />
                      </AuthenticationContext.Provider>
                    </Router>
                  </ApiProvider>
                </Box>
              </CssVarsProvider>
            </DataProvider >
          </AccountProvider>
        </ShopProvider>
      </SnackbarProvider >
    </>
  );
}

export default App;
