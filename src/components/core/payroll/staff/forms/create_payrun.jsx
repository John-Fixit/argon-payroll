/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../../../utils/toastMsgPop";
import { useCreatePayrun, useSuspendStaffPayroll, } from "../../../../../API/payroll_staff";



const CreatePayrunForm = ({handleClose}) => {
  const { userData } = useCurrentUser();

  const { mutateAsync: createPayrun, isPending: isCreating } = useCreatePayrun();

      const {
        control,
        setValue,
        getValues,
        trigger,
        watch,
        reset,
        handleSubmit,
        formState: { errors, touchedFields },
      } = useForm({
        defaultValues: {
          company_id: userData?.data?.COMPANY_ID,
          staff_id: userData?.data?.STAFF_ID,
        },
      });

const currentYear = new Date().getFullYear();
const yearsAlt = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => {
  const year = 2000 + i;
  return { label: year.toString(), value: year.toString() };
});
const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" }
];




  const handleFinalSubmit = async () => {
    const {
     month,
     year,

    } = getValues();

    const findMonthString = months.find(item => item.value === month)

    const json = {
     staff_id: userData?.data?.STAFF_ID,
     company_id: userData?.data?.COMPANY_ID,
     month,
     year,
    month_string: findMonthString?.label
    };


      try {
        console.log(json);
        
        const res = await createPayrun(json);
        successToast(res?.data?.message);
        reset()
        handleClose();
      } catch (error) {
        const errMsg = error?.response?.data?.message || error?.message;
        errorToast(errMsg);
      }
    }
  





  const onChangeDate = (date, dateString) => {
    setValue("appointment_date", dateString);
    trigger("appointment_date");
  };




  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}>
      <div className="bg-white shadow-md p-5 rounded border flex justify-center flex-col gap-4">

        <div className="pb-2">
          <span className="font-bold text-xl font-Helvetica ">Create Pay Run Form</span>
        </div>

            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Month
              </h5>
              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="month"
                      size="large"
                      showSearch
                      placeholder="Select staff type"
                      optionFilterProp="label"
                      options={months}
                      virtual={false}
                      status={
                        touchedFields?.month && errors?.month
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.month && errors?.month?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>

            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Year
              </h5>
              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="year"
                      size="large"
                      showSearch
                      placeholder="Select staff type"
                      optionFilterProp="label"
                      options={yearsAlt}
                      virtual={false}
                      status={
                        touchedFields?.year && errors?.year
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.year && errors?.year?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>


         <div className="flex justify-end py-5">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00bcc2",
            },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            // onClick={handleFinalSubmit}
            loading={isCreating}
            disabled={isCreating}
          >
            Submit
          </Button>
        </ConfigProvider>
      </div>
      </div>

    </form>
  );
};

CreatePayrunForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
export default CreatePayrunForm;

