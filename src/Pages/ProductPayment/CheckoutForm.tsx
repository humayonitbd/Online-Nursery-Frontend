
import { Button } from "@/components/ui/button";
import paymentApi from "@/redux/features/payment/paymentApi";
import { TProduct } from "@/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({
  paymentProduct,
  userData,
}: {
  paymentProduct: TProduct;
  userData:{userName:string; userEmail:string;userAddress:string;}
}) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [proccessing, setProccessing] = useState(false);
  const navigete = useNavigate();
  const { price, title, _id, category, quantity } = paymentProduct;
  const stripe = useStripe();
  const elements = useElements();

  const [createpaymentSecret] = paymentApi.useCreatePaymentSecretMutation();
  useEffect(() => {
    const fetchPaymentSecret = async () => {
      try {
        if (price) {
          const res = await createpaymentSecret({ price }).unwrap();
          const secret = res?.data?.clientSecret;
          setClientSecret(secret);
        }
      } catch (error) {
        console.error("Error creating payment secret:", error);
      }
    };
    fetchPaymentSecret();
  }, [price, createpaymentSecret]);

  const handleSubmit = async (e: FieldValues) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message as string);
    } else {
      setCardError("");
    }
    // setProccessing(true);
    const { paymentIntent, error: confromError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userData?.userName,
            email: userData?.userEmail,
          },
        },
      });
    if (confromError) {
      setCardError(confromError.message as string);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        orderProductTitle:title,
        orderProductPrice:price,
        orderProductCategory:category,
        orderProductQuantity:quantity,
        transactionId: paymentIntent.id,
        userEmail:userData.userEmail,
        orderProductId: _id,
      };

    //   console.log(payment);
    //   fetch("https://resale-market-server-taupe.vercel.app/payments", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       authorization: `bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //     body: JSON.stringify(payment),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.insertedId) {
    //         setTransactionId(paymentIntent.id);
    //         toast.success("Congrats ! your payment successfull");
    //         navigete("/dashboard/myorders");
    //       }
    //     });
    // }
    // setProccessing(false);
    // console.log("payment message", paymentIntent);
  };
}
  return (
    <form
      className="w-full  bg-slate-200 p-3 mt-5 rounded"
      onSubmit={handleSubmit}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {/* <button
        type="submit"
        className="w-full border-none  bg-orange-500 btn mt-5"
        // disabled={!stripe || !clientSecret || proccessing}
      >
        Pay
      </button> */}
      <Button
        type="submit"
        disabled={!stripe || !clientSecret || proccessing}
        className="w-full mt-5 text-lg font-bold bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
      >
        Pay
      </Button>
      <p className="text-orange-500">{cardError}</p>

      {transactionId && (
        <p className="text-orange-500">TransactionId: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm ;