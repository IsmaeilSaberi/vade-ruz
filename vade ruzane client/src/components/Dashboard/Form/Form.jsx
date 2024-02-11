import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createHD, updateHD } from "../../../actions/healthDetail.js";
import { setSnackBar } from "../../../actions/snackBar.js";

const Form = ({ user, currentId, setCurrentId }) => {
  const [hdData, setHDData] = useState({
    age: "",
    sex: "",
    weight: "",
    height: "",
  });
  const dispatch = useDispatch();

  const HD = useSelector((state) =>
    currentId ? state.healthDetails.find((h) => h._id === currentId) : null
  );

  const H = useSelector((state) =>
    user
      ? state.healthDetails.find(
          (h) =>
            h.userID === user?.userInfo?._id ||
            h.userID === user?.userInfo?.googleId
        )
      : null
  );

  useEffect(() => {
    if (HD) setHDData(HD);
  }, [HD]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hdData.age >= 18) {
      if (currentId === 0) {
        dispatch(createHD(hdData));
      } else {
        dispatch(updateHD(currentId, hdData));
      }
    } else if (hdData.age >= 18) {
      dispatch(setSnackBar(true, "error", "AGE MUST BE OVER 18"));
    } else {
      dispatch(setSnackBar(true, "error", "NO FILLED OR WRONG DATA"));
    }

    clear();
  };

  const onChange = (e) =>
    setHDData({ ...hdData, [e.target.name]: e.target.value });

  const clear = () => {
    setCurrentId(0);
    setHDData({ age: "", sex: "", weight: "", height: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">
          {currentId ? "Update" : "Fill in"} Your Health Details
        </h2>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={hdData.age}
          onChange={onChange}
          className="block w-full p-3 border border-gray-300 rounded-md"
        />
        <select
          name="sex"
          value={hdData.sex}
          onChange={onChange}
          className="block w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="weight"
          placeholder="Weight: kg"
          value={hdData.weight}
          onChange={onChange}
          className="block w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="height"
          placeholder="Height: cm"
          value={hdData.height}
          onChange={onChange}
          className="block w-full p-3 border border-gray-300 rounded-md"
        />
        {!H && (
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md"
            type="submit"
          >
            Create
          </button>
        )}
        {currentId !== 0 && (
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md"
            type="submit"
          >
            Update
          </button>
        )}
        <button
          className="w-full py-3 bg-red-500 text-white rounded-md"
          onClick={clear}
          type="button"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;
