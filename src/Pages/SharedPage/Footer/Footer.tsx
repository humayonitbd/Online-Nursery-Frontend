import { NavLink } from "react-router-dom";
import footerImage from "../../../assets/Online nursery Logo/bg-remove-logo.png";
const Footer = () => {
  return (
    <div>
      <footer className="footer bg-[#1F2937] text-white w-11/12 mx-auto p-10 mt-5">
        <NavLink to="/">
          <img className="w-full h-20" src={footerImage} alt="Footer image" />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </NavLink>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a href="#productSec" className="link link-hover">
            Products
          </a>
          <a href="#gallerySec" className="link link-hover">
            Gallery
          </a>
          <a href="#categorySec" className="link link-hover">
            Category
          </a>
          <a href="#productSec" className="link link-hover">
            Populler
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Company Management</h6>
          <a
            href="product-category-management/product-management"
            className="link link-hover"
          >
            Product Management
          </a>
          <a
            href="product-category-management/category-management"
            className="link link-hover"
          >
            Category Management
          </a>
          <a href="product/add-to-cart-list" className="link link-hover">
            shopping Page
          </a>

          <a href="#categorySec" className="link link-hover">
            Populler Category
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
