
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              RentEase<span className="text-accent">.</span>
            </h2>

            <p className="text-sm leading-6 text-gray-300">
              Find your perfect place to call home.
              Making property rentals simple and convenient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-accent">Home</Link>
              <Link to="/properties" className="hover:text-accent">Explore Properties</Link>
              <Link to="/login" className="hover:text-accent">Login</Link>
              <Link to="/register" className="hover:text-accent">Register</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Contact
            </h3>

            <p className="text-sm">Email: support@rentease.com</p>
            <p className="text-sm mt-2">Sri Lanka</p>
          </div>

        </div>

        <div className="border-t border-white/20 mt-8 pt-5 text-center text-sm">
          © {new Date().getFullYear()} RentEase. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
