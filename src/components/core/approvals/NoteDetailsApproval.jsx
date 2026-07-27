

import { Avatar } from "@nextui-org/react";
import moment from "moment";

import propTypes from "prop-types"
import { BsEnvelopePaper } from "react-icons/bs";
import { filePrefix } from "../../../utils/filePrefix";


// const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'


const NoteDetailsApproval = ({details}) => {
  return (
    <div>
      { details?.notes?.length > 0 ?
      details?.notes.map((note, i) => (
        <div 
          key={i}
          className="p-6 pb-0 rounded border bg-white shadow mt-4 min-h-[10rem]"
        >
          <div className="flex gap-3 mb-2">
            <Avatar isBordered src={note?.FILE_NAME ? (filePrefix + note?.FILE_NAME) : null } />
            <div className="">
              <p className="text-lg font-medium">{note?.LAST_NAME} {note?.FIRST_NAME}</p>
              
              <span className=" text-sm text-gray-400">{moment(
                                  note?.TIME_REQUESTED
                                ).format("MMMM Do YYYY, h:mm:ss a")}</span>
            </div>
          </div>

          { note?.NOTE_CONTENT ?
             <p
             dangerouslySetInnerHTML={{
               __html:
                 (note?.NOTE_CONTENT),
             }}
           /> : <p>...</p>
          }
        </div>
      )
    ) :  <div className="flex flex-col gap-2  items-center justify-center h-full pt-5 ">
      <BsEnvelopePaper className="text-gray-300" size={40}/>  
      <span className=" text-default-400 font-bold text-lg">Empty Note Records</span>
      
      </div>
  }
    </div>
  );
};

NoteDetailsApproval.propTypes = {
  details : propTypes.any
}
export default NoteDetailsApproval;
