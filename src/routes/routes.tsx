import MainLayout from "@/Layout/MainLayout/MainLayout";
import ProductManagementLayout from "@/Layout/ProductManagmentLayout/ProductManagmentLayout";
import AllProductsList from "@/Pages/AllProductsList/AllProductsList";
import CartListPage from "@/Pages/CartListPage/CartListPage";
import CategoryByProduct from "@/Pages/CategoryByProduct/CategoryByProduct";
import CategoryManagement from "@/Pages/CategoryManagement/CategoryManagement";
import LandingPage from "@/Pages/LandingPage/LandingPage";
import Login from "@/Pages/Login/Login/Login";
import Register from "@/Pages/Login/Register/Register";
import ProductDetails from "@/Pages/ProductDetails/ProductDetails";
import ProductManagement from "@/Pages/ProductManagement/ProductManagement";
import ProductPayment from "@/Pages/ProductPayment/ProductPayment";
import ProfilePage from "@/Pages/ProfilePage/ProfilePage";
import ErrorPage from "@/Pages/SharedPage/ErrorPage/ErrorPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "category/:id",
        element: <CategoryByProduct />,
      },
      {
        path: "all-product-list",
        element: <AllProductsList />,
      },
      {
        path: "product/add-to-cart-list",
        element: <CartListPage />,
      },
      {
        path: "product/add-to-cart-list/payment/:id",
        element: <ProductPayment />,
      },
      {
        path: "product-category-management",
        element: <ProductManagementLayout />,
        children: [
          {
            index: true,
            element: <ProductManagement />,
          },
          {
            path: "product-management",
            element: <ProductManagement />,
          },
          {
            path: "category-management",
            element: <CategoryManagement />,
          },
        ],
      },
      {
        path: "/users/profiles",
        element: <ProfilePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
