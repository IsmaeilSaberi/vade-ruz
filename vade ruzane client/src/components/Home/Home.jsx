import { useDispatch, useSelector } from "react-redux";
import { getDietPost } from "../../actions/diet";
import DietPosts from "./DietPosts/DietPosts";
import { useEffect, useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    dispatch(getDietPost());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">به صفحه اصلی خوش آمدید</h1>
      <hr className="my-4" />
      <h2 className="text-2xl">اخبار</h2>
      <hr className="my-4 w-3/4" />
      <div className="grid justify-items-center">
        <div className="w-full md:w-3/4">
          <DietPosts user={user} />
        </div>
      </div>
    </div>
  );
}

export default Home;
