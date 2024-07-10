import { NavLink } from "react-router-dom";
import footerImage from "../../../assets/Online nursery Logo/logo.png";
const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content w-11/12 mx-auto p-10 mt-5">
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
          <NavLink to="/" className="link link-hover">
            Branding
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Design
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Marketing
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Advertisement
          </NavLink>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <NavLink to="/" className="link link-hover">
            About us
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Contact
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Jobs
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Press kit
          </NavLink>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <NavLink to="/" className="link link-hover">
            Terms of use
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Privacy policy
          </NavLink>
          <NavLink to="/" className="link link-hover">
            Cookie policy
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
