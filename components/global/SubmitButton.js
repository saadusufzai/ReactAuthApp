import React from "react";
import Loader from "../../public/images/loader-normal.svg";

function SubmitButton({ loading, name }) {
  return (
    <div className="mt-8">
      <button
        type="submit"
        className="font-roboto w-full flex items-center justify-center rounded-[100px] bg-white py-4  text-center text-base font-semibold leading-5 tracking-[0.1px] text-blue-800 cursor-pointer"
      >
        {!loading ? `${name}` : <Loader className="w-6 h-6 my-auto " />}
      </button>
    </div>
  );
}

export default SubmitButton;
