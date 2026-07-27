import PageHeader from "../../../../components/payroll_components/PageHeader";
import { useState } from "react";
import VariationForm from "../../../../components/core/variations/VariationsForm";
import { MdOutlineCancel, MdOutlineCheckCircle, MdOutlinePending } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import Separator from "../../../../components/payroll_components/Separator";
import RequestCard from "../../../Approval/RequestCard";
import { AiOutlineAudit } from "react-icons/ai";

const VariationPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const handleOpenDrawer = ()=>{
      setIsOpen(true)
  }


  const variationPages = [
    {
      id: "pending",
      label: "Pending",
      icon: MdOutlinePending,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: "audit_pending",
      label: "Audit Pending",
      icon: AiOutlineAudit,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: "audit_approved",
      label: "Audit Approved",
      icon: MdOutlineCheckCircle,
      b_color: "bg-green-100",
      t_color: "text-green-500",
    },
    {
      id: "audit_rejected",
      label: "Audit Rejected",
      icon: MdOutlineCancel,
      b_color: "bg-red-100",
      t_color: "text-red-500",
    },
    {
      id: "pupilage",
      label: "Pupilage",
      icon: SiLevelsdotfyi,
      b_color: "bg-gray-100",
      t_color: "text-gray-500",
    },
  ];



  const selectTab = (value) => {
    setStatus(value);
  };



  return (
    <>
        <PageHeader
          header_text={"Variations"}
          breadCrumb_data={[{ name: "HRM" }, { name: "Variations" }]}
          buttonProp={[{button_text: "Create Variation", fn: handleOpenDrawer}]}
        />


        <>
          <Separator separator_text={"Variations"} />
        </>



        <RequestCard
          requestHistory={variationPages}
          selectTab={selectTab}
          requestStatus={status}
        />










        <VariationForm isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <Audit/> */}
    </>
  );
};

export default VariationPage;
