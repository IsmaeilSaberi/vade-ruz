import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";

import Input from "./Input/Input";
import { signup, signin } from "../../actions/authentication";
import { AUTH } from "../../constants/constantTypes";
import LockIcon from "../../assets/lock-icon.svg";

const Authentication = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
      setIsSignUp(false);
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={LockIcon} alt="Lock Icon" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? "ثبت نام" : "ورود"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                className="border-2 border-gray-800"
                name="firstName"
                label="نام"
                handleChange={handleChange}
                half
              />
              <Input
                className="border-2 border-gray-500"
                name="lastName"
                label="نام خانوادگی"
                handleChange={handleChange}
                half
              />
            </div>
          )}
          <Input
            className="border-2 border-gray-500"
            name="email"
            label="آدرس ایمیل"
            handleChange={handleChange}
            type="email"
          />
          <Input
            className="border-2 border-gray-500"
            name="password"
            label="رمز عبور"
            handleChange={handleChange}
            handleShowPassword={handleShowPassword}
            type={showPassword ? "text" : "password"}
          />
          {isSignUp && (
            <Input
              className="border-2 border-gray-500"
              name="confirmPassword"
              label="تکرار رمز عبور"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type="password"
            />
          )}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSignUp ? "ثبت نام" : "ورود"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isSignUp
              ? "حساب کاربری دارید؟ ورود"
              : "حساب کاربری ندارید؟ ثبت نام"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
