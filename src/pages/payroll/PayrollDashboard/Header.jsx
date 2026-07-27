import { Fragment, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
              <div className="">
                <h2 className="header_h2">Dashboard</h2>
                <Breadcrumbs
                  itemClasses={{
                    item: "text-[rgba(39,44,51,.5)] data-[current=true]:text-[rgba(39,44,51,.35)]",
                    separator: "text-[rgba(39,44,51,.5)]",
                  }}
                >
                  <BreadcrumbItem className="breadcrumb">Home</BreadcrumbItem>
                  <BreadcrumbItem className="breadcrumb text-[rgba(39,44,51,.5)]">
                    DASHBOARD
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>

              <div className="relative">
                <div
                  className="inline-flex items-center overflow-hidden rounded-md border px-3 py-3 rounded flex gap-2 cursor-pointer"
                  onClick={handleClick}
                >
                  <button className="text-white bg-sky-500 rounded h-10 text-center w-10 font-semibold">
                    FM
                  </button>
                  <div>
                    <h4 className="font-medium whitespace-nowrap">
                      FrontendMatter Inc.
                    </h4>
                    <div>
                      <small className="text-gray-400">Select Company </small>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 my-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className={`absolute w-[100%] divide-y py-2 divide-gray-100 rounded-md border-gray-100 bg-white shadow-lg animate-fade-down animate-once animate-duration-300 ${
                    !open && "hidden"
                  }`}
                  role="menu"
                >
                  <div className="">
                    <strong className="block px-5 py-2 text-sm font-medium ">
                      {" "}
                      Select Company{" "}
                    </strong>

                    <div className="block text-sm px-4 text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex gap-2 cursor-pointer border-l-[3px] border-sky-500">
                      <button className="text-white bg-sky-500 rounded h-10 my-auto text-center w-10 font-semibold">
                        FM
                      </button>
                      <div>
                        <p className="font-medium my-auto whitespace-nowrap">
                          FrontendMatter Inc.
                        </p>
                        <div>
                          <small className="text-gray-400">Administrator</small>
                        </div>
                      </div>
                    </div>

                    <div
                      className="block py-2 text-sm px-4 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded flex gap-2 cursor-pointer"
                      style={{}}
                    >
                      <button className="text-white my-auto bg-cyan-400 rounded h-10 text-center w-10 font-semibold">
                        HH
                      </button>
                      <div>
                        <p className="font-medium whitespace-nowrap">
                          HumaHuma Inc.
                        </p>
                        <div>
                          <small className="text-gray-400">Publisher</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] rounded-lg my-auto flex lg:justify-end justify-center">
            <div className="flex gap-3 lg:float-righ ">
              {[
                { amount: 12.3, name: "Earnings" },
                { amount: 264, name: "Sales" },
              ].map((item, index) => {
                return (
                  <div className="border-r px-2" key={index}>
                    <h5 className="font-semibold">${item.amount}k</h5>
                    <div className="flex gap-2">
                      <span className="text-gray-400">{item.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 my-auto text-sky-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
              <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[0.5rem] mx-2 my-1 md:my-0 px-[1rem]">
                NEW REPORT
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
