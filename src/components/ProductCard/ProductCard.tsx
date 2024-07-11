import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
// import { RatingModal } from "../RatingModal/RatingMdal";
import { TProduct } from "@/types";
import { Button } from "@/components/ui/button";
const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/product/${product?._id}`}>
        <CardHeader className="p-2">
          <img
            src={product?.image}
            className="h-[300px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={product?.title}
          />
        </CardHeader>
        <CardContent className="grid p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Star className="#EF4444" fill="#76AE42" />
              <p className="text-2xl font-bold">{product?.rating}</p>
            </div>
            <div>
              <p className="text-lg text-gray-400 font-bold">
                Price: <span className="ml-1 text-slate-200">${product?.price}</span>
              </p>
            </div>
          </div>
          <CardTitle className="mt-2 text-xl font-semibold text-gray-400">
            Title: <span className="text-slate-200">{product?.title}</span>
          </CardTitle>
          <p className="text-md mt-4 text-gray-400">
            Category:{" "}
            <span className="text-slate-200">{product?.category}</span>
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 border-t border-gray-700 ">
        <Button className="w-full text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
          Add-to-Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
