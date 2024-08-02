import paymentApi from "@/redux/features/payment/paymentApi";
import SmallLoading from "../SharedPage/Loading/SmallLoading";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";

const ConformProduct = () => {
    const user = useAppSelector((state)=>state.auth.user);
    console.log('user', user.email)
    const {data:conformProducts, isLoading} = paymentApi.useOrdersConformProductsQuery(user?.email);

    console.log("consform product", conformProducts?.data);

    if(isLoading){
        return <SmallLoading />
    }

    return (
      <div className="w-11/12 mx-auto py-10">
        <div>
          <div>
            <h2 className="text-3xl font-bold mb-16 text-center text-slate-700 ">
              Orders Conform Products
            </h2>
          </div>
        </div>
        <div>
          <div>
            {conformProducts?.data.length === 0 ? (
              <>
                <div className="h-52 flex justify-center items-center text-2xl font-semibold text-[#76AE42]">
                  <h2>Conform Products is not Available!!</h2>
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <div className="overflow-x-auto">
                    <table className="table border-1 ">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>
                            <label>
                              <input type="checkbox" className="checkbox" />
                            </label>
                          </th>
                          <th className="text-base text-bold">Product Name</th>
                          <th className="text-base text-bold">Category</th>
                          <th className="text-base text-bold">Brand</th>
                          <th className="text-base text-bold">Price</th>
                          <th className="text-base text-bold">Quantity</th>
                          <th className="text-base text-bold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && (
                          <>
                            <SmallLoading />
                          </>
                        )}
                        {conformProducts?.data?.map((product, idx: number) => (
                          <tr key={idx}>
                            <th>
                              <label>
                                <td>{idx + 1}</td>
                              </label>
                            </th>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      src={product?.orderProductId?.image}
                                      alt="Conform Product"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {product?.orderProductTitle}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {product?.orderProductCategory}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{product?.orderProductCategory}</td>
                            <td>{product?.orderProductId?.brand}</td>
                            <td>${product?.orderProductPrice}</td>
                            <td>{product?.orderProductQuantity}</td>
                            <td>
                              <Button className="text-base text-slate-100 bg-gradient-to-r from-[#76AE42] to-[#AFD136] py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300 ml-3">
                                Pending Order
                              </Button>
                              <Button
                                // onClick={() =>
                                //   handleDeleteCategory(category?._id)
                                // }
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default ConformProduct;