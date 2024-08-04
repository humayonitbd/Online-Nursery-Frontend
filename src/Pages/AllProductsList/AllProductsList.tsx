import ProductCard from "@/components/ProductCard/ProductCard";
import productApi from "@/redux/features/product/productApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { TProduct, QueryParams } from "@/types";
import { useEffect, useState } from "react";
import ProductSorting from "@/components/ProductSorting/ProductSorting";
import ProductFilter from "@/components/ProductFilter/ProductFilter";
import { debounce } from "lodash";
import PaginationSection from "@/components/PaginationSection/PaginationSection";

const AllProductsList = () => {
    const [sortingValue, setSortingValue] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string | number>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");
    const [queryParams, setQueryParams] = useState<QueryParams>({});
    const [currentPage, setCurrentPage] = useState(1);
    

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    // Function to debounce API call
    const debouncedSearch = debounce((term: string) => {
      setDebouncedValue(term);
    }, 500);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
      debouncedSearch(value);
    };

    useEffect(() => {
      const params: QueryParams = {};

      if (sortingValue) {
        params.sort = sortingValue;
      }

      if (debouncedValue) {
        params.searchTerm = debouncedValue;
      }

      if (filterValue) {
        params.price = filterValue;
      }

      if (currentPage) {
        params.page = currentPage;
      }

      setQueryParams(params);
    }, [sortingValue, debouncedValue, filterValue, currentPage]);

  const { data: products, isLoading } =
    productApi.useGetAllProductQuery(queryParams);
    const meta = products?.meta;

    // console.log("Products Meta", meta);
  if (isLoading) {
    return <SmallLoading />;
  }

  return (
    <div className="py-10 w-11/12 mx-auto">
      <div>
        <div>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {/* Filter button */}
            <div className="flex justify-start items-center md:order-1 md:col-span-1">
              <ProductFilter
                setFilterValue={setFilterValue}
                filterValue={filterValue}
              />
            </div>
            {/* Search button */}
            <div className="md:order-2 md:col-span-1">
              <div className="md:px-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by product"
                  className="py-3 px-2 border-4 border-[#76AE42] rounded-full outline-none w-full"
                />
              </div>
            </div>
            {/* Sorting button */}
            <div className="flex justify-end items-center md:order-3 md:col-span-1">
              <ProductSorting setSortingValue={setSortingValue} />
            </div>
          </div>
          {/* Under md show section */}
          <div className="md:hidden mt-5 grid grid-cols-1">
            {/* Search Field */}
            <div className="bg-gray-600 mb-5">
              <div className="md:px-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by product"
                  className="py-5 px-2 border-4 border-[#76AE42] rounded-full outline-none w-full"
                />
              </div>
            </div>
            {/* Filter Button */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-red-300 mb-5">
                <button className="py-3 px-6 bg-gray-400 text-white rounded-lg w-full">
                  <ProductFilter
                    setFilterValue={setFilterValue}
                    filterValue={filterValue}
                  />
                </button>
              </div>
              {/* Sorting Button */}
              <div className="">
                <ProductSorting setSortingValue={setSortingValue} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:my-10 my-5">
        <div>
          {products?.data?.length === 0 ? (
            <>
              <div className="h-52 flex justify-center items-center text-2xl font-semibold text-[#76AE42]">
                <h2>Products is not Available!!</h2>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {products?.data?.map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <PaginationSection
          page={currentPage}
          totalItems={meta?.total}
          limit={meta?.limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllProductsList;
