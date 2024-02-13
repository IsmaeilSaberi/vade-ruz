import * as api from "../api/index.js";
import { AUTH } from "../constants/constantTypes.js";
import { setSnackBar } from "./snackBar.js";
// CREATE ACTION CREATORS

// Sign In action
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    // dispatch AUTH type action with data as payload
    dispatch({ type: AUTH, payload: data });

    const user = JSON.parse(localStorage.getItem("userProfile"));

    if (user?.userInfo?.role === "USER") {
      // push back from current path to /dashboard
      navigate("/dashboard");
    } else {
      // push back from current path to /admin
      navigate("/admin");
    }

    // console.log(data);
    dispatch(setSnackBar(true, "success", "ورود موفقیت آمیز"));
  } catch (error) {
    console.log(error.message);
    dispatch(setSnackBar(true, "error", "نام کاربری یا رمز عبور صحیح نیست!"));
  }
};

// Sign Up action
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });
    // push back from current path to /authentication
    navigate("/authentication");
    // console.log(data);
    dispatch(setSnackBar(true, "success", "ثبت نام وفقیت آمیز!"));
  } catch (error) {
    console.log(error.message);
    dispatch(
      setSnackBar(
        true,
        "error",
        "لطفا با حساب دیگری ثبت نام کنید یا وارد حساب کاربری تان شوید!"
      )
    );
  }
};
