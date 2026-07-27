/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment } from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import "./pageHeader.css"
import { Link } from "react-router-dom"
export default function PageHeader({header_text, breadCrumb_data, buttonProp, btnAvailable}) {
 
  return (
    <Fragment>
        <div className="flex justify-between flex-wrap my-2">
            <div className="rounded-lg">  
              <h2 className="header_h2">Performance</h2>
              <Breadcrumbs
                itemClasses={{
                  item: "text-[rgba(39,44,51,.5)] data-[current=true]:text-[rgba(39,44,51,.35)]",
                  separator: "text-[rgba(39,44,51,.5)]",
                }}
              >
                {
                    breadCrumb_data?.map((item, index)=>{
                        return(
                            <BreadcrumbItem key={index} className="breadcrumb">
                              <Link to={item.path} className='hover:text-[rgba(39,44,51,.5)]'>
                                {item.name}
                              </Link>
                            </BreadcrumbItem>
                        )
                    })
                }
              </Breadcrumbs>
            </div>
            <div className="my-auto flex flex-wrap">
                    <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[0.5rem] mx-2 my-1 md:my-0 px-[1rem]" >
                        Create Memo
                    </button>
            </div>
          </div>
    </Fragment>
  )
}
