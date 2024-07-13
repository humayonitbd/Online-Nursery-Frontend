import AddToProductModal from "@/components/AddToProductModal/AddToProductModal";
import { Button } from "@/components/ui/button";
import productApi from "@/redux/features/product/productApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { TProduct } from "@/types";
import Swal from "sweetalert2";
import UpdateToProductModal from "@/components/AddToProductModal/UpdateToProductModal";

const ProductManagement = () => {
  const { data, isLoading } = productApi.useGetAllProductQuery(undefined);
  const [deleteProduct] = productApi.useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
      const res = await deleteProduct(id).unwrap();
      if(res.success){
        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
        });

      }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the product.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <SmallLoading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-center text-xl font-semibold">
          Product Management
        </h2>
        <div className="">
          <AddToProductModal />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table border-1">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              data?.data?.map((product: TProduct, idx: number) => (
                <tr key={product._id}>
                  <th>
                    <label>{idx + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={product.image} alt="Product" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.rating}</td>
                  <td>
                    <UpdateToProductModal product={product} />
                    <Button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-base text-slate-200 bg-gray-700 ml-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
