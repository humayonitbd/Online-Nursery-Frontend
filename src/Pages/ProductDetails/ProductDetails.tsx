import { Button } from '@/components/ui/button';
import productApi from '@/redux/features/product/productApi';
import React from 'react';
import { useParams } from 'react-router-dom';
import SmallLoading from '../SharedPage/Loading/SmallLoading';

const ProductDetails = () => {
    const { id } = useParams();
      const { data:product, isLoading } = productApi.useGetSingleProductQuery(id as string);
      console.log(product)
    // const product = {
    //   _id: "668c0f220e26fe0b10f741c6",

    //   title: "Blue Hydrangea",
    //   price: 300,
    //   rating: 4,
    //   image:
    //     "https://thumbs.dreamstime.com/b/beautiful-blue-hydrangea-flower-pot-39530471.jpg?w=768",
    //   description:
    //     "Blue Hydrangeas are some of the most sought-after flowering shrubs due to their incredible blooms and versatile nature. One of their unique aspects is their ability to change color, especially shifting from pink to mesmerizing shades of blue. Here you'll discover several varieties of hydrangeas that will produce gorgeous blue flowers. Plus you'll get tips for how to achieve this feat effectively. ",
    //   isDeleted: false,
    //   brand: "brand-2",
    //   category: "balakhane",
    //   stock: 25,
    // };

    if (isLoading) {
      return <SmallLoading />;
    }
    return (
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col items-center p-4 bg-gray-900 text-white  pt-8 lg:py-16">
          <div className="max-w-7xl w-full bg-gray-800 rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row">
              <img
                src={product?.data?.image}
                alt="product Poster"
                className="w-full md:w-1/2 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-between">
                <div className="text-gray-400 mb-4">
                  <h1 className="text-3xl font-semibold mb-4">
                    Title:{" "}
                    <span className="text-slate-200">
                      {product?.data?.title}
                    </span>
                  </h1>
                  <p className="mb-2 font-semibold">
                    Category:
                    <span className="text-slate-200 ml-1">
                      {product?.data?.category}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Brand:
                    <span className=" text-slate-200 ml-1">
                      {product?.data?.brand}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Stock:
                    <span className=" text-slate-200 ml-1">
                      {product?.data?.stock}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Price:
                    <span className=" text-slate-200 ml-1">
                      $ {product?.data?.price}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Description:
                    <span className=" text-slate-200 ml-1">
                      {product?.data?.description}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-4 mb-4">
                  <Button className="w-full text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
                    Add-to-Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductDetails;