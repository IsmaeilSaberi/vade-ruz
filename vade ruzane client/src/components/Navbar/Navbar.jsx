import { Link } from "react-router-dom";
import doctor from "../../image/doctor.png";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <img src={doctor} alt="icon" className="h-16" />
          <Link to="/" className="text-2xl font-bold ml-2">
            DAILY NUTRIENTS
          </Link>
        </div>
        <nav>
          <Link to="/menu" className="text-gray-800 hover:text-gray-600 mx-4">
            Menu
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-gray-600 mx-4">
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-gray-600 mx-4"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
