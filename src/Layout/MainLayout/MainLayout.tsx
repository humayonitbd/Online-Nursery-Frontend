import useUnloadPrompt from "@/Hooks/Hooks";
import Footer from "@/Pages/SharedPage/Footer/Footer";
import Navbar from "@/Pages/SharedPage/Navbar/Navbar";
import { useAppSelector } from "@/redux/hooks";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    const cartItem = useAppSelector((state) => state.products.products);

    useUnloadPrompt(cartItem);
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;