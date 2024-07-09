import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

import sliderImage1 from '@/assets/HeroSecImg/1.jpg';
import sliderImage2 from '@/assets/HeroSecImg/2.jpg';
import sliderImage3 from '@/assets/HeroSecImg/3.jpg';
import sliderImage4 from '@/assets/HeroSecImg/4.jpg';
import sliderImage5 from '@/assets/HeroSecImg/5.jpg';


const HeroSection = () => {
  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
    },
    {
      id: 2,
      image: sliderImage2,
    },
    {
      id: 3,
      image: sliderImage3,
    },
    {
      id: 4,
      image: sliderImage4,
    },
    {
      id: 5,
      image: sliderImage5,
    },
  ];
    

  return (
    // <div className="relative w-11/12 mx-auto h-[650px] mt-2">
    //   <Carousel
    //     className=" overflow-hidden rounded-lg shadow-lg"
    //     plugins={[
    //       Autoplay({
    //         delay: 6000,
    //       }),
    //     ]}
    //   >
    //     <CarouselContent className="flex">
    //       {sliderData.map((slider) => (
    //         <CarouselItem key={slider.id} className="min-w-full">
    //           <Card className="bg-transparent">
    //             <CardContent className="flex items-center justify-center h-[650px] p-0">
    //               <img
    //                 src={slider?.image}
    //                 className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
    //                 alt=""
    //               />

    //             </CardContent>
    //           </Card>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //     <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
    //       &#9664;
    //     </CarouselPrevious>
    //     <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
    //       &#9654;
    //     </CarouselNext>
    //   </Carousel>
    // </div>
    <div className="relative w-11/12 mx-auto h-[650px] mt-2">
      <Carousel
        className="overflow-hidden rounded-lg shadow-lg"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full relative">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center h-[650px] p-0 relative">
                  <img
                    src={slider?.image}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 absolute z-10"
                    alt=""
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white z-20">
                    <h2 className="text-3xl font-bold mb-4">
                      Welcome to Our Online Nursery!
                    </h2>
                    <p className="mb-4 text-center px-4 lg:mx-56">
                      Discover a wide variety of plants and gardening essentials
                      to bring your garden to life. Whether you're a seasoned
                      gardener or just starting out, we have everything you need
                      to grow a beautiful garden.
                    </p>
                    <button className="bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6 inline mr-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      Shop Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 z-30">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 z-30">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default HeroSection;
