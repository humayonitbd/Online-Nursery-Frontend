import { TUser } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";

export const notUserFn = (user: TUser) => {
  if (!user?.email) {
    return Swal.fire({
      icon: "error",
      title: `You don't login user!! Please login!`,
      showConfirmButton: false,
      timer: 1200,
    });
  }
};

export const notUserReviewMessage = () => {
    return Swal.fire({
      icon: "error",
      title: `Its Message is not yours`,
      showConfirmButton: false,
      timer: 1200,
    });

};