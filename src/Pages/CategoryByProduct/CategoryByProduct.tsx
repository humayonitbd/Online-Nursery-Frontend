

import categoryApi from "@/redux/features/category/categoryApi";
import productApi from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { TProduct } from "@/types";


interface QueryParams {
  category?: string;
  sort?: string;
  searchTerm?: string;
  price?: string | number;
}

const CategoryByProduct = () => {
  const { id } = useParams();
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = categoryApi.useGetSingleCategoryQuery(id as string);

  useEffect(() => {
    const params: QueryParams = {};

    if (categoryData?.data?.name) {
      params.category = categoryData?.data?.name;
    }
    setQueryParams(params);
  }, [categoryData]);

  const { data: products, isLoading,isError } =
    productApi.useGetAllProductQuery(queryParams);
  

  if (isCategoryLoading || isLoading) {
    return <SmallLoading />;
  }

  if (categoryError || isError) {
    return <div className="text-center text-2xl text-red-500 font-semibold py-32">Error loading data</div>;
  }

  return (
    <div className="w-11/12 mx-auto py-10">
          {products?.data?.length === 0 ? (
            <h2 className="text-center text-2xl py-10 font-semibold">
              Product not Available According to this Category, Please Add!!
            </h2>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {products?.data?.map((product: TProduct) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>
          )}
        </div>
  );
};

export default CategoryByProduct;


