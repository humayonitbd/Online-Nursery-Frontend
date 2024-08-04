import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { Star } from "lucide-react";
// import { RatingModal } from "../RatingModal/RatingMdal";
import { TProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addBookingProduct, deleteBookingProduct } from "@/redux/features/bookingProduct/bookingProductSlice";
import Swal from "sweetalert2";
const ProductCard = ({ product }: { product: TProduct }) => {
 
  const location = useLocation();
  // console.log("current location", location.pathname);

  const dispatch = useAppDispatch();

  const addToCartHandler= async(product:TProduct)=>{

    try {
      const res = await dispatch(addBookingProduct(product));
      
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Add to Cart Successfull!!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add to Cart",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    

  }

  const deleteToCartHandler = async (id: string) => {

      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
          const res = await dispatch(deleteBookingProduct(id));
          if (res) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success",
            });
          }
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the product.",
          icon: "error",
        });
      }

    };
    
  
  return (
    <Card className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/product/${product?._id}`}>
        <CardHeader className="p-2 relative ">
          <img
            src={product?.image}
            className="h-[300px] w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            alt={product?.title}
          />
          {location.pathname === "/product/add-to-cart-list" && (
            <span className="absolute top-2 right-3 bg-[#141d0b] bg-opacity-100 text-white px-4 py-2 rounded-full">
              {product?.quantity}
            </span>
          )}
        </CardHeader>
        <CardContent className="grid p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Star className="#EF4444" fill="#76AE42" />
              <p className="text-2xl font-bold">{product?.rating}</p>
            </div>
            <div>
              <p className="text-lg text-gray-400 font-bold">
                Price:{" "}
                <span className="ml-1 text-slate-200">${product?.price}</span>
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
        {location.pathname === "/product/add-to-cart-list" ? (
          <>
            <div className="flex justify-between items-center w-full">
              <Button
                onClick={() => deleteToCartHandler(product?._id)}
                className=" text-base  text-white py-6 px-8 rounded outline outline-slate-200 "
              >
                Delete
              </Button>
              <Link to={`/product/add-to-cart-list/payment/${product?._id}`}>
                <Button className=" text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
                  Checkout to Prossed
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Button
              onClick={() => addToCartHandler(product)}
              className="w-full text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
            >
              Add-to-Cart
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
