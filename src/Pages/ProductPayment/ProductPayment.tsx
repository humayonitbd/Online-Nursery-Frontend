
import { useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { TProduct } from "@/types";
import { RootState } from "@/redux/store";


// const stripePromise = loadStripe('process.env.REACT_APP_STRIP_KEY');
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);



const ProductPayment = () => {
    const {id} = useParams();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const userData = {
      userName,
      userEmail,
      userAddress
    }
    // const {data, isLoading} = productApi.useGetSingleProductQuery(id);
    const stateDatas = useAppSelector(
      (state: RootState) => state.products.products
    );
    const paymentProduct = stateDatas.find((data:TProduct) => data._id === id);
      // const paymentProductState = dispatch(singleBookingProduct(id));
    console.log("paymentProductState", paymentProduct);
    
    useEffect(() => {
      // Check if all fields are filled
      if (userName && userEmail && userAddress) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }, [userName, userEmail, userAddress]);

    if (!paymentProduct) {
      return <div className="text-center text-red-500 font-semibold text-2xl my-60">Product not found</div>;
    }
    
    return (
      <div className="py-10 w-11/12 mx-auto">
        <div className="px-4 md:px-32 lg:px-80 bg-gray-700 py-10 md:py-20">
          <h3 className="text-center text-2xl font-semibold text-slate-100 pb-8">
            ------Wellcome------
          </h3>
          <div className="bg-gray-600 rounded-md p-4">
            <div className="md:flex justify-start ">
              <div>
                <img
                  className="w-60 rounded-md mr-5"
                  src={paymentProduct?.image}
                  alt={paymentProduct?.title}
                />
              </div>
              <div>
                <h2>
                  <span className="text-lg font-semibold text-slate-800 mr-2">
                    Title:
                  </span>
                  <span className="text-slate-200 text-lg font-semibold">
                    {paymentProduct?.title}
                  </span>
                </h2>
                <p>
                  <span className="text-lg font-semibold text-slate-800 mr-2">
                    Category:
                  </span>
                  <span className="text-slate-200 text-lg font-semibold">
                    {paymentProduct?.category}
                  </span>
                </p>
                <p>
                  <span className="text-lg font-semibold text-slate-800 mr-2">
                    Quantity:
                  </span>
                  <span className="text-slate-200 text-lg font-semibold">
                    {paymentProduct?.quantity}
                  </span>
                </p>
                <p>
                  <span className="text-lg font-semibold text-slate-800 mr-2">
                    Price:
                  </span>
                  <span className="text-slate-200 text-lg font-semibold">
                    ${paymentProduct?.price}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <div className="">
                <div className="grid grid-cols-2 gap-5 my-5">
                  <div className="">
                    <label
                      htmlFor="name"
                      className="text-lg font-semibold text-gray-900 "
                    >
                      Type Name
                    </label>
                    <br />
                    <input
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full rounded-md py-2 mt-3 px-2"
                      type="text"
                      placeholder="type your name!!"
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="name"
                      className="text-lg font-semibold text-gray-900 "
                    >
                      Type Email
                    </label>
                    <br />
                    <input
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full rounded-md py-2 mt-3 px-2"
                      type="email"
                      placeholder="type your email!!"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="name"
                    className="text-lg font-semibold text-gray-900 "
                  >
                    Type Address
                  </label>
                  <br />
                  <input
                    onChange={(e) => setUserAddress(e.target.value)}
                    type="text"
                    className="w-full rounded-md py-2 mt-3 px-2"
                    placeholder="type your address!!"
                  />
                </div>
              </div>
            </div>

            <div className=" py-5">
              {isFormValid ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    paymentProduct={paymentProduct}
                    userData={userData}
                  />
                </Elements>
              ) : (
                <>
                  <div>
                    <div className="text-red-500 mb-4 text-center">
                      Please fill in your name, email, and address to proceed
                      with the payment.
                    </div>
                    <div className="w-full border border-red-500 p-4 rounded-md opacity-50 pointer-events-none">
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          paymentProduct={paymentProduct}
                          userData={userData}
                        />
                      </Elements>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductPayment;