import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../../actions/snackBar.js";

const CustomizedSnackbars = () => {
  const dispatch = useDispatch();

  const snackbarOpen = useSelector((state) => state.snackbar.snackbarOpen);
  const snackbarType = useSelector((state) => state.snackbar.snackbarType);
  const snackbarMessage = useSelector(
    (state) => state.snackbar.snackbarMessage
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackBar(false, snackbarType, snackbarMessage));
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {snackbarOpen && (
        <div
          className={`rounded-md p-4 bg-${snackbarType}-100 border border-${snackbarType}-400 shadow-md`}
        >
          <div className={`flex items-center justify-between`}>
            <div className="flex items-center">
              <div className={`w-6 h-6 text-${snackbarType}-600`}>
                {snackbarType === "success" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {snackbarType === "error" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                )}
              </div>
              <p
                className={`ml-3 text-sm font-medium text-${snackbarType}-800`}
              >
                {snackbarMessage}
              </p>
            </div>
            <button
              className={`text-${snackbarType}-500`}
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.354 5.354a2 2 0 00-2.828 0L10 7.172 7.172 5.354a2 2 0 10-2.828 2.828L7.172 10l-2.828 2.828a2 2 0 102.828 2.828L10 12.828l2.828 2.828a2 2 0 002.828-2.828L12.828 10l2.828-2.828a2 2 0 000-2.828z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizedSnackbars;
