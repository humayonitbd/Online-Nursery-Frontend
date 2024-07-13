import ProductCard from "@/components/ProductCard/ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types";


const CartListPage = () => {
    const products = useAppSelector((state) => state.products.products);
  
    
    return (
      <div>
        <div>
          <div className="py-10 w-11/12 mx-auto">
            {products?.length === 0 ? (
              <>
                <h2 className="text-center text-2xl py-10 font-semibold">
                  Add to Cart Product not Available , Please Add!!
                </h2>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {products?.map((product: TProduct) => (
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

export default CartListPage;