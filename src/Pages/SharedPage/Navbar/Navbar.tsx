import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/Online nursery Logo/logo.png";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const cartItem = useAppSelector((state) => state.products.products);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log("user", user);

  const logOuthandler = async()=>{
    
    try {
      if (!user?.email) {
        Swal.fire({
          icon: "error",
          title: "Please login your account!!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }else{
        const res = await dispatch(logOut());
        if (res.type === "auth/logOut") {
          Swal.fire({
            icon: "success",
            title: "User Logout Successfull!!",
            showConfirmButton: false,
            timer: 1200,
          });
        }

      }
      
    } catch (error) {
      Swal.fire({
      icon: "error",
      title: "Logout Faield!!",
      showConfirmButton: false,
      timer: 1000,
    });
      
    }
   
  }

  return (
    <div>
      <div className="navbar w-11/12 mx-auto border-b-2 bg-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="mr-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-base text-slate-700  rounded-none border-b-2 border-[#76AE42]"
                      : "font-medium text-base text-slate-700 btn-none "
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="mr-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-base text-slate-700 rounded-none border-b-2 border-[#76AE42]"
                      : "font-medium text-base text-slate-700 btn-none"
                  }
                  to="/product-category-management"
                >
                  Product Management
                </NavLink>
              </li>
              <li className="mr-2">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-base text-slate-700 rounded-none border-b-2 border-[#76AE42]"
                      : "font-medium text-base text-slate-700 btn-none"
                  }
                  to="/all-product-list"
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/">
            <div>
              <img className="w-full h-20" src={logo} alt="logo" />
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="mr-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-base text-slate-700  rounded-none border-b-2 border-[#76AE42]"
                    : "font-medium text-base text-slate-700 btn-none "
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="mr-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-base text-slate-700 rounded-none border-b-2 border-[#76AE42]"
                    : "font-medium text-base text-slate-700 btn-none"
                }
                to="/product-category-management"
              >
                Product Management
              </NavLink>
            </li>
            <li className="mr-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-base text-slate-700 rounded-none border-b-2 border-[#76AE42]"
                    : "font-medium text-base text-slate-700 btn-none"
                }
                to="/all-product-list"
              >
                Products
              </NavLink>
            </li>
            {!user && user===null && <li className="mr-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-base text-slate-700 rounded-none border-b-2 border-[#76AE42]"
                    : "font-medium text-base text-slate-700 btn-none"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="indicator">
            <NavLink to="/product/add-to-cart-list">
              <Button className="text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-2 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span className="badge badge-md badge-neutral indicator-item">
                  {cartItem.length ? cartItem.length : 0}
                </span>
                Cart
              </Button>
            </NavLink>
          </div>

          {user && user.email ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ml-5 md:ml-8"
                >
                  <div className="w-10 h-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <NavLink to="/users/profiles">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                  </NavLink>
                  <NavLink to="/users/settings">
                    <li>
                      <a>Settings</a>
                    </li>
                  </NavLink>
                  <li onClick={logOuthandler}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <div className="ml-5 md:ml-8">
                    <span>
                      <FaUserCircle className="h-9 w-9 text-gray-800" />
                    </span>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li onClick={logOuthandler}>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li onClick={logOuthandler}>
                    <a>Settings</a>
                  </li>
                  <li onClick={logOuthandler}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          )}

          <label htmlFor="my-drawer-2" className=" lg:hidden ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
