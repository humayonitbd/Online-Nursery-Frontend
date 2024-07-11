import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import productApi from "@/redux/features/product/productApi";
import Swal from "sweetalert2";
import categoryApi from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types";

export type TProductdata = {
  category: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
  brand: string;
};

const AddToProductModal = () => {
  const {control,register, handleSubmit, reset,formState: { errors } } = useForm<TProductdata>();
  const {data:categorys} = categoryApi.useGetAllCategoryQuery(undefined);
  const [createProduct] = productApi.useCreateProductMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: SubmitHandler<TProductdata> = async (data) => {
  
    const price = Number(data.price);
    const rating = Number(data.rating);
    const stock = Number(data.stock);
    if (rating > 5) {
      return Swal.fire({
        icon: "error",
        title: "Please Provide Rating 0-5!!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    const productData = {
      title: data.title,
      category: data.category,
      price: price,
      rating: rating,
      image: data.image,
      description: data.description,
      stock: stock,
      brand: data.brand,
    };

    console.log("productData", productData);
    setIsOpen(false);
    try {
      const res = await createProduct(productData).unwrap();
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Product added Successfull!!",
          showConfirmButton: false,
          timer: 1000,
        });
        reset();
        setIsOpen(false); 
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Product added Failed!!",
        showConfirmButton: false,
        timer: 1000,
      });
       setIsOpen(false); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
          Add-to-Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 py-2">
            <div className="">
              <Label htmlFor="title" className="text-base ">
                Product Title
              </Label>
              <br />
              <Input
                {...register("title", { required: "Title is required" })}
                id="title"
                className="col-span-3 mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="category" className="text-base ">
                Category Name
              </Label>
              <span className="block mb-1"></span>
              <Controller
                control={control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                   
                  >
                    <SelectTrigger
                      className={`${
                        errors.category ? "border-black border-2" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Your Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categorys?.data?.map((category: TCategory) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <Label htmlFor="price" className="text-base ">
                  Product Price
                </Label>
                <br />
                <Input
                  {...register("price", { required: "Price is required" })}
                  id="price"
                  className="col-span-3 mt-2"
                  type="number"
                />
              </div>
              <div className="">
                <Label htmlFor="rating" className="text-base ">
                  Product Rating
                </Label>
                <br />
                <Input
                  {...register("rating", { required: "Rating is required" })}
                  id="rating"
                  className="col-span-3 mt-2"
                  type="number"
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
                {...register("image", { required: "Image link is required" })}
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
                {...register("description", {
                  required: "Description is required",
                })}
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
                  {...register("stock", { required: "Stock is required" })}
                  id="stock"
                  className="col-span-3 mt-2"
                  type="number"
                />
              </div>
              <div className="">
                <Label htmlFor="brand" className="text-base ">
                  Product Brand
                </Label>
                <br />
                <Input
                  {...register("brand", { required: "Brand is required" })}
                  id="brand"
                  className="col-span-3 mt-2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddToProductModal;
