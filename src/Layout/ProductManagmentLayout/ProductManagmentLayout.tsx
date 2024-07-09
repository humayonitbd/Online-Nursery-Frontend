import {Outlet} from "react-router-dom"
import { NavLink } from "react-router-dom";
const ProductManagmentLayout = () => {
    return (
      <div>
        <div className="drawer lg:drawer-open w-11/12 mx-auto">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ml-2">
            {/* Page content here */}
            {/* <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label> */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li className="mb-3">
                <NavLink
                  className="text-lg bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-3 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
                  to="/product-category-management/product-management"
                >
                  Product Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-lg bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-3 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
                  to="/product-category-management/category-management"
                >
                  <a>Category Management</a>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default ProductManagmentLayout;