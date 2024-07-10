import { TProduct } from "@/types";
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
import { SubmitHandler, useForm } from "react-hook-form";
import productApi from "@/redux/features/product/productApi";
import Swal from "sweetalert2";
import { useState } from "react";


type TProductdata = {
  category: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
  brand: string;
};

const UpdateToProductModal = ({ product }:{product:TProduct}) => {
    const { _id:id,title:oldTitle, category:oldCategory, price:oldPrice, rating:oldRating, image:oldImage, description:oldDescription, stock:oldStock, brand:oldBrand } =
      product;

      const [updateProduct] = productApi.useUpdateProductMutation();

      const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<TProductdata>({
    defaultValues: {
        title: oldTitle,
        category: oldCategory,
        price: oldPrice,
        rating: oldRating,
        image: oldImage,
        description: oldDescription,
        stock: oldStock,
        brand: oldBrand,
     
    },
  });

  const onSubmit: SubmitHandler<TProductdata> = async (data) => {
    
    const price = Number(data.price);
    const rating = Number(data.rating);
    const stock = Number(data.stock);
    if (rating > 5) {
      Swal.fire({
        icon: "error",
        title: "Please Provide Rating 0-5!!",
        showConfirmButton: false,
        timer: 1000,
      });
      setIsOpen(true); 
      return;
    }
    const updateProductData = {
      title: data.title || oldTitle,
      category: data.category || oldCategory,
      price: price || oldPrice,
      rating: rating || oldRating,
      image: data.image || oldImage,
      description: data.description || oldDescription,
      stock: stock || oldStock,
      brand: data.brand || oldBrand,
    };

    console.log("updateProductData", updateProductData);
    try {
       const res = await updateProduct({id, updateProductData }).unwrap();
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Product Updated Successfull!!",
          showConfirmButton: false,
          timer: 1100,
        });
      }
      reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Product Updated Failed!!",
        showConfirmButton: false,
        timer: 1200,
      });
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
          <DialogTitle>Update to Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 py-2">
            <div className="">
              <Label htmlFor="title" className="text-base ">
                Product Title
              </Label>
              <br />
              <Input
                {...register("title")}
                id="title"
                className="col-span-3 mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="category" className="text-base ">
                Category Name
              </Label>
              <br />
              <Input
                {...register("category")}
                id="category"
                className="col-span-3 mt-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <Label htmlFor="price" className="text-base ">
                  Product Price
                </Label>
                <br />
                <Input
                  {...register("price")}
                  id="price"
                  className="col-span-3 mt-2"
                />
              </div>
              <div className="">
                <Label htmlFor="rating" className="text-base ">
                  Product Rating
                </Label>
                <br />
                <Input
                  {...register("rating")}
                  id="rating"
                  className="col-span-3 mt-2"
                  step="0.1"
                />
              </div>
            </div>
            <div className="">
              <Label htmlFor="image" className="text-base ">
                Product Image-Link
              </Label>
              <br />
              <Input
                {...register("image")}
                id="image"
                className="col-span-3 mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="description" className="text-base ">
                Product Description
              </Label>
              <br />
              <Input
                {...register("description")}
                id="description"
                className="col-span-3 mt-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <Label htmlFor="stock" className="text-base ">
                  Product Stock
                </Label>
                <br />
                <Input
                  {...register("stock")}
                  id="stock"
                  className="col-span-3 mt-2"
                />
              </div>
              <div className="">
                <Label htmlFor="brand" className="text-base ">
                  Product Brand
                </Label>
                <br />
                <Input
                  {...register("brand")}
                  id="brand"
                  className="col-span-3 mt-2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateToProductModal;
