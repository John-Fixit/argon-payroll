/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import BankTable from "./BankTable";
import { IoMdSearch } from "react-icons/io";
import TableNextUi from "../../../tables/TableNextUi";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import EditBankForm from "../../../../components/payroll_components/EditBankForm";
import "./bank.css";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
export default function Bank() {
  const [open, setOpen] = useState({status: false, bankDetail: null, role: null});

  const handleOpenDrawer = ({bankDetail, role}) => {
    setOpen({...open, status: true, bankDetail, role});
  };
  const handleCloseDrawer = () => {
    setOpen({...open, status: false});
  };

  return (
    <Fragment>
      <section className="header">
        <section>
          <PageHeader header_text={'Bank'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Setting'}, {path: app_routes.payroll.setting.banks, name: 'Banks'}]} buttonProp = { [{button_text: 'Add New Bank', fn: handleOpenDrawer, fnParameter: {role: 'create'}}]} btnAvailable={true}/>
        </section>

        {/* staff record table */}
        <section>
          <Separator separator_text={'Bank List'}/>
         
          <BankTable handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: open?.bankDetail? `Update ${open?.bankDetail?.name}`:'Add New Bank'}]}>
          <EditBankForm bankDetail={open.bankDetail} role={open?.role}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </Fragment>
  );
}
