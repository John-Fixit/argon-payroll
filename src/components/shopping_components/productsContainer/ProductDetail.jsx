/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import special_offer from "../../../assets/images/special-offer.png";
import { HiSave } from "react-icons/hi";
import { MdOutlineStar } from "react-icons/md";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import Colors from "./Colors";


export default function ProductDetail({ product }) {
    const [expanded, setExpanded] = useState(false);
    const topref = useRef()

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleColorChange=(bg_color)=>{
    // console.log(bg_color);
  }

  //accordion expanding conditional icon render;
  const expandedIcon = {icon: expanded?FiMinusCircle:FiPlusCircle}



  useEffect(()=>{
    topref?.current?.scrollIntoView()
  }, [])


  return (
    <>

    <div ref={topref}></div>
    
      <div >
         
        <div className="h-[381px]">
          <img
            src={product?.img}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="py-[10px] px-[30px] bg-[#04F06A] text-white flex justify-between">
          <p className="text-[14px] font-poppins font-semibold my-auto flex space-x-1">
            <HiSave size={"19.5px"} />
            <span className="text-[14px] font-poppins font-semibold">
              Save NGN 4,500.00
            </span>
          </p>
          {/* <img src={special_offer} alt="special offer" className="" /> */}
        </div>
        <div className="py-3 px-6">
          <p className="text-[#000000] font-semibold font-poppins text-[20px]">
            N45,000.00
          </p>
          <p className="font-normal text-[14px] font-[#475367] font-poppins">
            The Air Force 1&apos;s distinctive design includes a chunky
            silhouette, a high-top ankle, and a prominent midsole with the
            visible Air cushioning unit. Over the years, the shoe has
            transcended its basketball roots to become a fashion staple,
          </p>
          <div className="my-2 flex">
            <div className="flex my-auto">
            <MdOutlineStar className="text-blue-500" size={"14px"} />
            <MdOutlineStar className="text-blue-500" size={"14px"} />
            <MdOutlineStar className="text-blue-500" size={"14px"} />
            <MdOutlineStar className="text-blue-500" size={"14px"} />
</div>
            <p className="ml-2 text-sm font-medium text-[#3F83F8] dark:text-white">
              4.95
            </p>
            <span className="mx-1.5 h-4 border border-gray-400 dark:bg-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              40k+ sold
            </span>
          </div>
          <hr />
          <div className="my-2">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[17px] font-poppins text-[#000000]">
                Quantity
              </span>
              <div className="flex space-x-3">
                <CiCircleMinus size={"22px"} className="cursor-pointer" />
                <p className="text-[#475367] my-auto">1</p>
                <CiCirclePlus size={"22px"} className="cursor-pointer" />
              </div>
            </div>
            <div className="my-3 flex flex-col gap-1">
              <span className="font-semibold text-[17px] font-poppins text-[#000000]">
                Purchase
              </span>
              <div className="flex justify-between space-x-4">
                <Button className="font-semibold bg-[#3F83F8] rounded-[8px] text-white font-poppins !py-[15px] px-[16px] w-full">
                  Buy now
                </Button>
                <Button
                  variant="bordered"
                  color="primary"
                  className="font-semibold rounded-[8px] font-poppins !py-[15px] px-[16px] w-full"
                >
                  Add to cart
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-[17px] font-poppins text-[#000000]">
                Color
              </span>
              <Colors handleColorChange={handleColorChange}/>
            </div>
          </div>
          <hr />
          <div className="my-2">
            {/* <div className="flex justify-between">
                <span className="font-semibold text-[17px] font-poppins text-[#000000]">
                Specifications
                </span>
                
            </div> */}
            <Accordion>
              <AccordionItem
              indicator={<expandedIcon.icon size={20}/>}
              onPress={toggleAccordion}
                aria-label="Accordion 1"
                title={
                  <span className="font-semibold text-[17px] font-poppins text-[#000000]">
                    Specifications
                  </span>
                }
                className="font-[500] font-poppins text-[#000000] border-none"
              >
                <ul className="list-decimal mx-4">
                  {[1, 2, 3, 4]?.map((item, index) => {
                    return (
                      <li key={index} className="font-semibold">
                        <div className="text-[14px] font-normal ">
                          <strong className="font-poppins">
                            Air Cushioning Technology:
                          </strong>{" "}
                          The signature feature of Nike Air Force 1 is its Air
                          cushioning technology. The midsole contains a visible
                          Air unit, providing responsive and lightweight
                          cushioning for enhanced comfort and support.{" "}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </AccordionItem>
            </Accordion>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.object,
};
