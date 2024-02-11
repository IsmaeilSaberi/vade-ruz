import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HealthDetail = ({ user, setCurrentId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const H = useSelector((state) =>
    user
      ? state.healthDetails.find(
          (h) =>
            h.userID === user?.userInfo?._id ||
            h.userID === user?.userInfo?.googleId
        )
      : null
  );

  const checkData = (given) => (H?.hasOwnProperty(given) ? H[given] : "N/A");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div key={H?._id} className="container mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl">{user?.userInfo?.name}</h1>
        </div>
        <div>
          <button onClick={handleClickOpen} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          {H && (
            <button onClick={() => setCurrentId(H._id)} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
          {H && (
            <button onClick={() => dispatch(deleteHD(H._id))} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="my-4">
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
              id="dialog-title"
            >
              Information About Health Statistics
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                - Age counted as in years unit (y)
                <br />
                <br />
                - Weight counted as in kilogram unit (kg)
                <br />
                <br />
                - Height counted as in centimeter unit (cm)
                <br />
                <br />
                - BMI (Body Mass Index) a value derived from the mass and height
                of a person. The formula is equal to Weight(kg) / (Height(cm) *
                Height(cm)), the normal figure ranging from 18.5 - 24.9
                <br />
                <br />
                - BMR (Basal Metabolic Rate) is the number of calories required
                to keep your body functioning at rest.
                <br />
                The formula for men is 66.47 + (13.75 * weight in kilogram) +
                (5.003 * height in centimeter) − (6.755 * age in years)
                <br />
                The formula for women is 655.1 + (9.563 * weight in kilogram) +
                (1.85 * height in centimeter) - (4.676 * age in years)
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="my-4">
        <div>
          <h2 className="text-2xl">Age</h2>
          <p className="text-xl">{checkData("age")}</p>
        </div>
        <div>
          <h2 className="text-2xl">Weight</h2>
          <p className="text-xl">{checkData("weight")}</p>
        </div>
        <div>
          <h2 className="text-2xl">Height</h2>
          <p className="text-xl">{checkData("height")}</p>
        </div>
      </div>
      <div className="my-4">
        <div>
          <h2 className="text-2xl">BMI</h2>
          <p className="text-xl">{checkData("bmi")}</p>
        </div>
        <div>
          <h2 className="text-2xl">BMR</h2>
          <p className="text-xl">{checkData("bmr")}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthDetail;
