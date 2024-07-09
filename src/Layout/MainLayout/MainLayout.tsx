import Footer from "@/Pages/SharedPage/Footer/Footer";
import Navbar from "@/Pages/SharedPage/Navbar/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;