import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HealthDetail = ({ user, setCurrentId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const H = useSelector((state) =>
    user
      ? state.healthDetails.find(
          (h) =>
            h.userID === user?.userInfo?._id ||
            h.userID === user?.userInfo?.googleId
        )
      : null
  );

  const checkData = (given) =>
    H?.hasOwnProperty(given) ? H[given] : "بدون داده";

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
          <h1 className="text-2xl">{user?.userInfo?.name}</h1>
        </div>
        <div>
          <button
            onClick={handleClickOpen}
            className="p-2 flex gap-1 justify-center items-center"
          >
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
            مشاهده توصیه های سلامتی
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
      {open ? (
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
                اطلاعات تکمیلی شاخص های سلامتی
              </h3>
              <div className="mt-2">
                <p className="text-sm text-right text-gray-500">
                  - سن بر حسب سال محاسبه شده است (y)
                  <br />
                  <br />
                  - سن بر حسب واحد کیلوگرم محاسبه شده است (kg)
                  <br />
                  <br />
                  - قد بر حسب واحد سانتی متر محاسبه شده است (cm)
                  <br />
                  <br />
                  - شاخص توده بدنی(یا BMI) که از فرمول با فرمول مقابل محاسبه می
                  شود: وزن تقسیم بر قد به متر ضربدر خودش و محدوده ی نرمال آن از
                  18.5 تا 24.9 است.
                  <br />
                  <br />
                  - نرخ متابولیک پایه یا BMR که تعداد کالری های لازم برای حفظ
                  عملکردهای بدن در حالت استراحت می باشد.
                  <br />
                  این فرمول برای مردان به صورت مقابل است: 66.47 + (13.75 * وزن
                  به کیلوگرم) + (5.003 * قد به سانتی متر) - (6.755 * سن به سال)
                  <br />
                  این فرمول برای خانم ها به صورت زیر می باشد: 6.551 + (9.563 *
                  وزن به کیلوگرم) + (1.85 * قد به سانتی متر) - (4.676 * سن به
                  سال)
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="my-4">
        <div>
          <h2 className="text-2xl">سن</h2>
          <p className="text-xl">{checkData("age")}</p>
        </div>
        <div>
          <h2 className="text-2xl">وزن</h2>
          <p className="text-xl">{checkData("weight")}</p>
        </div>
        <div>
          <h2 className="text-2xl">قد</h2>
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
