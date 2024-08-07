import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authApi from "@/redux/features/auth/authApi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  image: FileList;
};

const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<RegisterData>();
  const [registerHandler] = authApi.useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    if (data.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Your password must be at least 6 characters!",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    if (data.image.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Please provide your profile image!",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

    setRegisterLoading(true);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=0ba2b4921b02f88551c8a45a193a174e`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      if (result.success) {
        const userData = {
          name: data.name,
          email: data.email,
          password: data.password,
          profileImg: result.data.display_url,
        };

        // console.log("Register userData", userData);

        // Add your API call here to save the user data
        const res:any = await registerHandler(userData);
        // console.log("register res", res);
        if(res?.data?.success){
            setRegisterLoading(false);
             Swal.fire({
               icon: "success",
               title: `${res?.data?.message}`,
               showConfirmButton: false,
               timer: 1000,
             });
             reset();
             navigate("/login");
            
            
        }else{
            setRegisterLoading(false);
            Swal.fire({
              icon: "error",
              title: `${res?.error?.data?.message}`,
              showConfirmButton: false,
              timer: 1200,
            });
        }
        
      } else {
        setRegisterLoading(false);
        Swal.fire({
          icon: "error",
          title: "Image upload failed!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setRegisterLoading(false);
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="md:w-1/3 mx-auto bg-white rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-4 border-gray-800 rounded mt-20 mb-10"
        >
          <div className="card-body">
            <h1 className="text-2xl text-center font-bold text-black">
              Register now!
            </h1>
            <div className="form-control">
              <Label htmlFor="name" className="text-base ">
                Full Name
              </Label>
              <br />
              <Input
                {...register("name", { required: "Name is required" })}
                id="name"
                className=""
              />
            </div>
            <div className="form-control">
              <Label htmlFor="email" className="text-base ">
                Email
              </Label>
              <br />
              <Input
                {...register("email", { required: "Email is required" })}
                id="email"
                className=""
              />
            </div>
            <div className="form-control">
              <Label htmlFor="password" className="text-base ">
                Password
              </Label>
              <br />
              <Input
                {...register("password", { required: "Password is required" })}
                id="password"
                type="password"
                className=""
              />
            </div>
            <div className="form-control">
              <Label htmlFor="image" className="text-base ">
                Profile Image
              </Label>
              <br />
              <Input
                {...register("image")}
                id="image"
                type="file"
                className=""
              />
            </div>
            <div className="form-control mt-6">
              <Button
                type="submit"
                className="btn text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
              >
                {registerLoading ? (
                  <span className="loading loading-spinner mr-2"></span>
                ) : null}
                Submit
              </Button>
            </div>
          </div>
          <p className="text-black text-lg text-center mb-10">
            Have an account?{" "}
            <NavLink to="/login">
              <strong className="link text-[#76AE42]">login</strong>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
