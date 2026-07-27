// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import CoursesTable from "./components/CoursesTable";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";

const Courses = () => {
  return (
    <div className="max-w-[65rem] mx-auto">
      <PageHeader header_text={"All Courses"} btnAvailable={false} />
      <section className="mb-2">
        <Separator separator_text={"Courses"} />
      </section>
      {/* <div className="py-6">
        <h1 className="text-[#1f1f1f] text-[30px] font-medium mb-2 ">
          All Courses
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
            <p className="text-[15px] ">Courses</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div> */}

      <CoursesTable />
    </div>
  );
};

export default Courses;
