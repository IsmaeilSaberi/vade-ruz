import { useState } from "react";

import { getRecipesSearch } from "../../actions/recipesIngredients.js";
import { RecipesArr } from "../Mealplan/Foodcards/Data/defaultData.js";
import RecipesCard from "./RecipesCard/RecipesCard";

const Recipes = () => {
  const [searchData, setSearchData] = useState({
    search: "",
    region: "",
    typeDish: "",
    min: "",
    max: "",
  });
  const [recipesArray, setRecipesArray] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchData);
    getRecipesSearch(searchData).then((data) => setRecipesArray(data));
    setFlag(true);
  };

  const clear = () => {
    setFlag(false);
    setSearchData({ search: "", region: "", typeDish: "", min: "", max: "" });
    setRecipesArray([]);
  };

  const onChange = (e) =>
    setSearchData({ ...searchData, [e.target.name]: e.target.value });

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="search"
            value={searchData.search}
            onChange={onChange}
            placeholder="Search"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="region"
            value={searchData.region}
            onChange={onChange}
            placeholder="Region"
            className="border rounded-md p-2"
          />
          <select
            name="typeDish"
            value={searchData.typeDish}
            onChange={onChange}
            className="border rounded-md p-2"
          >
            {/* Add your options for typeDish here */}
          </select>
          <input
            type="number"
            name="min"
            value={searchData.min}
            onChange={onChange}
            placeholder="Min Calories"
            className="border rounded-md p-2"
          />
          <input
            type="number"
            name="max"
            value={searchData.max}
            onChange={onChange}
            placeholder="Max Calories"
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 mr-4"
          >
            Search
          </button>
          <button
            onClick={clear}
            className="bg-red-500 text-white rounded-md px-4 py-2"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {flag
          ? recipesArray.map((item) => (
              <div key={item.id}>
                {/* Render your recipe card component here */}
                <RecipesCard item={item} />
              </div>
            ))
          : recipesArray?.map((item) => (
              <div key={item.id}>
                <RecipesCard item={item} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Recipes;
