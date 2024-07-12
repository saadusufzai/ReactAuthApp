import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import TokenService from "../lib/localStorage";
import authenticateUser from "../redux/reducers/signinSlice/signinThunks";
import registerUser from "../redux/reducers/signupSlice/signupThunk";
import SignUpForm from "@/signup/SignupForm";

function Login() {
  const { loading, message, loggedIn } = useSelector((state) => state.signUp);
  const router = useRouter();
  useEffect(() => {
    if (loggedIn) router.push("/application");
  }, [loggedIn]);
  useEffect(() => {
    const tokens = TokenService.getToken();
    if (tokens && tokens.accessToken) router.push("/application");
  }, []);
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  return (
    <div className=" bg-blue-600 h-[100vh] ">
      <SignUpForm
        formData={formData}
        setFormData={setFormData}
        message={message}
        loading={loading}
      />
    </div>
  );
}

export default Login;
