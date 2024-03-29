import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// import components
import HealthDetail from "./HealthDetail/HealthDetail";
import Form from "./Form/Form";

// import actions
import { getHD } from "../../actions/healthDetail";

const Dashboard = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    dispatch(getHD());
  }, [currentId, dispatch]);

  if (!user) {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold p-5">پنل کاربری</h1>
        <div className="my-10">
          <p className="text-2xl">
            لطفا وارد حساب کاربری تان شوید یا ثبت نام کنید!
          </p>
        </div>
      </div>
    );
  }

  if (user?.userInfo?.role !== "ADMIN") {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold p-5">به پنل کاربری تان خوش آمدید!</h1>
        <div className="my-10">
          <HealthDetail user={user} setCurrentId={setCurrentId} />
          <Form user={user} currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold p-5">پنل کاربری</h1>
      <div className="my-10">
        <p className="text-2xl">
          {" "}
          لطفا وارد حساب کاربری تان شوید یا ثبت نام کنید!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
