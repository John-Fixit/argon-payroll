import clsx from "clsx";
import { Image } from "lucide-react";
import propTypes from "prop-types";
import { FiDownloadCloud, FiEdit } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { MdCreateNewFolder, MdDeleteOutline } from "react-icons/md";

const ActionIcons = ({ variant, action, icon, icon_color }) => {
  const IconComp = icon;

  switch (variant) {
    case "VIEW":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer">
          <LuEye
            size={20}
            strokeWidth={2}
            className="text-blue-600 "
            onClick={action}
          />
        </div>
      );
    case "EDIT":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer">
          <FiEdit
            size={18}
            strokeWidth={2.5}
            className="text-yellow-600 "
            onClick={action}
          />
        </div>
      );
    case "DELETE":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer">
          <MdDeleteOutline
            size={21}
            className="text-red-600 "
            onClick={action}
          />
        </div>
      );
    case "CREATE":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer">
          <MdCreateNewFolder
            size={21}
            className="text-primary"
            onClick={action}
          />
        </div>
      );
    case "DOWNLOAD":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer">
          <FiDownloadCloud
            size={20}
            strokeWidth={2.5}
            className="text-gray-600 "
            onClick={action}
          />
        </div>
      );
    case "VIEW-IMAGE":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer ">
          <Image
            size={22}
            strokeWidth={2.5}
            className="text-purple-600 p-1"
            onClick={action}
          />
        </div>
      );
    case "CUSTOM":
      return (
        <div className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer ">
          <IconComp
            size={22}
            strokeWidth={2.5}
            className={clsx("text-gray-600 p-1", icon_color)}
            onClick={action}
          />
        </div>
      );
    default:
      return <div></div>;
  }
};

ActionIcons.propTypes = {
  variant: propTypes.string,
  icon: propTypes.any,
  icon_color: propTypes.string,
  action: propTypes.func,
};

export default ActionIcons;
