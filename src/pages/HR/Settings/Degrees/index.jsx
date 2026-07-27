// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { data } from "./data"
import MultiTable from "../components/Multitable"
import PageHeader from "../../../../components/payroll_components/PageHeader"
import Separator from "../../../../components/payroll_components/Separator"


const Degrees = () => {
  return (
    <div className="max-w-[65rem] mx-auto">
       <PageHeader header_text={"All Degrees"} btnAvailable={false} />
      <section className="mb-2">
        <Separator separator_text={"Degrees"} />
      </section>
    {/* <div className="py-6">
      <h1 className="text-[#1f1f1f] text-[30px] font-medium mb-2 ">
        All Degrees
      </h1>
      <Breadcrumbs
        separator="/"
        itemClasses={{
          separator: "px-2",
        }}
        className="text-[#6c757d] text-[26px] font-medium "
      >
        <BreadcrumbItem>
          <p className="text-[15px] ">Dashboard</p>{" "}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {" "}
          <p className="text-[15px] ">Degrees</p>
        </BreadcrumbItem>
      </Breadcrumbs>
    </div> */}

    <MultiTable  data={data} tabName={'Degree'} />
  </div>
  )
}

export default Degrees
