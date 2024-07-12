import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import EventBus from "../lib/EventBus";
import localStorage from "../lib/localStorage";
import { loginUser, logoutUser } from "../redux/reducers/signinSlice";
import { setUserLoading } from "../redux/reducers/userSlice";
import fetchUserStatus from "../redux/reducers/userSlice/userStatThunk";
import ApplicationLoader from "./global/ApplicationLoader";

export default function Auth({ children }) {
  const [reRoutingDone, setReRoutingDone] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loggedIn: auth } = useSelector((state) => state);
  // Called on the intial render - checks if the credentials exist in the local storage
  useLayoutEffect(() => {
    setReRoutingDone(false);
    dispatch(fetchUserStatus());
    EventBus.on("logout", () => {
      console.log("called");
      localStorage.removeToken();
      window.localStorage.clear();
      dispatch(logoutUser());
      setReRoutingDone(true);
      router.push(`/login`);
    });
    return () => {
      EventBus.remove("logout", () => {});
    };
  }, []);

  // Runs when the user status changes
  useLayoutEffect(() => {
    if (user.status && !user.loading) {
      // Set the user loggedIn Status to true -
      dispatch(loginUser());
      return;
    }
    dispatch(setUserLoading({ loading: false }));
    if (!user.status && !user.status.loading && !auth.loggedIn) {
      dispatch(fetchUserStatus());
    }
  }, [user.status, user.loading, reRoutingDone]);
  if (user.loading || !user.status || !auth.loggedIn || auth.loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex">
        <ApplicationLoader width="2.5rem" height="2.5rem" />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-hidden overflow-y-hidden">
      {children}
    </div>
  );
}
