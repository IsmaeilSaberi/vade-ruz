import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Input = ({
  name,
  label,
  half,
  handleChange,
  type,
  handleShowPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`grid ${half ? "col-span-6" : "col-span-12"}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={showPassword ? "text" : type}
        name={name}
        id={name}
        autoComplete="off"
        required
        onChange={handleChange}
        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
      />
      {name === "password" && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-gray-500 focus:outline-none"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
