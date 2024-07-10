
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { TCategory } from "@/Pages/CategoryManagement/CategoryManagement";
import categoryApi from "@/redux/features/category/categoryApi";
import Swal from "sweetalert2";

const UpdateCategoryModal = ({category}:{category:TCategory}) => {
    const {_id:id, name:oldname} = category;
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Tdata>({
    defaultValues: {
      name: oldname,
    },
  });
  
  type Tdata = {
    name: string;
  };

  const [updateCategory] = categoryApi.useUpdateCategoryMutation();
  
  const onSubmit: SubmitHandler<Tdata> = async (data) => {
    const updatedata = {
      name: data.name || oldname,
    };
    try {
     const res = await updateCategory({ id, updatedata }).unwrap();
     if(res.success){
      Swal.fire({
        icon: "success",
        title: "Category Updated Successfull!!",
        showConfirmButton: false,
        timer: 1100,
      });
     }
     reset();
     setIsOpen(false);

    } catch (error:any) {
      console.log(error);
      if(!error.success){
        Swal.fire({
          icon: "error",
          title: "Category Updated Failed!!",
          showConfirmButton: false,
          timer: 1000,
        });

      }
      
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-base ">
                Category Name
              </Label>
              <br />
              <Input
                {...register("name", { required: "Name is required" })}
                id="name"
                className="col-span-3 mt-2"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button
                className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
                type="submit"
              >
                Submit
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
