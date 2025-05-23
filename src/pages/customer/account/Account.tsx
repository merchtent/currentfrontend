import { Box, Button, Divider, List, ListItem, ListItemButton } from "@mui/joy";
import React, { useState } from "react";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import Favourites from "./components/Favourites";
import MerchCredits from "./components/MerchCredits";
import Donations from "./components/Donations";
import Help from "./components/Help";
import CreateProduct from "./components/merch/CreateProduct";
import ProductRange from "./components/merch/ProductRange";
import Sales from "./components/admin/Sales";
import CashOut from "./components/admin/CashOut";
import Products from "./components/merch/Products";

const Account = () => {
    const [selectedMenu, setSelectedMenu] = useState("Profile");

    const menuItems = [
        { label: "Profile", component: <Profile /> },
        { label: "Favourites", component: <Favourites /> },
        { label: "Orders", component: <Orders /> },
        { label: "Merch Credits", component: <MerchCredits /> },
        { label: "Donations", component: <Donations /> },
        { label: "Help", component: <Help /> },
    ];

    const productItems = [
        { label: "Merch Range", component: <ProductRange /> },
        { label: "Create Merch", component: <CreateProduct /> },
        { label: "Your Merch", component: <Products /> },
    ];

    const adminItems = [
        { label: "Sales", component: <Sales /> },
        { label: "Cash Out", component: <CashOut /> },
    ]

    return (
        <Box display="flex" minHeight="100vh" gap={2} p={2}>
            {/* Left Column (30%) */}
            <Box flex="1" p={2} borderRadius="md">
                <List>
                    {menuItems.map(({ label }) => (
                        <ListItem key={label}>
                            <ListItemButton onClick={() => setSelectedMenu(label)}>
                                {label}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {productItems.map(({ label }) => (
                        <ListItem key={label}>
                            <ListItemButton onClick={() => setSelectedMenu(label)}>
                                {label}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {adminItems.map(({ label }) => (
                        <ListItem key={label}>
                            <ListItemButton onClick={() => setSelectedMenu(label)}>
                                {label}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Right Column (70%) - Renders Selected Component */}
            <Box flex="9" borderRadius="md">
                {menuItems.concat(productItems).concat(adminItems).find((item) => item.label === selectedMenu)?.component || <Profile />}
            </Box>
        </Box>
    );
};

export default Account;
