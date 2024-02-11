import { useState, useEffect, Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { setSnackBar } from "../../../actions/snackBar.js";

const DrawerNav = () => {
  const [state, setState] = useState({ right: false });
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (token.length < 500) {
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout();
        }
      } else {
        if (decodedToken.exp * 1000 - 2000000 < new Date().getTime()) {
          logout();
        }
      }
    }
    setUser(JSON.parse(localStorage.getItem("userProfile")));
  }, [location]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown") return;
    setState({ [anchor]: open });
  };

  const navigation = (text) => {
    // Define navigation logic here
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/authentication");
    dispatch(setSnackBar(true, "success", "SUCCESSFULLY LOGGED OUT"));
    setUser(null);
  };

  const checkIcon = (text) => {
    // Define icon rendering logic here
  };

  const list = (anchor) => {
    // Define list rendering logic here
  };

  return (
    <div>
      <Fragment key={"right"}>
        <button onClick={toggleDrawer("right", true)}>
          <span className="text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </span>
        </button>
        {state["right"] && (
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow z-20">
            {list("right")}
            <footer className="text-center py-2 text-gray-600 text-sm">
              Copyright &copy; 2024 by Your Name
            </footer>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default DrawerNav;
