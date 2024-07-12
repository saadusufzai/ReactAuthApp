import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import TokenService from "../lib/localStorage";
import authenticateUser from "../redux/reducers/signinSlice/signinThunks";
import InputBox from "@/global/InputBox";
import SubmitButton from "@/global/SubmitButton";

function Login() {
  const { loggedIn } = useSelector((state) => state.loggedIn);
  const router = useRouter();
  useEffect(() => {
    if (loggedIn) {
      router.push("/application");
    }
  }, [loggedIn]);

  useEffect(() => {
    const tokens = TokenService.getToken();
    if (tokens && tokens.accessToken) {
      router.push("/application");
    }
  }, []);
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loading, message } = useSelector((state) => state.loggedIn);
  const submissionHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(authenticateUser({ email, password }));
    }
  };
  return (
    <div className="flex h-[100vh] bg-blue-600">
      <div className="flex flex-col px-10 mx-auto">
        <div className="flex flex-col items-center mt-16">
          <div className="text-center text-white text-3xl font-bold uppercase font-roboto leading-10">
            Welcome To The Nest Next Auth Application
          </div>
        </div>
        <form
          onSubmit={submissionHandler}
          className="flex flex-col mt-9 border px-10 py-8 rounded-3xl mx-auto shadow-2xl drop-shadow-2xl "
        >
          <h3 className=" h-9 text-white text-3xl font-bold font-roboto mb-7 leading-10">
            Sign In
          </h3>
          <div className=" flex flex-col gap-12">
            <InputBox
              name="Email"
              placeholder="Enter your email"
              type="email"
              setValue={setEmail}
              required
            />
            <InputBox
              name="Password"
              type="password"
              setValue={setPassword}
              required
              placeholder="Enter Password"
            />
          </div>
          {message && (
            <div className="w-full flex flex-col gap-2  font-semibold bg-[#ff000020] !text-xs text-[#ff0000] tracking-wide py-2.5 px-4 rounded-sm border-l-4 border-l-[#ff0000]">
              <span>{message}</span>
            </div>
          )}
          <div className="flex justify-between mt-8  items-center">
            <div className="text-center text-white text-base font-normal font-roboto leading-normal tracking-wide">
              Don’t have an account?
            </div>
            <Link
              href="/signup"
              className="text-center text-purple-300 text-xs font-medium font-roboto leading-none tracking-wide"
            >
              Create Account
            </Link>
          </div>
          <SubmitButton loading={loading} name="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
