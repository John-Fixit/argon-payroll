/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const TextArea = forwardRef(({ errors, className, cols, rows, ...rest }, ref) => {


  return (
    <textarea
      ref={ref}
      type="text"
      cols={cols ?? "30"}
      rows={rows}
      
      className={`rounded-md  flex-1  focus:border-transparent 
                          px-[12px] h-[calc(1.5em + 1rem + 2px)] py-[8px] bg-[#fff] w-full border-1 border-[#edf0f2] transition all delay-150 font-[.8125] leading-[1.5] font-[400] ${className} ${
        errors?.title
          ? "focus:outline-none focus:ring-1 focus:ring-red-500 border-red-500"
          : "border-slate-200 focus:outline-none focus:ring-1"
      }`}
      {...rest}
    ></textarea>
  );
});

TextArea.displayName = 'Input';

export default TextArea;