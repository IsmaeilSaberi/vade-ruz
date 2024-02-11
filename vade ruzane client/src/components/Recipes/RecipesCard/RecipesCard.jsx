import { useState } from "react";

const RecipesCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="border rounded-md shadow-md p-4">
      <img
        src={item?.imgURL}
        alt={item?.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm">
            {item?.calories} Kcal / {item?.serving} servings
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm">{item?.dishTypes?.map((tag) => `#${tag} `)} </p>
        <p className="text-sm">{item?.cuisines?.map((tag) => `#${tag} `)}</p>
      </div>
      <h2 className="text-xl font-bold mb-4">{item?.title}</h2>
      <div className="flex justify-between mb-4">
        <div>
          <p>Fat: {item?.fat || 0}g</p>
          <p>Carbs: {item?.carbs || 0}g</p>
          <p>Cholesterol: {item?.cholesterol || 0}mg</p>
        </div>
        <div>
          <p>Sugars: {item?.sugars || 0}g</p>
          <p>Proteins: {item?.proteins || 0}g</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleClickOpen}
          className="bg-red-500 text-white rounded-md px-4 py-2"
        >
          How To Cook
        </button>
        <p>Ready In {item?.readyInMinutes} Mins</p>
      </div>
      {open && (
        <div className="border rounded-md p-4">
          <h3 className="text-xl font-bold mb-4">STEPS TO COOK</h3>
          {item?.cookInstruction?.map((element) => (
            <div key={element.number} className="mb-4">
              <p className="text-lg font-bold">
                STEP {element.number}: {element.step}
              </p>
              <p>INGREDIENTS</p>
              <div className="flex flex-wrap">
                {element?.ingredients?.map((ingredient) => (
                  <div
                    key={ingredient?.id}
                    className="flex flex-col items-center mr-4 mb-4"
                  >
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient?.image}`}
                      alt={ingredient?.name}
                      className="w-20 h-20 object-cover rounded-full mb-2"
                    />
                    <p className="text-sm">{ingredient?.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipesCard;
