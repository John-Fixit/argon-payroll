import { Input, Select } from "antd";

const AddSuspensionForm = () => {
  const suspensionType = [
    { label: "Suspension", value: "suspension" },
    { label: "Retirement", value: "retirement" },
    { label: "Study Leave", value: "Study Leave" },
    { label: "Resignation/Withdrawal", value: "Resignation" },
    { label: "Secondment", value: "secondment" },
    { label: "Deceased", value: "deceased" },
  ];

  const staffList = [];

  return (
    <>
      <main>
        <div className="bg-white rounded flex justify-center flex-col gap-4">
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Type
            </h5>
            <div>
              <Select
                aria-label="type"
                size="large"
                showSearch
                placeholder="Select Institution Name"
                optionFilterProp="label"
                options={suspensionType}
                //   status={
                //     touchedFields?.type && errors?.type
                //       ? "error"
                //       : ""
                //   }
                //   {...field}
                className="w-full"
                //   onChange={(value) => onChange(value, "type")}
                //   onBlur={() => trigger("type")}
              />
              {/* <span className="text-red-500">
                      {touchedFields?.type && errors?.type?.message}
                    </span> */}
            </div>
          </div>
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Has Expiry
            </h5>
            <div>
              <Select
                aria-label="has_expiry"
                size="large"
                placeholder="Select"
                optionFilterProp="label"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                //   status={
                //     touchedFields?.has_expiry && errors?.has_expiry
                //       ? "error"
                //       : ""
                //   }
                //   {...field}
                className="w-full"
                //   onChange={(value) => onChange(value, "has_expiry")}
                //   onBlur={() => trigger("has_expiry")}
              />
              {/* <span className="text-red-500">
                      {touchedFields?.has_expiry && errors?.has_expiry?.message}
                    </span> */}
            </div>
          </div>
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Comments
            </h5>
            <div>
              <Input.TextArea
                className="w-full"
                //   value={watch("appraisee_comment")}
                //   onChange={(e) => setValue("appraisee_comment", e.target.value)}
                placeholder="Comments..."
              />
            </div>
          </div>
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Select Individual Staff
            </h5>
            <div>
              <Select
                aria-label="staff"
                size="large"
                placeholder="Select"
                optionFilterProp="label"
                options={staffList}
                //   status={
                //     touchedFields?.staff && errors?.staff
                //       ? "error"
                //       : ""
                //   }
                //   {...field}
                className="w-full"
                //   onChange={(value) => onChange(value, "staff")}
                //   onBlur={() => trigger("staff")}
              />
              {/* <span className="text-red-500">
                      {touchedFields?.staff && errors?.staff?.message}
                    </span> */}
            </div>
          </div>
        </div>
        <div className="flex justify-end py-3">
          <button
            //   onClick={goToNextTab}
            className="bg-btnColor px-4 font-helvetica py-1 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default AddSuspensionForm;
