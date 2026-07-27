/* eslint-disable no-unused-vars */

import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import TeamMappingTable from "./TeamMappingTable";


export default function PerformanceTeamMapping() {
    const data = [
        {
          _id: 1,
          name: "ADMIN (HQTRS ABUJA)",
          code: "113",
          default: "Yes",
          action: 'Action'
        },
        {
          _id: 2,
          name: "ADMIN (HQTRS ABUJA)",
          code: "113",
          default: "Yes",
          action: 'Action'
        },
        {
          _id: 3,
          name: "ADMIN (HQTRS ABUJA)",
          code: "113",
          default: "No",
          action: 'Action'
        },
        {
          _id: 4,
          name: "ADMIN (HQTRS ABUJA)",
          code: "113",
          default: "Yes",
          action: 'Action'
        },
        {
          _id: 5,
          name: "ADMIN (HQTRS ABUJA)",
          code: "113",
          default: "No",
          action: 'Action'
        },
        {
          _id: 6, 
          name: "ADMIN (HQTRS ABUJA)",
          code: "113",
          default: "Yes",
          action: 'Action'
        },
      ];

  const handleOpenDrawer = () => {
    // console.log("open");
  };
  return (
    <>
      <section>
      <PageHeader
            header_text={"Teams mapping"}
            // breadCrumb_data={[
            //   { path: app_routes.hrOperation.performance.index, name: "Hr" },
            //   { path: app_routes.hrOperation.performance.index, name: "Performance" },
            //   { path: app_routes.hrOperation.performance.setup, name: "team mapping" },
            // ]}
            // buttonProp={[{ button_text: "New Template", fn: handleOpenDrawer }]}
            // btnAvailable={true}
          />
        <Separator separator_text={"List of staff groups"} />

        <TeamMappingTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
      </section>
    </>
  );
}
