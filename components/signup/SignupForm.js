import React from "react";
import Link from "next/link";
import InputBox from "@/global/InputBox";
import { useDispatch } from "react-redux";
import registerUser from "../../redux/reducers/signupSlice/signupThunk";
import SubmitButton from "@/global/SubmitButton";

export default function SignUpForm({
  formData,
  setFormData,
  loading,
  message,
}) {
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e });
  };
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };
  console.log("message", message);
  return (
    <div className="flex flex-col px-10 mx-auto ">
      <div className="flex flex-col items-center mt-16">
        <div className="text-center text-white text-3xl font-bold uppercase font-roboto leading-10">
          Welcome To The Nest Next Auth Application
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-9 w-3/12 border px-10 py-8 rounded-3xl mx-auto"
      >
        <div className=" flex flex-col gap-12">
          <h3 className="  text-white text-3xl font-bold font-roboto ">
            Sign Up
          </h3>

          <InputBox
            name="Your Name"
            placeholder="Your Name"
            type="text"
            setValue={handleNameChange}
            required
            value={formData.name}
          />
          <InputBox
            name="Email"
            type="Email"
            setValue={handleEmailChange}
            required
            value={formData.email}
            placeholder="Enter Email"
          />
          <InputBox
            name="password"
            type="password"
            setValue={handlePasswordChange}
            required
            value={formData.password}
            placeholder="Enter Password"
          />
        </div>
        {message && (
          <div className="w-full flex flex-col gap-2  font-semibold bg-[#ff000020] !text-xs text-yellow-300 capitalize tracking-wide py-2.5 px-4 rounded-sm border-l-4 border-l-[#ff0000]">
            {message.map((e) => (
              <span>{e}</span>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-8 px-4 items-center">
          <div className="text-center text-white text-base font-normal font-roboto leading-normal tracking-wide">
            Already have an account?
          </div>
          <Link
            href="/login"
            className="text-center text-white text-xs font-semibold font-roboto leading-none tracking-wide"
          >
            Sign In
          </Link>
        </div>
        <SubmitButton loading={loading} name="Sign Up" />
      </form>
    </div>
  );
}
