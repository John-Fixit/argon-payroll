/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
export default function Header() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Fragment>
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 md:gap-8">
          <div className="rounded-lg">
              <div className="">
                <h2 className="header_h2" >
                  Performance
                </h2>
                <Breadcrumbs 
                itemClasses={{
                  item: "text-[rgba(39,44,51,.5)] data-[current=true]:text-[rgba(39,44,51,.35)]",
                  separator: "text-[rgba(39,44,51,.5)]",
                }}
                >
                <BreadcrumbItem className="breadcrumb">Home</BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb">HR</BreadcrumbItem>
                <BreadcrumbItem className="breadcrumb text-[rgba(39,44,51,.5)]">Performance</BreadcrumbItem>
              </Breadcrumbs>
              </div>
            </div>
        </div>
      
      </section>
    </Fragment>
  );
}
