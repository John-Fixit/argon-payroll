import { Avatar, Button, cn, Tooltip, useDisclosure } from "@nextui-org/react";
import { Download } from "lucide-react";
import propTypes from "prop-types"
import { downloadFile } from "../../../../utils/utitlities";
import moment from "moment";
import { GrFormView } from "react-icons/gr";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";

  
  const SingleMemo = ({isMedium = false, memo}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
      <div className={cn("bg-white rounded-xl flex flex-col overflow-clip shadow-sm border pb-4", {"w-[350px]": isMedium})}>
        <div className="flex h-[5rem] px-[1.8rem] items-center justify-between border-b">
          <div className="flex  gap-3">
            <div className=" overflow-hidden  h-10  flex items-end">
              <Avatar src="/assets/images/ncaa.jpeg"/>
            </div>
  
            <div className="flex flex-col">
              <span className="font-bold text-gray-600 text-sm">HUMAN RESOURECES</span>
              <span className=" text-gray-500 text-sm">{moment(memo?.DATE_CREATED).fromNow()}</span>
            </div>
          </div>
  
          <div className="flex gap-3">
            <Tooltip content={'View'} showArrow>
              <Button isIconOnly onClick={onOpen} size="sm" className="bg-slate-200/90 rounded-full "
              >
                <GrFormView size={23}/>
              </Button>
            </Tooltip>
          </div>
        </div>
  
        <div className="w-full h-[20rem] overflow-hidden relative">
          <img
            src={memo?.FILE_NAME}
            className=" object-cover object-top w-full h-full hover:scale-50"
            alt=""
          />

          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-400/10 "></div>
        </div>
  
        <div className="px-7 text-gray-500  flex flex-col gap-y-2 pt-4 pb-10">
          <div>
            <b className=" text-lg text-gray-700">
             {memo?.SUBJECT}
            </b>  
          </div>
        </div>

        <ExpandedDrawerWithButton
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="my-6 overflow-y-auto relative">
          <div className="fixed right-10 top-4">
            <Tooltip content={'Download'} showArrow >
                <Button color="success" isIconOnly onClick={()=>downloadFile(memo?.FILE_NAME, "memo")} size="sm" className="rounded-full "
                >
                  <Download size={15}/>
                </Button>
              </Tooltip>

          </div>
          <img className="min-h-[80vh] w-full" src={memo?.FILE_NAME} alt="completed memo image" />
        </div>
      </ExpandedDrawerWithButton>





      </div>
    );
  };
  
  SingleMemo.propTypes = {
    isMedium: propTypes.bool,
    memo: propTypes.any
  }
  export default SingleMemo;
  