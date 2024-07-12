import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/reducers/signinSlice";
import localStorage from "../lib/localStorage";
import { useRouter } from "next/router";

function Application() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { name } = useSelector((state) => state.user);

  const logout = () => {
    localStorage.removeToken();
    window.localStorage.clear();
    dispatch(logoutUser());
    router.push("/login");
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-blue-600">
      <h1 className="text-4xl font-roboto text-white font-bold ">
        Welcome to the Application{" "}
        <span className="text-green-400 capitalize">{name}</span>
      </h1>
      <button
        onClick={logout}
        className="bg-white text-blue-600 rounded-full px-10 py-2 font-bold font-roboto mt-5 cursor-pointer"
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Application;
