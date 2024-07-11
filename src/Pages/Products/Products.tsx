import ProductCard from "@/components/ProductCard/ProductCard";
import productApi from "@/redux/features/product/productApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { TProduct } from "@/types";

const Products = () => {

    const {data:products,isLoading} = productApi.useGetAllProductQuery(undefined);
   
    

    if(isLoading){
        return <SmallLoading />
    }

    return (
      <div className="py-10">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-700">
            Populler of our products
          </h2>
        </div>
        <div className="lg:my-10 my-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products?.data?.slice(0, 6)?.map((product:TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Products;