import { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../../../actions/snackBar.js";
import { getDietPost, createDietPost } from "../../../actions/diet.js";

const Dietmodel = ({
  HD,
  user,
  setMainFlag,
  veggiesArray,
  setVeggiesArray,
  totalVeggies,
  setTotalVeggies,
  fruitsArray,
  setFruitsArray,
  totalFruits,
  setTotalFruits,
  grainsArray,
  setGrainsArray,
  totalGrains,
  setTotalGrains,
  proteinsArray,
  setProteinsArray,
  totalProteins,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const initial = {
    recipes: [{ title: "", img: "", calories: "", serving_qty: "" }],
    start: new Date(),
    end: new Date(),
  };
  const [dietData, setDietData] = useState({
    Vegetables: initial,
    Fruits: initial,
    Grains: initial,
    Proteins: initial,
  });

  useEffect(() => {
    dispatch(getDietPost());
  }, []);

  const DBDietPost = useSelector((state) =>
    state.diets.filter(
      (diet) =>
        diet.ID === user?.userInfo?._id || diet.ID === user?.userInfo?.googleId
    )
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDietData({
      Vegetables: initial,
      Fruits: initial,
      Grains: initial,
      Proteins: initial,
    });
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dietData.Vegetables.recipes[0].title === "") {
      dispatch(
        setSnackBar(
          true,
          "error",
          "PLEASE ADD PRODUCTS OR SET TIME BEFORE CREATE MODEL"
        )
      );
    } else {
      const today = new Date();
      const post = DBDietPost.find(
        (post) =>
          moment(post?.createdAt).format("L") === moment(today).format("L")
      );

      if (post) {
        dispatch(setSnackBar(true, "error", "DIET PLAN CREATED FOR TODAY"));
      } else {
        dispatch(createDietPost(dietData));
        setVeggiesArray([]);
        setFruitsArray([]);
        setGrainsArray([]);
        setProteinsArray([]);
        setMainFlag(true);
      }
    }
  };

  return (
    <div className="container">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickOpen}
      >
        Total Calories: {HD?.bmr} Kcal
      </button>
      {open && (
        <div className="fixed bg-gray-200 bg-opacity-75 top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Total Calories: {HD?.bmr} Kcal
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <p className="text-grains">
                  Whole Grains Group: {totalGrains} / {(HD?.bmr * 25) / 100}{" "}
                  Kcal
                </p>
                {grainsArray?.map((k, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <img src={k.img} alt={k.title} className="w-12 h-12" />
                    <p>{k.title}</p>
                    <p>{k.calories} Kcal</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Create
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dietmodel;
