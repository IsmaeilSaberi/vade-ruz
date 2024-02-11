import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUser } from "../../actions/user.js";
import { HiTrash } from "react-icons/hi";

const AdminDB = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const userArray = useSelector((state) => state?.USERS);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!user) {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold p-5">Welcome to Admin Dashboard</h1>
        <div className="my-10">
          <p className="text-2xl">YOU ARE NOT AUTHORIZED . . .</p>
        </div>
      </div>
    );
  }

  if (user?.userInfo?.role === "USER") {
    return (
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold p-5">Welcome to Admin Dashboard</h1>
        <div className="my-10">
          <p className="text-2xl">USER ARE NOT AUTHORIZED . . .</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold p-5">Welcome to Admin Dashboard</h1>
      <div className="my-10">
        <h2 className="text-2xl p-5">Welcome Admin</h2>
        <div className="my-5">
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Number</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userArray?.map((element, index) => (
                <tr key={element._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{element.name}</td>
                  <td className="border px-4 py-2">{element.email}</td>
                  <td className="border px-4 py-2">{element.role}</td>
                  <td className="border px-4 py-2">
                    {element.role === "USER" && (
                      <button onClick={() => dispatch(deleteUser(element._id))}>
                        <HiTrash className="text-red-500" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDB;
