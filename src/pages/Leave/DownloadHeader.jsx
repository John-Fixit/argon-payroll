/* eslint-disable react/prop-types */
import { Tooltip } from "@nextui-org/react";
import ActionIcons from "../../components/core/shared/ActionIcons";

const DownloadHeader = ({ downloadPDF }) => {
  return (
    <p className="flex justify-between items-center">
      <span className="font-helvetica">Download</span>
      <Tooltip showArrow={true} content="Download">
        <span><ActionIcons variant={"DOWNLOAD"} action={downloadPDF} /></span>
      </Tooltip>
    </p>
  );
};

export default DownloadHeader;
