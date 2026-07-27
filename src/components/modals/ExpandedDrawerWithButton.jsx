/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { app_routes } from "../../utils/app_routes";
import { Drawer } from "antd";

const ExpandedDrawerWithButton = ({
  isOpen,
  onClose,
  children,
  maxWidth,
  title,
  round,
  closable = true,
  maskClosable = true,
  withBg = true,
  headerStyle,
}) => {
  const location = useLocation().pathname;

  return (
    <>
      <Drawer
        maskClosable={maskClosable}
        closable={closable}
        // title={"Who you be"}
        width={maxWidth ?? 920} //620 for shopping and services
        onClose={onClose}
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: `${withBg ? "bg-[#F7F7F7]" : ""}    `,
          header: "font-helvetica bg-[#F7F7F7] hidden",
        }}
        headerStyle={headerStyle}
      >
        <div className="h-full mx-3">{children}</div>
      </Drawer>
    </>
  );
};

export default ExpandedDrawerWithButton;
