/* eslint-disable no-unused-vars */
import React from "react";
export const useClassNames =()=> {
    
    return React.useMemo(
    () => ({
      wrapper: ["max-h-[650px] lg:max-w-[57rem] max-w-[60rem] 2xl:max-w-[80rem] rounded-md"],
      th: [
        // "bg-transparent",
        // "text-default-500",
        // "font-medium",
        // "font-Exotic",
        "text-sm",
        // "border-b",
        
      ]
    }),
    []
  )

}