/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import PropType from "prop-types";
import "./pageHeader.css";
import { Link } from "react-router-dom";
import { TbFileTypePdf } from "react-icons/tb";

export default function PageHeader({
  header_text,
  breadCrumb_data,
  buttonProp,
  btnAvailable,
}) {
  return (
    <Fragment>
      <div className="flex justify-between flex-wrap my-2">
        <div className="rounded-lg">
          <h2 className="font-helvetica font-bold text-xl md:text-3xl">
            {header_text}
          </h2>
          <Breadcrumbs
            itemClasses={{
              item: "text-[rgba(39,44,51,.5)] data-[current=true]:text-[rgba(39,44,51,.35)]",
              separator: "text-[rgba(39,44,51,.5)]",
            }}
          >
            {breadCrumb_data?.map((item, index) => {
              return (
                <BreadcrumbItem key={index} className="breadcrumb">
                  <Link
                    to={item?.path}
                    className="hover:text-[rgba(39,44,51,.5)] font-helvetica text-xs"
                  >
                    {item.name}
                  </Link>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
        </div>
        <div className="my-auto flex flex-wrap gap-3">
          {buttonProp?.length
            ? buttonProp?.map((item, index) => {
                return item?.button_type === "download" ? (
                  <Button
                    key={index + "____buttons"}
                    onClick={() => item.fn(item?.fnParameter)}
                    variant="shadow"
                    className="bg-default-700 text-white rounded-md"
                    isLoading={item?.fnLoading}
                  >
                    {" "}
                    <TbFileTypePdf
                      size={20}
                      color="red"
                      className=" inline"
                    />{" "}
                    {item?.button_text}
                  </Button>
                ) : (
                  <button
                    key={index + "____buttons"}
                    className="bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-3 py-2 font-helvetica flex items-center gap-1 shadow-md tracking-wide"
                    onClick={() => item.fn(item?.fnParameter)}
                  >
                    {item?.button_text}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    </Fragment>
  );
}

PageHeader.propTypes = {
  header_text: PropType.string,
  button_text: PropType.string,
  breadCrumb_data: PropType.array,
  buttonProp: PropType.array,
  btnAvailable: PropType.bool,
};
