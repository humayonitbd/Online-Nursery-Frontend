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
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import { TReplayReview, TResponse, TReview } from "@/types";
import reviewApi from "@/redux/features/review/reviewApi";
import userApi from "@/redux/features/users/usersApi";

export function ReviewReplayModal({
  review,
  productId,
}: {
  review: TReview;
  productId:string;
}) {
  const [reviewAddLoading, setReviewAddLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [addReplayReview] = reviewApi.useAddReplayReviewMutation();
  const { data } = userApi.useGetUserQuery(user?.email);
  const userData = data?.data;

  const reviewDate = new Date();

  const onSubmit = async (data: FieldValues) => {
    setReviewAddLoading(true);
    
    try {
      const reviewData = {
        ...data,
        productId:productId,
        reviewId: review?._id,
        reviewAddDate: reviewDate,
        ratingUserName: userData.name,
        ratingUserImg: userData.profileImg,
      };
      const res: TResponse<TReplayReview> = await addReplayReview(
        reviewData
      ).unwrap();
      if (res?.success) {
        setReviewAddLoading(false);
        Swal.fire({
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
        reset();
        setIsOpen(false);
      } else {
        setReviewAddLoading(false);
        Swal.fire({
          icon: "error",
          title: `${res?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
        setIsOpen(false);
      }
    } catch (error: any) {
      setReviewAddLoading(false);
      if (error?.data) {
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
        <button>Replay</button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-[#AFD136]">
            Replay Message!
          </DialogTitle>
          <h1 className="text-center text-xl ">{review?.reviewMessage}</h1>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 text-gray-900">
            <Input
              type="text"
              placeholder="Enter your comment"
              className="col-span-3"
              {...register("replayReviewMessage")}
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
