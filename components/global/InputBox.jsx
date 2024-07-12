import React from "react";

export default function InputBox({
  type = "text",
  placeholder,
  setValue,
  value,
  required = false,
  name
}) {
  return (
  <div>
    <label for="email" className="text-white font-roboto mb-2 text-xl capitalize">{name}</label>
    <input
      className={
        "w-full h-14 rounded-t-md px-4 py-2 focus:!ring-0 focus-visible:!ring-0"
     }
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
  );
}
