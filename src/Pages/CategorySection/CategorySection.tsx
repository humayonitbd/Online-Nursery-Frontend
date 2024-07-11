
import categoryApi from "@/redux/features/category/categoryApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { TCategory } from "@/types";

// Import your category images
import img1 from "../../assets/HeroSecImg/1.jpg";
import img2 from "../../assets/HeroSecImg/2.jpg";
import img3 from "../../assets/HeroSecImg/3.jpg";
import img4 from "../../assets/HeroSecImg/4.jpg";
import img5 from "../../assets/HeroSecImg/5.jpg";
import { Link } from "react-router-dom";



const CategorySection = () => {
  const { data: categories, isLoading } =
    categoryApi.useGetAllCategoryQuery(undefined);

  if (isLoading) {
    return <SmallLoading />;
  }

  // Array of category images to match with categories
  const categoryImages = [ img2,img5, img1];

  return (
    <div className="py-10">
      <div>
        <h2 className="text-3xl font-bold py-10 text-center text-slate-700">
          Populler of our Category
        </h2>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {categories?.data?.map((category: TCategory, index: number) => (
            <div key={category._id} className="relative">
              <Link to={`/category/${category?._id}`}>
                <div
                  className="h-60 bg-cover bg-center rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${
                      categoryImages[index % categoryImages.length]
                    })`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1f2937a3] to-[#2d3a4c7b] text-slate-100 py-2 px-4 rounded hover:from-[#afd136a3] hover:to-[#76ae42aa] transition-colors duration-300 bg-opacity-50 flex items-center justify-center">
                    <div className=" text-center p-4">
                      <div className="text-2xl font-bold">{category.name}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
