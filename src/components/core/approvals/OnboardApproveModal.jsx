/* eslint-disable no-unused-vars */
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Input, Select } from "antd";
import { Spinner } from "@nextui-org/react";
import Label from "../../forms/FormElements/Label";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useReAssignApprovalReq } from "../../../API/api_urls/my_approvals";
import { useEffect, useMemo, } from "react";
import { useGetPension } from "../../../API/onboard";

const OnboardApproveModal = ({ handleConfirm, handleCancel, loading, details }) => {

  const mutation = useReAssignApprovalReq();
  const { userData } = useCurrentUser();
  const { data: pension, isLoading: pensionLoading } = useGetPension();

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    control,
  } = useForm({});



  const pensions = useMemo(
    () =>
      pension?.map((pension) => ({
        ...pension,
        value: pension?.id,
        label: pension?.name,
      })),
    [pension]
  );

  // !details?.STAFF_NUMBER || !details?.PENSION_NO || !details?.PENSION_COMPANY)

  useEffect(() => {
    if (pension?.length && (details?.STAFF_NUMBER || details?.PENSION_NO || details?.PENSION_COMPANY) ) {
      setValue("staff_number", details?.STAFF_NUMBER);
      setValue("pension_no", details?.PENSION_NO);

      const findP = pension.find(el => el.name === details?.PENSION_COMPANY)
      setValue("pension_company", findP?.id);
    }
 
  }, [pension, details, setValue])
  


  const onsubmit = (data) => {
    const json = {
        "staff_number": data?.staff_number, //"NCAA/P.5672",
        "pfa_id": data?.pension_company, //"34",
        "pfa_number": data?.pension_no //"14527828223"           
    };

    if(data?.staff_number && data?.pension_company && data?.pension_no){
      handleConfirm(json)
    }


  };

  const handleChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <>
      <main className="w-full max-w-lg mx-auto">
        <h2 className="text-[1rem] font-medium font-helvetica uppercase text-start py-5 text-gray-700">
          Employee Onboad Approval
        </h2>
        <form className="flex flex-col space-y-4" action="" onSubmit={handleSubmit(onsubmit)}>



        <div>
            <Label>⁠Enter Staff Number</Label>
            <Controller
              name="staff_number"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="staff_number"
                    size="large"
                    defaultValue={getValues("staff_number")}
                    showSearch
                    placeholder="Enter staff number"
                    optionFilterProp="label"
                    onChange={(e) => handleChange(e.target.value, "staff_number")}
                    status={errors?.staff_number ? "error" : ""}
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {errors?.staff_number?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Staff number is required" }}
            />
          </div>

        <div>
            <Label>Select Pension Company</Label>
            <Controller
              name="pension_company"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="pension_company"
                    size="large"
                    defaultValue={getValues("pension_company")}
                    showSearch
                    placeholder="Select pension company"
                    optionFilterProp="label"
                    onChange={(value) => handleChange(value, "pension_company")}
                    // onSearch={onSearch}

                    options={pensions}
                    loading={pensionLoading}
                    status={errors?.pension_company ? "error" : ""}
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {errors?.pension_company?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Pension company is required" }}
            />
          </div>
          <div>
            <Label>Enter Pension Number</Label>
            <Controller
              name="pension_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="pension_no"
                    size="large"
                    defaultValue={getValues("pension_no")}
                    showSearch
                    placeholder="Enter pension number"
                    optionFilterProp="label"
                    onChange={(e) => handleChange(e.target.value, "pension_no")}
                    status={errors?.pension_no ? "error" : ""}
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {errors?.pension_no?.message ||
                      errors?.new_pension_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Pension number is required" }}
            />
          </div>
        
          <div className="mt-10 mb-3 flex justify-end">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase flex items-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner color="default" size="sm" />
              ) : null}
              Approve
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default OnboardApproveModal;

OnboardApproveModal.propTypes = {
  handleConfirm: PropTypes.any,
   handleCancel:PropTypes.any,
   loading:PropTypes.any,
   details:PropTypes.any,
};
