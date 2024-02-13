import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center flex-col gap-2 md:flex-row">
          <Link to="/" className="text-2xl font-bold text-green-600 ml-2">
            <img src={logo} alt="icon" className="h-16" />
          </Link>
          <Link
            to="/authentication"
            className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-white"
          >
            ورود / ثبت نام
          </Link>
        </div>
        <nav>
          <Link to="/menu" className="text-gray-800 hover:text-gray-600 mx-4">
            منو
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-gray-600 mx-4">
            درباره ما
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-gray-600 mx-4"
          >
            تماس با ما
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
