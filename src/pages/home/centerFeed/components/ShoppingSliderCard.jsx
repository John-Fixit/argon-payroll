/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { MdOutlineStar } from "react-icons/md";
import pp from "../../../../assets/images/p1.png";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useState } from "react";

const ShoppingSliderCard = ({ product }) => {
  const [favouriteClicked, setfavouriteClicked] = useState(false);
  const favouriteIcon = { icon: favouriteClicked ? IoMdHeart : IoMdHeartEmpty };

  const handleFavouriteClick = () => {
    setfavouriteClicked(!favouriteClicked);
  };

  return (
    <>
      <div className="bg-white rounded-md w-[300px] shadow">
        <div className="font-poppins flex flex-col cursor-pointer relative w-[300px]">
          <img
            src={product?.img ?? pp}
            alt={product?.name}
            className="rounded-t-md object-cover !h-64 relative"
          />
          <div
            className="absolute h-[40px] w-[40px] top-2 right-2 rounded-full bg-white flex justify-center items-center cursor-pointer"
            onClick={handleFavouriteClick}
          >
            {
              <favouriteIcon.icon
                color={favouriteClicked ? "orange" : ""}
                size={"30px"}
                className="transition-colors"
              />
            }
          </div>
          <div className="px-4">
            <div className="mt-3 flex flex-col space-y-[0.25rem]">
              <p className="text-[14px] font-poppins font-medium text-[#909090]">
                Men Summer Running Shoes
              </p>
              <p className="font-semibold font-poppins text-base text-[#1E1E1E]">
                {product?.name ?? "Airjordan 1"}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-[18px] text-[#3F83F8] font-poppins font-semibold">
                ₦{product?.price ?? "44,000.00"}
              </p>
              <div className="flex items-center my-3">
                <MdOutlineStar className="text-blue-500" size={"14px"} />
                <p className="font-bold text-[#000000]">4.8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingSliderCard;
ShoppingSliderCard.propTypes = {
  product: PropTypes.object,
};
