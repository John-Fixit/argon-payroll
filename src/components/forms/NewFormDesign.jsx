/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";

export default function NewInputDesign({
  label,
  type,
  error,
  errorMessage,
  ...rest
}) {
  const {
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className="px-5">
        <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
          {label}
        </h5>
        <div className="flex flex-col">
          <input
            type={type ?? "text"}
            placeholder={label}
            className={`border rounded-md  flex-1  focus:border-transparent 
                          px-2 py-3 ${
                            error || errors?.title
                              ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                              : "border-slate-200 focus:outline-none focus:ring-2"
                          }`}
            {...rest}
          />
          <p className="my-auto">
            <span className="text-red-500">{errorMessage}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
