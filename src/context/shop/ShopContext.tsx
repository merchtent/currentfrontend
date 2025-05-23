import axios, { AxiosResponse } from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Genre } from "../../models/genre";
import { urlArtists, urlBlogs, urlFavourites, urlGenres, urlInstrgram, urlProducts, urlShop } from "../../endpoints";
import { useSnackbar } from "../snackbar/SnackbarContext";
import { ShopProduct } from "../../models/shopProduct";
import { CartProduct } from "../../models/cart";
import { Artist } from "../../models/artist";
import { Favourite } from "../../models/favourite";
import { BlogPost } from "../../models/blogPost";
import { InstagramFeed } from "../../models/instagramFeed";

interface ShopProviderProps {
    children: ReactNode;
}

interface ShopContextType {
    featuredProducts: ShopProduct[];
    fetchFeaturedProducts: (take: number) => Promise<void>;
    latestProducts: ShopProduct[];
    fetchLatestProducts: (take: number) => Promise<void>;
    artistProducts: ShopProduct[];
    fetchArtistProducts: (take: number, id: string) => Promise<void>;
    artists: Artist[];
    fetchArtists: () => Promise<void>;
    feeds: InstagramFeed[];
    fetchFeeds: () => Promise<void>;
    blogs: BlogPost[];
    fetchBlogs: () => Promise<void>;
    getProduct: (url: string, params?: Record<string, any>) => Promise<ShopProduct | null>;
    cart: CartProduct[];  // Holds the current state of the cart
    addToCart: (newCartItem: CartProduct) => void;  // Function to add items to the cart
    removeFromCart: (product: string, code: string) => void;  // Optional: Function to remove items from the cart
    updateCartQuantity: (product: string, code: string, quantity: number) => void;  // Optional: Function to update item quantity
    clearCart: () => void;
    addToFavourites: (newFavouriteItem: Favourite) => void;
    removeFromFavourites: (faovurite: Favourite) => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const { showMessage } = useSnackbar();

    const [featuredProducts, setFeaturedProducts] = useState<ShopProduct[]>([])
    const [latestProducts, setLatestProducts] = useState<ShopProduct[]>([])
    const [artistProducts, setArtistProducts] = useState<ShopProduct[]>([])
    // const [tees, setTees] = useState<ShopProduct[]>([])
    // const [tees, setTees] = useState<ShopProduct[]>([])
    // const [tees, setTees] = useState<ShopProduct[]>([])
    // const [tees, setTees] = useState<ShopProduct[]>([])
    const [artists, setArtists] = useState<Artist[]>([])
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [feeds, setFeeds] = useState<InstagramFeed[]>([])

    // Initialize cart state from localStorage, if available
    const [cart, setCart] = useState<CartProduct[]>(() => {
        const storedCart = localStorage.getItem('merchTentCart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('merchTentCart', JSON.stringify(cart));
    }, [cart]);

    const clearCart = () => {
        setCart([])
        localStorage.removeItem('merchTentCart');
    }

    // Add a Cart item to the cart state
    const addToCart = (newCartItem: CartProduct) => {
        setCart((prevCart) => {
            // Check if the item already exists in the cart
            const existingItemIndex = prevCart.findIndex(item => item.product === newCartItem.product && item.code === newCartItem.code);

            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += newCartItem.quantity;
                localStorage.setItem('merchTentCartData', JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                // Add new item to the cart                
                return [...prevCart, newCartItem];
            }
        });
    };

    const addToFavourites = async (newFavouriteItem: Favourite) => {
        try {
            const response = await axios.post(`${urlFavourites}`, newFavouriteItem);
            if (response) {
                if (response?.status >= 200 && response?.status < 300) {
                    showMessage('Added to Favourites', 'success');
                } else {
                    throw new Error(`Unexpected response: ${response?.statusText || 'Unknown error'}`);
                }
            }
        } catch (error) {
            showMessage("Error adding to Favourites", 'error');
        }
    };

    const removeFromFavourites = async (favourite: Favourite) => {
        try {
            const response = await axios.delete(`${urlFavourites}/${favourite.id}`);
            if (response) {
                if (response?.status >= 200 && response?.status < 300) {
                    showMessage('Removed from Favourites', 'success');
                } else {
                    throw new Error(`Unexpected response: ${response?.statusText || 'Unknown error'}`);
                }
            }
        } catch (error) {
            showMessage("Error removing from Favourites", 'error');
        }
    };

    const removeFromCart = (product: string, code: string) => {
        setCart((prevCart) => prevCart.filter(item => !(item.product === product && item.code === code)));
    };

    const updateCartQuantity = (product: string, code: string, quantity: number) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const itemIndex = updatedCart.findIndex(item => item.product === product && item.code === code);

            if (itemIndex >= 0) {
                updatedCart[itemIndex].quantity = quantity;
            }
            return updatedCart;
        });
    };

    const fetchFeaturedProducts = useCallback(async (take: number) => {
        try {
            const response: AxiosResponse<ShopProduct[]> = await axios.get(`${urlShop}/featured?take=${take}`);
            setFeaturedProducts(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch featured products', 'error');
        }
    }, []);

    const fetchLatestProducts = useCallback(async (take: number) => {
        try {
            const response: AxiosResponse<ShopProduct[]> = await axios.get(`${urlShop}/latest?take=${take}`);
            setLatestProducts(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch featured products', 'error');
        }
    }, []);

    const fetchArtistProducts = useCallback(async (take: number, id: string) => {
        try {
            const response: AxiosResponse<ShopProduct[]> = await axios.get(`${urlShop}/artist?take=${take}&id=${id}`);
            setArtistProducts(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch artist products', 'error');
        }
    }, []);

    // Function that directly fetches data and returns it to the caller
    const getProduct = useCallback(async (url: string, params?: Record<string, any>): Promise<ShopProduct | null> => {
        try {
            const response: AxiosResponse<ShopProduct> = await axios.get(url, { params });
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            showMessage('Failed to fetch product', 'error');
            return null;
        }
    }, []);

    const fetchArtists = useCallback(async () => {
        try {
            const response: AxiosResponse<Artist[]> = await axios.get(`${urlArtists}`);
            setArtists(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch artists', 'error');
        }
    }, []);

    const fetchBlogs = useCallback(async () => {
        try {
            const response: AxiosResponse<BlogPost[]> = await axios.get(`${urlBlogs}`);
            setBlogs(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch blogs', 'error');
        }
    }, []);

    const fetchFeeds = useCallback(async () => {
        try {
            const response: AxiosResponse<InstagramFeed[]> = await axios.get(`${urlInstrgram}`);
            setFeeds(response.data);
        } catch (error: any) {
            showMessage('Failed to fetch feeds', 'error');
        }
    }, []);

    useEffect(() => {

    }, []);

    const value = {
        featuredProducts,
        fetchFeaturedProducts,
        latestProducts,
        fetchLatestProducts,
        artists,
        fetchArtists,
        getProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToFavourites,
        removeFromFavourites,
        blogs,
        fetchBlogs,
        feeds,
        fetchFeeds,
        artistProducts,
        fetchArtistProducts
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShopContext = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShopContext must be used within a ShopProvider');
    }
    return context;
};
