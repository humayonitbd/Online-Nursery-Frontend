import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Star } from "lucide-react";
import Rating from "react-rating";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import { TProduct, TResponse, TReview } from "@/types";
import reviewApi from "@/redux/features/review/reviewApi";
import userApi from "@/redux/features/users/usersApi";


export function ReviewModal({ product }: { product: TProduct }) {
    const [reviewAddLoading, setReviewAddLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit, reset } = useForm();
  const [ratingValue, setRatingValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [addReview] = reviewApi.useAddReviewMutation();
  const {data} = userApi.useGetUserQuery(user?.email); 
    const userData = data?.data;

 const reviewDate = new Date();

  const onSubmit = async(data: FieldValues) => {
    setReviewAddLoading(true);
    if (ratingValue <= 0) {
      return Swal.fire({
        icon: "error",
        title: `Please! Ratings Provide!`,
        showConfirmButton: false,
        timer: 1200,
      });
    }

    try {
      
      const reviewData = {
        ...data,
        rating: ratingValue,
        productId: product?._id,
        reviewAddDate: reviewDate,
        ratingUserName: userData.name,
        ratingUserImg:userData.profileImg,
      };
      const res: TResponse<TReview> = await addReview(reviewData).unwrap();
      if(res?.success){
        setReviewAddLoading(false);
         Swal.fire({
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
        reset();
        setIsOpen(false);
      }else{
        setReviewAddLoading(false);
        Swal.fire({
          icon: "error",
          title: `${res?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
        setIsOpen(false);
      }
      
    } catch (error:any) {
      setReviewAddLoading(false);
      if(error?.data){
        Swal.fire({
          icon: "error",
          title: `${error?.data?.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
      }
      
      setIsOpen(false);
      
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-2 text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-10 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-[#AFD136]">
            Rating/Review
          </DialogTitle>
          <h1 className="text-center text-xl ">{product.title}</h1>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center pt-2">
            {/* @ts-expect-error their is no type declaration file for react rating*/}
            <Rating
              emptySymbol={<Star size={40} color="#AFD136" />}
              fullSymbol={<Star size={40} color="#AFD136" fill="#AFD136" />}
              fractions={2}
              initialRating={ratingValue}
              stop={5}
              onClick={(value) => setRatingValue(value)}
            />
          </div>
          <div className="grid gap-4 py-4 text-gray-900">
            <Input
              type="text"
              placeholder="Enter your comment"
              className="col-span-3"
              {...register("reviewMessage")}
              required
            />
          </div>

          <DialogFooter>
            <Button color="yellow" type="submit" className="w-full">
              {reviewAddLoading && (
                <span className="loading loading-spinner mr-2"></span>
              )}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
