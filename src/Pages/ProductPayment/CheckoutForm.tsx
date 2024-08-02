import { Button } from "@/components/ui/button";
import { deletePaymentBookingProduct } from "@/redux/features/bookingProduct/bookingProductSlice";
import paymentApi from "@/redux/features/payment/paymentApi";
import { useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({
  paymentProduct,
  userData,
}: {
  paymentProduct: TProduct;
  userData: { userName: string; userEmail: string | null; userAddress: string };
}) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();
  const { price, title, _id, category, quantity } = paymentProduct;
  const stripe = useStripe();
  const elements = useElements();

  const [createPaymentSecret] = paymentApi.useCreatePaymentSecretMutation();
  const [paymentBooking] = paymentApi.useProductBookingPaymentMutation();

  useEffect(() => {
    const fetchPaymentSecret = async () => {
      try {
        if (price) {
          const res = await createPaymentSecret({ price }).unwrap();
          const secret = res?.data?.clientSecret;
          setClientSecret(secret);
        }
      } catch (error) {
        console.error("Error creating payment secret:", error);
      }
    };
    fetchPaymentSecret();
  }, [price, createPaymentSecret]);

  const fetchPaymentBooking = async (payment: any) => {
    try {
      const res = await paymentBooking(payment).unwrap();
      console.log('payment respons', res);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: res?.message || "Product Payment Successful!!",
          showConfirmButton: false,
          timer: 1200,
        }); 
        dispatch(deletePaymentBookingProduct(_id));
        navigate("/"); 
      }else{
        Swal.fire({
          icon: "error",
          title: `${res?.data?.message}`,
          showConfirmButton: false,
          timer: 1200,
        });
    }
  } 
    catch (error: any) {
      if(error.status === 400){
        Swal.fire({
        icon: "error",
        title: `${error?.data?.message}`,
        showConfirmButton: false,
        timer: 1200,
      });
      }
      
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setCardError("Card information is not available.");
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message as string);
      return;
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userData?.userName,
            email: userData?.userEmail,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message as string);
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const payment = {
        orderProductTitle: title,
        orderProductPrice: price,
        orderProductCategory: category,
        orderProductQuantity: quantity,
        transactionId: paymentIntent.id,
        userEmail: userData.userEmail,
        orderProductId: _id,
      };

      await fetchPaymentBooking(payment);
      
    }

    setProcessing(false);
  };

  return (
    <form
      className="w-full bg-slate-200 p-3 mt-5 rounded"
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
      <Button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full mt-5 text-lg font-bold bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
      >
        Pay
      </Button>
      <p className="text-orange-500">{cardError}</p>
      
    </form>
  );
};

export default CheckoutForm;
