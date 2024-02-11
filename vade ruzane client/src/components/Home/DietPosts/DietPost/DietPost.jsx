import { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../../../actions/snackBar.js";
import {
  updateDietPost,
  deleteDietPost,
  likeDietPost,
} from "../../../../actions/diet.js";

const DietPost = ({ user, dietPost }) => {
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const initial = {
    Vegetables: dietPost?.Vegetables,
    Fruits: dietPost?.Fruits,
    Grains: dietPost?.Grains,
    Proteins: dietPost?.Proteins,
  };
  const [newDietData, setNewDietData] = useState(initial);

  useEffect(() => {
    if (newDietData) setNewDietData(newDietData);
  }, [newDietData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewDietData(initial);
  };

  const updateDietData = async (e) => {
    e.preventDefault();
    if (!flag) {
      dispatch(setSnackBar(true, "error", "PLEASE SELECT TIME TO UPDATE"));
    } else {
      dispatch(updateDietPost(dietPost._id, newDietData));
      setNewDietData(initial);
      setFlag(false);
      setOpen(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4" key={dietPost?._id}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{dietPost?.creator}</h2>
          <p className="text-sm text-gray-500">
            Created {moment(dietPost?.createdAt).fromNow()}
          </p>
        </div>
        {user &&
          (user?.userInfo?._id === dietPost.ID ||
            user?.userInfo?.googleId === dietPost.ID) && (
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClickOpen}
              >
                Update
              </button>
            </div>
          )}
      </div>
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-bold">Vegetables Dishes</h3>
        <div className="flex justify-between items-center">
          <p>
            {moment(dietPost?.Vegetables?.start).format("LT")} -{" "}
            {moment(dietPost?.Vegetables?.end).format("LT")}
          </p>
        </div>
        {dietPost?.Vegetables?.recipes?.map((item) => (
          <div className="flex items-center space-x-2" key={item._id}>
            <img src={item.img} alt={item.title} className="w-16 h-16" />
            <p className="text-base">{item.title}</p>
            <p className="text-base">{item.calories} Kcal</p>
          </div>
        ))}
      </div>
      {/* ... (similar sections for Fruits, Grains, and Proteins) */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(deleteDietPost(dietPost._id))}
        >
          Delete
        </button>
      </div>
      {/* ... (other JSX content) */}
    </div>
  );
};

export default DietPost;
