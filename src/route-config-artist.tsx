import Dashboard from "./pages/artist/dashboard/Dashboard";
import CreateProduct from "./pages/artist/products/create/CreateProduct";
import Account from "./pages/customer/account/Account";
import CreateProductSuccess from "./pages/customer/account/components/merch/CreateProductSuccess";

const routes = [
    {
        path: '/artist/dashboard', component: <Dashboard />
    },
    {
        path: '/artist/createproduct', component: <CreateProduct />
    },
    {
        path: '/artist/createproduct', component: <CreateProduct />
    },
    {
        path: '/artist/createproduct/success', component: <CreateProductSuccess />
    },
    {
        path: '/account', component: <Account />
    },
]

export default routes;