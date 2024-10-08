import HeroSection from "@/components/HeroSection/HeroSection";

import Products from "../Products/Products";
import ImageGallery from "../ImageGallery/ImageGallery";
import CategorySection from "../CategorySection/CategorySection";
import HousePlantSec from "../HousePlantSec/HousePlantSec";
import ClientSay from "../ClientSay/ClientSay";
import LatestPopularProducts from "../LatestPopularProducts/LatestPopularProducts";



const LandingPage = () => {
    
    return (
        <div className="w-11/12 mx-auto">
          <HeroSection />
          <CategorySection />
            <Products />
            <HousePlantSec />
            <ImageGallery />
            <LatestPopularProducts />
            <ClientSay />
        </div>
    );
};

export default LandingPage;