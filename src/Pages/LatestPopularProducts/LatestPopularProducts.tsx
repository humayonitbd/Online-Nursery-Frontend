import productApi from "@/redux/features/product/productApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import ProductCard from "@/components/ProductCard/ProductCard";
import { TProduct } from "@/types";

const LatestPopularProducts = () => {
    const { data: products, isLoading } =
      productApi.useGetAllProductQuery(null);

    if (isLoading) {
      return <SmallLoading />;
    } 
    return (
      <div className=" py-10">
        <div>
          <h2 className="text-3xl font-bold mb-16 text-center text-slate-700 ">
            Latest Popular Products
          </h2>
        </div>
        <div>
          <div>
            {products?.data.length === 0 ? (
              <>
                <div className="h-52 flex justify-center items-center text-2xl font-semibold text-[#76AE42]">
                  <h2>Products is not Available!!</h2>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {products?.data?.slice(0, 3)?.map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default LatestPopularProducts;