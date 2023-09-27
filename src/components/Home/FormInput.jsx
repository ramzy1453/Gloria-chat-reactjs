import React from "react";
export default function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  id,
}) {
  return (
    <input
      autoComplete="off"
      id={id}
      type={type}
      placeholder={placeholder.toUpperCase()}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full text-[0.875rem] text-center hover:scale-105 active:scale-95 transition-all"
    />
  );
}
