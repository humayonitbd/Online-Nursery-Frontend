import categoryApi from "@/redux/features/category/categoryApi";
import productApi from "@/redux/features/product/productApi";
import { useParams } from "react-router-dom";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { TProduct } from "@/types";
import ProductSorting from "@/components/ProductSorting/ProductSorting";
import { Input } from "@/components/ui/input";
import ProductFilter from "@/components/ProductFilter/ProductFilter";

const CategoryByProduct = () => {
     const { id } = useParams();
     const [sortingValue,setSortingValue] = useState('');
     const [filterValue, setFilterValue] = useState();
     console.log('sorting value', sortingValue)
     console.log("filter value", filterValue);
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
       if (sortingValue) {
         setQueryParams((prev) => ({
           ...prev,
           sort: sortingValue,
         }));
       }
       if (filterValue) {
         setQueryParams((prev) => ({
           ...prev,
           price: filterValue,
         }));
       }
     }, [categoryData, sortingValue, filterValue]);

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
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {/* filter button  */}
              <div className="flex justify-start items-center  md:order-1 md:col-span-1">
                <ProductFilter
                  setFilterValue={setFilterValue}
                  filterValue={filterValue}
                />
              </div>
              {/* search button  */}
              <div className="md:order-2 md:col-span-1">
                <div className="md:px-2">
                  <input
                    type="text"
                    placeholder="Search by product"
                    className="py-3 px-2 border-4 border-[#76AE42] rounded-full outline-none w-full"
                  />
                </div>
              </div>

              {/* sorting button  */}
              <div className="flex justify-end items-center md:order-3 md:col-span-1">
                <ProductSorting setSortingValue={setSortingValue} />
              </div>
            </div>
            {/* under md show section  */}
            <div className="md:hidden mt-5 grid grid-cols-1">
              {/* Search Field */}
              <div className="bg-gray-600 mb-5">
                <div className="md:px-2">
                  <input
                    type="text"
                    placeholder="Search by product"
                    className="py-5 px-2 border-4 border-[#76AE42] rounded-full outline-none w-full"
                  />
                </div>
              </div>

              {/* Filter Button */}
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-red-300 mb-5">
                  <button className="py-3 px-6 bg-gray-400 text-white rounded-lg w-full">
                    Filter
                  </button>
                </div>

                {/* Sorting Button */}
                <div className="bg-blue-600">
                  <button className="py-3 px-6 bg-gray-400 text-white rounded-lg w-full">
                    Sort
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {products?.data?.length === 0 ? (
              <>
                <h2 className="text-center text-2xl py-10 font-semibold">
                  Product not Available According to this Category, Please Add!!{" "}
                </h2>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {products?.data?.map((product: TProduct) => (
                    <ProductCard product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default CategoryByProduct;