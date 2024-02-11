import { useSelector } from "react-redux";
import DietPost from "./DietPost/DietPost";

const DietPosts = ({ user }) => {
  const dietPosts = useSelector((state) => state.diets);

  return (
    <div className="container mx-auto mb-10">
      {dietPosts.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="w-24 h-24">
            <div className="border-8 border-t-8 border-gray-200 h-16 w-16 rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dietPosts.map((dietPost) => (
            <div key={dietPost._id}>
              <DietPost user={user} dietPost={dietPost} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietPosts;
