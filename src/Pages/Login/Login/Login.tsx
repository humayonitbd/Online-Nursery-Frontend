import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authApi from "@/redux/features/auth/authApi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<LoginData>();
  const [loginHandler] = authApi.useLoginMutation();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log("Submitting login data:", data); // Add logging here
    if (data.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Your password must be at least 6 characters!",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    const loginData = {
      email: data.email,
      password: data.password,
    };
    console.log("loginData", loginData);

    // try {
    //   setLoginLoading(true);
    //   const res: any = await loginHandler(loginData);
    //   console.log("login res", res);

    //   if (res?.data?.success) {
    //     setLoginLoading(false);
    //     Swal.fire({
    //       icon: "success",
    //       title: `${res.data.message}`,
    //       showConfirmButton: false,
    //       timer: 1000,
    //     });
    //     reset();
    //     navigate("/");
    //   } else {
    //     setLoginLoading(false);
    //     Swal.fire({
    //       icon: "error",
    //       title: `${res?.data?.message || "Login failed!"}`,
    //       showConfirmButton: false,
    //       timer: 1200,
    //     });
    //   }
    // } catch (error: any) {
    //   console.error("Login error:", error);
    //   setLoginLoading(false);
    //   Swal.fire({
    //     icon: "error",
    //     title: `${error?.message || "An error occurred during login!"}`,
    //     showConfirmButton: false,
    //     timer: 1200,
    //   });
    // }
  };

  return (
    <div className="w-11/12 mx-auto py-10 md:py-20">
      <div className="md:w-1/3 mx-auto bg-white rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-4 border-gray-800 rounded"
        >
          <div className="card-body">
            <h1 className="text-2xl text-center font-bold text-black">
              Login now!
            </h1>
            <div className="form-control">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <br />
              <Input
                {...register("email", { required: "Email is required" })}
                id="email"
                type="email"
                className=""
              />
            </div>
            <div className="form-control">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <br />
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                id="password"
                type="password"
                className=""
              />
            </div>

            <div className="form-control mt-6">
              <Button
                type="submit"
                className="btn text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
              >
                {loginLoading ? (
                  <span className="loading loading-spinner mr-2"></span>
                ) : null}
                Login
              </Button>
            </div>
          </div>
          <p className="text-black text-lg text-center mb-10">
            Are you new user?{" "}
            <NavLink to="/register">
              <strong className="link text-[#76AE42]">Register</strong>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
