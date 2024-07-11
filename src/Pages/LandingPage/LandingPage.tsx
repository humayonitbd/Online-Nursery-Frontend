import HeroSection from "@/components/HeroSection/HeroSection";

import Products from "../Products/Products";
import ImageGallery from "../ImageGallery/ImageGallery";
import CategorySection from "../CategorySection/CategorySection";


const LandingPage = () => {
    return (
        <div className="w-11/12 mx-auto">
          <HeroSection />
          <CategorySection />
            <Products />
            <ImageGallery />
        </div>
    );
};

export default LandingPage;