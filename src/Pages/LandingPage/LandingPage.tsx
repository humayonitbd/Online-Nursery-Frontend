import HeroSection from "@/components/HeroSection/HeroSection";

import Products from "../Products/Products";
import ImageGallery from "../ImageGallery/ImageGallery";


const LandingPage = () => {
    return (
        <div className="w-11/12 mx-auto">
          <HeroSection />
            <Products />
            <ImageGallery />
        </div>
    );
};

export default LandingPage;