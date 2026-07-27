/* eslint-disable no-unused-vars */

import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";


export default function PerformanceTakeAction() {


  
  return (
    <>
      <section>
      <PageHeader
            header_text={"Take Action"}
            // breadCrumb_data={[
            //   { path: app_routes.hrOperation.performance.index, name: "Hr" },
            //   { path: app_routes.hrOperation.performance.index, name: "Performance" },
            //   { path: app_routes.hrOperation.performance.setup, name: "take action" },
            // ]}
            // buttonProp={[{ button_text: "Create Card", fn: handleOpenDrawer }]}
            // btnAvailable={true}
          />
        <Separator separator_text={"Performance card"} />

      </section>
    </>
  );
}
