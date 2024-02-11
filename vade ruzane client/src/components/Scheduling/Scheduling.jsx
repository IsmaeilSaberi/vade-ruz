import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DietPost from "../Home/DietPosts/DietPost/DietPost.jsx";
import { getDietPost } from "../../actions/diet.js";
import moment from "moment";

const Scheduling = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([
    { Subject: "", Description: "", StartTime: "", EndTime: "" },
  ]);
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const dietPosts = useSelector((state) =>
    state.diets.filter(
      (post) =>
        post.ID === user?.userInfo?._id || post.ID === user?.userInfo?.googleId
    )
  );

  useEffect(() => {
    dispatch(getDietPost());
  }, [data]);

  const extractData = (string) => {
    // ... (remaining extractData code remains the same)
  };

  const handleDisplay = (e) => {
    e.preventDefault();
    setData(extractData("custom"));
  };

  const addToGoogleCalendar = (e) => {
    e.preventDefault();
    setData(extractData("custom"));
    if (user?.userInfo?._id) {
      dispatch(setSnackBar(true, "error", "YOU ARE NOT AUTHORIZED BY GOOGLE"));
    } else {
      // ... (remaining addToGoogleCalendar code remains the same)
    }
  };

  return (
    <div className="p-4">
      {!user ? (
        <div className="container mx-auto">
          <h1 className="text-4xl py-2">Welcome to Schedule</h1>
          <div className="my-4">
            <p className="text-lg">YOU ARE NOT AUTHORIZED . . .</p>
          </div>
        </div>
      ) : user?.userInfo?.role !== "ADMIN" ? (
        <div className="container mx-auto">
          <h1 className="text-4xl py-2">Welcome to Schedule</h1>
          <div className="my-4">
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white rounded-md py-2 px-4"
                onClick={addToGoogleCalendar}
              >
                Add To Your Google Calendar
              </button>
              <button
                className="bg-blue-500 text-white rounded-md py-2 px-4"
                onClick={handleDisplay}
              >
                Display Your Schedule
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dietPosts &&
              dietPosts?.map((dietPost) => (
                <div key={dietPost._id}>
                  <DietPost user={user} dietPost={dietPost} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl py-2">Welcome to Schedule</h1>
          <div className="my-4">
            <p className="text-lg">ADMIN ARE NOT AUTHORIZED . . .</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;
