import MainLayout from "@/Layout/MainLayout/MainLayout";
import ProductManagementLayout from "@/Layout/ProductManagmentLayout/ProductManagmentLayout";
import CategoryManagement from "@/Pages/CategoryManagement/CategoryManagement";
import LandingPage from "@/Pages/LandingPage/LandingPage";
import ProductManagement from "@/Pages/ProductManagement/ProductManagement";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
    ],
  },
]);

export default router;
