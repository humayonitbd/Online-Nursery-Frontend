import {  useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import categoryApi from "@/redux/features/category/categoryApi";
import Swal from "sweetalert2";

const AddToCategory = () => {
    const { register, handleSubmit, reset } = useForm<Tdata>();
    const [isOpen, setIsOpen] = useState(false);

    type Tdata = {
      name: string;
    };
    const [createCategory] = categoryApi.useCreateCategoryMutation();
    const onSubmit:SubmitHandler<Tdata> = async(data) => {
      const categoryData = {
        name:data.name,
      }
    try {
       const res = await createCategory(categoryData).unwrap();
       if(res?.success){
        Swal.fire({
          icon: "success",
          title: "Category added Successfull!!",
          showConfirmButton: false,
          timer: 1000,
        });
        reset();
         setIsOpen(false);
       }
       
    } catch (error:any) {
        if (error?.data?.success === false) {
          Swal.fire({
            icon: "error",
            title: error?.data?.message || "Category Added Failed!!",
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
          Add-to-Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
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

export default AddToCategory;
