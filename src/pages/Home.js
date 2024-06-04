import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, logout } from "../components/redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.users);

  let user = {};
  if (users) {
    users.map((item) => {
      if (item.userId === userId) {
        user = item;
      }
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome, {user?.firstName}!
          </h2>
          <p className="text-gray-600 mt-2">We are glad to have you back.</p>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Full Name:</span>
            <span className="text-gray-900">
              {user?.firstName + " " + user?.lastName}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
