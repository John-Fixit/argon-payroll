/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { errors, className, ...rest } = props;

  return (
    // <div className="flex items-center ">
    //   <span className="bg-gray-500">
    //   </span>

    // </div>
      <input
        ref={ref}
        type="text"
        className={`rounded-md  flex-1  focus:border-transparent 
                            px-[12px] h-[calc(1.5em + 1rem + 2px)] py-[8px] bg-[#fff] w-full border-1 border-[#edf0f2] transition all delay-150 font-[.8125] leading-[1.5] font-[400] ${className} ${
          errors?.title
            ? "focus:outline-none focus:ring-1 focus:ring-red-500 border-red-500"
            : "border-slate-200 focus:outline-none focus:ring-1"
        }`}
        {...rest}
      />


  );
});

Input.displayName = 'Input';

export default Input;
