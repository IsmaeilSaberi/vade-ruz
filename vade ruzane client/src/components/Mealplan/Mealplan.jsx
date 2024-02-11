import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Foodcards from "./Foodcards/Foodcards";
import Dietmodel from "./Dietmodel/Dietmodel";
import Pievisual from "./Pievisual/Pievisual";
import arrow from "../../image/arrow-gif.gif";

// import actions
import { getHD } from "../../actions/healthDetail.js";

function Mealplan() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [mainFlag, setMainFlag] = useState(false);

  const [totalVeggies, setTotalVeggies] = useState(0);
  const [totalFruits, setTotalFruits] = useState(0);
  const [totalGrains, setTotalGrains] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);

  const [veggiesArray, setVeggiesArray] = useState([]);
  const [fruitsArray, setFruitsArray] = useState([]);
  const [grainsArray, setGrainsArray] = useState([]);
  const [proteinsArray, setProteinsArray] = useState([]);

  const user = JSON.parse(localStorage.getItem("userProfile"));

  useEffect(() => {
    dispatch(getHD());
  }, []);

  const HD = useSelector((state) =>
    user
      ? state.healthDetails.find(
          (h) =>
            h.userID === user?.userInfo?._id ||
            h.userID === user?.userInfo?.googleId
        )
      : null
  );

  return (
    <div className="p-4">
      {!user ? (
        <div className="container mx-auto">
          <h1 className="text-4xl py-2">Welcome to Mealplan</h1>
          <hr className="my-4" />
          <div className="flex justify-center items-center">
            <p className="text-lg">USER ARE NOT AUTHORIZED . . .</p>
          </div>
        </div>
      ) : user?.userInfo?.role !== "ADMIN" ? (
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <Foodcards
              HD={HD}
              user={user}
              mainFlag={mainFlag}
              setMainFlag={setMainFlag}
              setVeggiesArray={setVeggiesArray}
              setTotalVeggies={setTotalVeggies}
              setFruitsArray={setFruitsArray}
              setTotalFruits={setTotalFruits}
              setGrainsArray={setGrainsArray}
              setTotalGrains={setTotalGrains}
              setProteinsArray={setProteinsArray}
              setTotalProteins={setTotalProteins}
            />
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full md:w-3/4">
              <div className="flex justify-center items-center">
                {/* Displaying shapes with calculated values */}
              </div>
              <hr className="my-4" />
              <div className="flex justify-center items-center">
                <Dietmodel
                  HD={HD}
                  user={user}
                  setMainFlag={setMainFlag}
                  veggiesArray={veggiesArray}
                  setVeggiesArray={setVeggiesArray}
                  totalVeggies={totalVeggies}
                  setTotalVeggies={setTotalVeggies}
                  fruitsArray={fruitsArray}
                  setFruitsArray={setFruitsArray}
                  totalFruits={totalFruits}
                  setTotalFruits={setTotalFruits}
                  grainsArray={grainsArray}
                  setGrainsArray={setGrainsArray}
                  totalGrains={totalGrains}
                  setTotalGrains={setTotalGrains}
                  proteinsArray={proteinsArray}
                  setProteinsArray={setProteinsArray}
                  totalProteins={totalProteins}
                  setTotalProteins={setTotalProteins}
                />
                <img src={arrow} className="w-16 h-16" />
                <p className="text-xl">Create Model Here</p>
              </div>
              <div className="flex justify-center items-center">
                <Pievisual />
                <p className="text-lg">Your Healthy Eating Plate Model</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl py-2">Welcome to Mealplan</h1>
          <hr className="my-4" />
          <div className="flex justify-center items-center">
            <p className="text-lg">ADMIN ARE NOT AUTHORIZED . . .</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mealplan;
