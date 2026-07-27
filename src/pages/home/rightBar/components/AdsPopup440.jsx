import { X } from "lucide-react";
import useAdPopupStore from "../../../../hooks/useAdsPopup";
import { Button, useDisclosure } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import { IoMdClose } from "react-icons/io";
import EcommerceWidget from "./EcommerceWidget";
import { useGetProfile } from "../../../../API/profile";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const AdsPopup440 = () => {
  const { userData } = useCurrentUser();
  const { data: profile,  } = useGetProfile({
    user: userData?.data,
    key: "profile", 
  });
 const userGrade =   profile?.BIODATA?.GRADE ?? 0

//  console.log(userGrade)



  const { showPopup, closePopup } = useAdPopupStore();
  const {
    isOpen: isEcommerceOpen,
    onOpen: openEcommerceModal,
    onClose: onEcommerceCloseModal,
  } = useDisclosure();

  if (!showPopup || userGrade >= 16) return null;


const  closeEcom = ()=>{
    onEcommerceCloseModal()
    setTimeout(() => {
        closePopup();
    }, 100);
  }
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white/80 rounded-lg  max-w-md w-full mx-4 relative">
          <div className="text-center">
            <div className="text-white text-center">
              <div
                className="text-lg font-semibold"
                onClick={openEcommerceModal}
              >
                <img
                  src="/assets/images/ads.png"
                  alt=""
                  className="w-full h-[600px] rounded-md cursor-pointer"
                />
              </div>
              <button
                onClick={closePopup}
                className="absolute top-4 rounded-full p-1 right-4 bg-gray-600 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex p-4">
                {/* <span className="text-default-500 text-lg">Need Quick Cash?</span> */}
                  <Button
                    // onClick={handleOpen}
                    // onClick={handleWidgetOpen}
                    size="md"
                    className=" ml-auto bg-[#171966] text-white w-full font-Oswald"
                  >
                    Need quick cash before payday? Click here
                    {/* Need Quick Cash? */}
                     <span className=" animate-bounce animate-iteration-infinite text-lg animate-duration-[5s]">💰</span>
                    <span className=" animate-flip-up animate-iteration-infinite text-lg animate-duration-[5s]">💸</span>
                    <span className=" animate-jump-in animate-iteration-infinite text-lg animate-duration-[5s]">🤑</span>
                    {/* Get Now */}
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEcommerceOpen && (
        <ExpandedDrawerWithButton
          isOpen={isEcommerceOpen}
          onClose={closeEcom}
          maxWidth={15000}
          maskClosable={false}
          headerStyle={{
            display: "none",
          }}
        >
          <div className="relative">
            <div className="fixed top-10 left-10 z-50">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer bg-red-700 text-white"
                onClick={closeEcom}
              >
                <IoMdClose size={25} />
              </div>
            </div>
            <EcommerceWidget />
          </div>
        </ExpandedDrawerWithButton>
      )}
    </>
  );
};

export default AdsPopup440;
