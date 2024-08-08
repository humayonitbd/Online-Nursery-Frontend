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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TResponse, TReview } from "@/types";
import reviewApi from "@/redux/features/review/reviewApi";


export function ReviewUpdateModal({ id }: { id: string }) {
    const [updateLoading, setUpdateLoading] = useState(false);
  const { data: singleReview } = reviewApi.useSingleGetReviewQuery(id);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      reviewMessage: "",
    },
  });

  const [updateReview] = reviewApi.useSingleUpdateReviewMutation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (singleReview?.data) {
      reset({
        reviewMessage: singleReview.data.reviewMessage,
      });
    }
  }, [singleReview, reset]);

  const onSubmit = async (data: FieldValues) => {
    setUpdateLoading(true);
    try {
      const reviewUpdateData = {
        ...data,
        
      };
      
      const res: TResponse<TReview> = await updateReview({
        id,
        reviewUpdateData,
      }).unwrap();
      // console.log("reviewUpdateData", res);
      if (res?.success) {
         setUpdateLoading(false);
        Swal.fire({
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
       
        reset();
        setIsOpen(false);
      } else {
         setUpdateLoading(false);
        Swal.fire({
          icon: "error",
          title: `${res?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
        setIsOpen(false);
      }
    } catch (error: any) {
       setUpdateLoading(false);
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
        <a>Edit</a>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#AFD136]">
            Update Review Comments
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
             { updateLoading && <span className="loading loading-spinner mr-2"></span>}Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
