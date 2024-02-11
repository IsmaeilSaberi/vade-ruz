import React, { useState, useEffect } from "react";

function Foodcard({
  cardi,
  text,
  text1,
  flag1,
  setFlag1,
  currentArray,
  setCurrentArray,
  currentArray1,
  setCurrentArray1,
  countIngredients,
  setCountIngredients,
  countRecipes,
  setCountRecipes,
}) {
  const [isChosen, setIsChosen] = useState(false);
  const [isChosen1, setIsChosen1] = useState(false);
  const [serving, setServing] = useState(cardi.serving_qty);

  let arr = currentArray;
  let arr1 = currentArray1;

  useEffect(() => {
    if (flag1 === true) {
      setIsChosen(false);
      setIsChosen1(false);
      setServing(cardi.serving_qty);
    }
  }, [flag1]);

  const handleToggled = (e) => {
    e.preventDefault();
    setIsChosen((prevState) => !prevState);
    setFlag1(false);
    if (!isChosen) {
      arr.push({
        title: cardi.name,
        img: cardi.imgURL,
        calories: parseFloat((cardi.calories * serving).toFixed(2)),
        serving_qty: parseInt(serving),
      });
      setCurrentArray([...arr]);
      setCountIngredients(countIngredients + 1);
    } else {
      let index = arr.findIndex((item) => item.title === cardi.name);
      if (index !== -1) {
        arr.splice(index, 1);
        setCurrentArray([...arr]);
        setCountIngredients(countIngredients - 1);
        setServing(cardi.serving_qty);
      }
    }
  };

  const handleToggled1 = (e) => {
    e.preventDefault();
    setIsChosen1((prevState) => !prevState);
    setFlag1(false);
    if (!isChosen1) {
      arr1.push({
        title: cardi.title,
        img: cardi.imgURL,
        calories: parseFloat(cardi.calories),
      });
      setCurrentArray1([...arr1]);
      setCountRecipes(countRecipes + 1);
    } else {
      let index = arr1.findIndex((item) => item.title === cardi.title);
      if (index !== -1) {
        arr1.splice(index, 1);
        setCurrentArray1([...arr1]);
        setCountRecipes(countRecipes - 1);
      }
    }
  };

  const onChange = (e) => {
    setFlag1(false);
    setServing(e.target.value);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={cardi.imgURL}
        alt={cardi.name || cardi.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {cardi.name || cardi.title}
        </div>
        <p className="text-gray-700 text-base">
          Fat: {cardi.fat || 0}g, Carbs: {cardi.carbs || 0}g, Cholesterol:{" "}
          {cardi.cholesterol || 0}mg, Sugars: {cardi.sugars || 0}g, Proteins:{" "}
          {cardi.proteins || 0}g
        </p>
        {text1 === "fruit" && (
          <input
            type="number"
            name="serving_qty"
            value={serving}
            onChange={onChange}
          />
        )}
      </div>
      <div className="px-6 py-4">
        {text === "food" ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleToggled}
          >
            {isChosen ? "Chosen" : "Choose"}
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleToggled1}
          >
            {isChosen1 ? "Chosen" : "Choose"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Foodcard;
