import { Button } from "@/components/ui/button";
import housePlant1 from "../../assets/HeroSecImg/house plant.jpg";
import housePlant2 from "../../assets/HeroSecImg/house plant 2.jpg";
import { NavLink } from "react-router-dom";
const HousePlantSec = () => {
    return (
      <div className="py-10 bg-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 ">
          <div className="grid grid-cols-2 gap-2">
            <img className="w-full h-96" src={housePlant1} alt="housePlant1" />
            <img className="w-full h-96" src={housePlant2} alt="housePlant2" />
          </div>
          <div className="flex justify-start items-start">
            <div>
              <h3 className="text-3xl font-bold text-gray-700 ">
                Populler House Plant.
              </h3>
              <p className="text-gray-600 text-lg my-5">
                The most common are exotic plants native to warm, frost-free
                parts of the world that can be grown indoors in colder climates
                in portable containers or miniature gardens. Most houseplants
                are, therefore, derived from plants native to the tropics and
                near tropics.
              </p>
              <p className="text-gray-600 text-lg my-5">
                The House Plant is the most populer plant in the bangla desh.Frost-free
                parts of the world that can be grown indoors in colder climates
                in portable containers or miniature gardens. Most houseplants
                are, therefore.
              </p>
              <NavLink to="/all-product-list">
                <Button className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  Shop Now
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HousePlantSec;