import { useForm, Controller } from "react-hook-form";
import { Select, Radio, DatePicker } from "antd";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdSend } from "react-icons/md";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {
  useCreateCycle,
  useGetTemplateRecipient,
} from "../../../../API/performance";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useMemo } from "react";

const { RangePicker } = DatePicker;

const recipientTypes = [
  { label: "Directorate", value: "directorate" },
  { label: "Department", value: "department" },
  { label: "Grade Level", value: "grade" },
  { label: "All Staff", value: "all-staff" },
];

const CreateCycle = ({ template, handleCloseDrawer }) => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      cycleName: "",
      recipientType: "directorate",
      dateRange: null,
      recipients: null,
    },
  });

  const { mutateAsync: mutateCreatCycle, isPending: isCreatingCycle } =
    useCreateCycle();

  const { userData } = useCurrentUser();

  const recipientType = watch("recipientType");

  const { data: get_recipients, isPending: isLoadingRecipient } =
    useGetTemplateRecipient({
      company_id: userData?.data?.COMPANY_ID,
      recipient_type: recipientType,
    });

  const recipientOptions = useMemo(
    () =>
      get_recipients?.map((recipient) => ({
        label: recipient?.NAME,
        value: recipient?.ID,
      })),
    [get_recipients],
  );

  const onSubmit = async (data) => {
    const json = {
      staff_id: userData?.data?.STAFF_ID,
      template_id: template?.ID,
      start_date: data.dateRange?.[0]?.format("YYYY-MM-DD"),
      end_date: data.dateRange?.[1]?.format("YYYY-MM-DD"),
      recipient_type:
        recipientType?.charAt(0).toUpperCase() + recipientType.slice(1),
      recipients: data.recipients,
      company_id: userData?.data?.COMPANY_ID,
      title: data?.cycleName || "",
    };

    try {
      const res = await mutateCreatCycle(json);
      successToast(res?.data?.message);
      reset({
        cycleName: "",
        recipientType: "directorate",
        dateRange: null,
        recipients: null,
      });
      handleCloseDrawer();
    } catch (err) {
      const errMsg = err?.response?.data?.message || err?.message;
      errorToast(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-start gap-2 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Form Recipient
            </h1>
            {/* <p className="text-sm text-gray-600">
              Set up a new appraisal cycle and define recipients
            </p> */}
          </CardHeader>

          <CardBody className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Form Name */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form Title <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="cycleName"
                  control={control}
                  rules={{ required: "Form name is required" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="e.g., Q1 2024 Performance Review"
                        size="large"
                        status={fieldState.error && "error"}
                      />
                      {fieldState.error && (
                        <span className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form Period <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="dateRange"
                  control={control}
                  rules={{ required: "Please select start and end date" }}
                  render={({ field, fieldState }) => (
                    <>
                      <RangePicker
                        {...field}
                        // onChange={(dateRange) => {
                        //   console.log(dateRange);
                        // }}
                        size="large"
                        className="w-full"
                        format="YYYY-MM-DD"
                        placeholder={["Start Date", "End Date"]}
                        status={fieldState.error && "error"}
                        disabledDate={(current) => {
                          return current && current < dayjs().startOf("day");
                        }}
                      />
                      {fieldState.error && (
                        <span className="text-red-500 text-sm mt-1 block">
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send To <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="recipientType"
                  control={control}
                  rules={{ required: "Please select recipient type" }}
                  render={({ field, fieldState }) => (
                    <>
                      <Radio.Group {...field} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {recipientTypes.map((type) => (
                            <div
                              key={type.value}
                              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                field.value === type.value
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Radio value={type.value}>{type.label}</Radio>
                            </div>
                          ))}
                        </div>
                      </Radio.Group>
                      {fieldState.error && (
                        <span className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              {recipientType !== "all-staff" ? (
                <div className="space-y-6">
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      Select {recipientType}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name={"recipients"}
                      control={control}
                      rules={{
                        required: `Please select a ${recipientType}`,
                      }}
                      render={({ field, fieldState }) => (
                        <>
                          <Select
                            {...field}
                            options={recipientOptions}
                            loading={isLoadingRecipient}
                            placeholder="Choose directorate"
                            size="large"
                            className="w-full"
                            mode="multiple"
                            status={fieldState.error && "error"}
                          />
                          {fieldState.error && (
                            <span className="text-red-500 text-sm mt-1">
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              ) : null}

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button variant="flat" onPress={handleCloseDrawer}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  startContent={<MdSend size={20} />}
                  isLoading={isCreatingCycle}
                >
                  Create Form
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
CreateCycle.propTypes = {
  template: PropTypes.any,
  handleCloseDrawer: PropTypes.any,
};

export default CreateCycle;
