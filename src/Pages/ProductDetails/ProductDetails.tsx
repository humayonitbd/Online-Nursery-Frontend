import { Button } from '@/components/ui/button';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    //   const { data, isLoading } = useGetproductDetailsAndReviewsQuery(id as string);
    const product = {
      _id: "668c0f220e26fe0b10f741c6",

      title: "Blue Hydrangea",
      price: 300,
      rating: 4,
      image:
        "https://thumbs.dreamstime.com/b/beautiful-blue-hydrangea-flower-pot-39530471.jpg?w=768",
      description:
        "Blue Hydrangeas are some of the most sought-after flowering shrubs due to their incredible blooms and versatile nature. One of their unique aspects is their ability to change color, especially shifting from pink to mesmerizing shades of blue. Here you'll discover several varieties of hydrangeas that will produce gorgeous blue flowers. Plus you'll get tips for how to achieve this feat effectively. ",
      isDeleted: false,
      brand: "brand-2",
      category: "balakhane",
      stock: 25,
    };
    return (
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col items-center p-4 bg-gray-900 text-white min-h-screen pt-8 lg:pt-16">
          <div className="max-w-6xl w-full bg-gray-800 rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row">
              <img
                src={product?.image}
                alt="product Poster"
                className="w-full md:w-1/3 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-between">
                <div className="text-gray-400 mb-4">
                  <h1 className="text-3xl font-bold mb-4">
                    {product?.title}
                  </h1>
                  <p className="mb-2">
                    <span className="font-semibold text-red-500">
                      Category:
                    </span>{" "}
                    {product?.category}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold text-red-500">
                      Director:
                    </span>{" "}
                    {product?.brand}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-red-500">Cast:</span>{" "}
                    {product?.stock}
                  </p>
                </div>
                <p className="text-justify mb-4">{product?.description}</p>
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