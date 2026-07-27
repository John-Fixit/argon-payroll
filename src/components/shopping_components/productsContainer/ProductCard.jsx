/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { MdOutlineStar } from "react-icons/md";
import pp from "../../../assets/images/p1.png";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useState } from "react";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
import ProductDetail from "./ProductDetail";

const ProductCard = ({ product }) => {
  const [favouriteClicked, setfavouriteClicked] = useState(false);
  const [open, setOpen] = useState(false);

  //favourite icon
  const favouriteIcon = { icon: favouriteClicked ? IoMdHeart : IoMdHeartEmpty };

  const handleFavouriteClick = () => {
    setfavouriteClicked(!favouriteClicked);
  };

  //drawer functions
  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="bg-white rounded-md">
        <div className="font-poppins flex flex-col cursor-pointer relative">
          <img
            src={product?.img ?? pp}
            alt={product?.name}
            className="rounded-t-md object-cover h-64 relative"
            onClick={openDrawer}
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
          <div className="px-4" onClick={openDrawer}>
            <div className="mt-3 flex flex-col space-y-[0.25rem]">
              <p className="text-[14px] font-poppins font-medium text-[#909090]">
                Men Summer Running Shoes
              </p>
              <p className="font-semibold font-poppins text-base text-[#1E1E1E]">
                {product?.name ?? "Airjordan 1"}
              </p>
              {/* <span className="my-2 text-[14px] text-[#475367]">
              {(product?.description)?.substring(0, 40) + '...' ??
                "Air Force 1 Sneakers. Solid color nubuck leather upper. Perforated toe for extra breathability. Color matched flat laces. Tonal logo label sea..."}
              </span> */}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-[18px] text-[#3F83F8] font-poppins font-semibold">
                ₦{product?.price ?? "44,000.00"}
              </p>
              <div className="flex items-center my-3">
                <MdOutlineStar className="text-blue-500" size={"14px"} />
                <p className="font-bold text-[#000000]">4.8</p>
                {/* <span className="font-normal text-[14px] text-[#333333]">
              (77 Reviews)
            </span> */}
              </div>
            </div>
          </div>

          {/* <div className="my-2">
          <Button
            size="sm"
            radius="sm"
            className="font-medium bg-[#3F83F8] text-white text-center w-full"
          >
            Buy now
          </Button>
        </div> */}
        </div>
      </div>

      <ExpandedDrawerWithButton
        isOpen={open}
        onClose={closeDrawer}
        maxWidth={"35rem"}
      >
        <div className="my-10">
          <ProductDetail product={product} />
        </div>
      </ExpandedDrawerWithButton>
    </>
  );
};

export default ProductCard;
ProductCard.propTypes = {
  product: PropTypes.object,
};
