// import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import Institutiontable from "./components/Institutiontable";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";

const Institution = () => {
  return (
    <div className="max-w-[65rem] mx-auto">
      <PageHeader header_text={"All Institutions"} btnAvailable={false} />
      <section className="mb-2">
        <Separator separator_text={"Institutions"} />
      </section>
      {/* <div className='py-6'>
        <h1 className='text-[#1f1f1f] text-[30px] font-medium mb-2 '>
            All Institutions
        </h1>
        <Breadcrumbs
          separator='/'
          itemClasses={{
            separator: 'px-2',
          }}
          className='text-[#6c757d] text-[26px] font-medium '
        >
          <BreadcrumbItem>
            <p className='text-[15px] '>Dashboard</p>{' '}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {' '}
            <p className='text-[15px] '>Institutions</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div> */}

      <Institutiontable />
    </div>
  );
};

export default Institution;
