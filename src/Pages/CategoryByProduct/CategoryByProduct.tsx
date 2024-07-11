import categoryApi from "@/redux/features/category/categoryApi";
import productApi from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { TProduct } from "@/types";

const CategoryByProduct = () => {
     const { id } = useParams();
     const {
       data: categoryData,
       isLoading: isCategoryLoading,
       error: categoryError,
     } = categoryApi.useGetSingleCategoryQuery(id as string);

     const [queryParams, setQueryParams] = useState({});

     useEffect(() => {
       if (categoryData?.data?.name) {
         setQueryParams((prev) => ({
           ...prev,
           category: categoryData.data.name,
         }));
       }
     }, [categoryData]);

     const {
       data: products,
       isLoading: isProductLoading,
       error: productError,
     } = productApi.useGetAllProductQuery(queryParams);

   console.log("productsby category", products?.data);

     if (isCategoryLoading || isProductLoading) {
       return <SmallLoading />;
     }

     if (categoryError || productError) {
       return <div>Error loading data</div>;
     }

    return (
        <div className="w-11/12 mx-auto py-10">
            <div>
            <div>
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {
                products?.data?.map((product:TProduct)=> <ProductCard product={product} />)
              }
            </div>
            </div>
        </div>
    );
};

export default CategoryByProduct;