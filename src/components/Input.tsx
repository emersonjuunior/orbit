"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({
  type,
  placeholder,
  name,
  register,
  error,
  rules,
}: InputProps) => {
  return (
    <>
      <input
        className="outline-none w-full border-1 border-gray-400 rounded-md h-10 px-2 bg-gray-50"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
      />
      {error && <p className="text-red-400 my-1 font-medium">{error}</p>}
    </>
  );
};

export default Input;
