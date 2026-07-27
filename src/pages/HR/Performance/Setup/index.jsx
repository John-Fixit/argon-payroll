/* eslint-disable no-unused-vars */
import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import { app_routes } from "../../../../utils/app_routes";
import Drawer from "./Drawer";
import TemplateEditor from "./TemplateEditor";
import FormBuilder from "./FormBuilder";
import SettingForm from "./SettingForm";
import FormRenderer from "./FormRenderer";

export default function PerformanceSetup() {
  const [open, setOpen] = useState({ status: false, role: null });
  const handleOpenDrawer = (role) => {
    setOpen({ status: true, role: role });
  };
  const handleCloseDrawer = () => {
    setOpen({ status: false });
  };

  const formData = [
    {
      sectionId: 0,
      header: "Performance form",
      sub_header: "hellow world",
      formElements: [
        {
          type: "text",
          label: "Last name",
          placeholder: "enter your last name",
          options: [],
          isRequired: true,
          specifyFor: { all: true, for_HR: false },
          elementKey: "last_name",
        },
        {
          type: "text",
          label: "First name",
          placeholder: "enter your first here",
          options: [],
          isRequired: true,
          specifyFor: { all: true, for_HR: false },
          elementKey: "first_name",
        },
        {
          type: "select",
          label: "Select State",
          placeholder: "",
          options: [
            { id: 0, label: "Poor", value: "poor" },
            { id: 1, label: "Fair", value: "fair" },
            { id: 2, label: "Good", value: "good" },
          ],
          isRequired: true,
          specifyFor: { all: true, for_HR: false },
          elementKey: "select_state",
        },
        {
          type: "header",
          label: "For official use only",
          placeholder: "",
          options: [],
          isRequired: false,
          specifyFor: { all: true, for_HR: false },
          elementKey: "for_official_use_only",
        },
        {
          type: "checkbox",
          label: "Grade A",
          placeholder: "",
          options: [
            { id: 0, label: "Poor", value: "poor" },
            { id: 1, label: "Fair", value: "fair" },
            { id: 2, label: "Good", value: "good" },
            { id: 3, label: "Very good", value: "very_good" },
            { id: 4, label: "Excellent", value: "excellent" },
          ],
          isRequired: true,
          specifyFor: { for_HR: true, all: false },
          elementKey: "grade_a",
        },
        {
          type: "rate",
          label: "Rate this employee",
          placeholder: "",
          options: [],
          isRequired: true,
          specifyFor: { for_HR: true, all: false },
          elementKey: "rate_this_employee",
        },
      ],
    },
    {
      sectionId: 1,
      header: "Section B",
      sub_header: "Please fill this section with your personal information",
      formElements: [
        {
          type: "checkbox",
          label: "Gender",
          placeholder: "",
          options: [
            { id: 0, label: "Male", value: "male" },
            { id: 1, label: "Female", value: "female" },
          ],
          isRequired: false,
          specifyFor: { all: true, for_HR: false },
          elementKey: "gender",
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form submitted", data);
  };
  return (
    <>
      <main>
        <section>
          <PageHeader
            header_text={"Setup"}
            // breadCrumb_data={[
            //   { path: app_routes.hrOperation.performance.index, name: "Hr" },
            //   { path: app_routes.hrOperation.performance.index, name: "Performance" },
            //   { path: app_routes.hrOperation.performance.setup, name: "Setup" },
            // ]}
            // buttonProp={[{ button_text: "New Template", fn: handleOpenDrawer }]}
            // btnAvailable={true}
          />

          {/* <TemplateEditor /> */}
          {/* <FormBuilder role={"create"}/> */}
          <FormBuilder role="builder" />

          {/* <FormRenderer
            sections={formData}
            onSubmit={handleSubmit}
            mode="fill"
          /> */}
        </section>
      </main>
    </>
  );
}
