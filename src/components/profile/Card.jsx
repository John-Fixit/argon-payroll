/* eslint-disable react/prop-types */

import { Edit2Icon } from "lucide-react";

const Card = ({ title, hasEditIcon, onEditClick, children }) => {
  return (
    <div className="bg-white rounded-lg p-4 h-full ">
      <div className="flex justify-between items-center gap-4 border-b pb-3">
        <h2 className="text-[1rem] leading-6 font-medium font-helvetica uppercase text-gray-500">
          {title}
        </h2>
        {hasEditIcon && (
          <div className="flex justify-end ">
            <button
              className="bg-blue-100 p-2 rounded-full"
              onClick={onEditClick}
            >
              <Edit2Icon className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        )}
      </div>
      {/* Other content of the card */}

      <div className="">{children}</div>
    </div>
  );
};

export default Card;
