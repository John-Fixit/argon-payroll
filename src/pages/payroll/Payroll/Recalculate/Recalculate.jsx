import { Controller, useForm } from "react-hook-form";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { Button, ConfigProvider, Input, Select } from "antd";
import { useGetAllPayrollStaff } from "../../../../API/payroll_staff";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useGetStaffAllowanceByQuery,
  useGetStaffAllowanceByMutation,
  useRecalculateStaffAllowance,
} from "../../../../API/allowance";
import { Edit3, CheckCircle, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatNaira } from "../../../../utils/utitlities";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import PayslipDrawer from "./PreviewPayslip";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import PropTypes from "prop-types";
import { Pagination } from "@nextui-org/react";

const Recalculate = () => {
  const { control, watch, handleSubmit, getValues } = useForm();

  const [viewedPaymentType, setViewedPaymentType] = useState("");

  const [isOpenPreviewPayslip, setIsOpenPreviewPayslip] = useState(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const staff_type = watch("staff_type");
  const staff_id = watch("staff_id");
  const { userData } = useCurrentUser();
  const {
    data: get_company_staff,
    refetch,
    isPending: isLoadingStaff,
  } = useGetAllPayrollStaff({
    company_id: userData?.data?.COMPANY_ID,
    staff_type: staff_type || 0,
  });

  const {
    data: get_staff_allowance,
    mutateAsync: mutateAllowance,
    isPending: isFetchingAllowance,
  } = useGetStaffAllowanceByMutation();

  const {
    data: paymentAllowance,
    refetch: refetchPaymentAllowance,
    isFetching: isPaymentAllowanceLoading,
  } = useGetStaffAllowanceByQuery({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: staff_id || 0,
    payment_type: 0,
  });
  const {
    data: deductionAllowance,
    refetch: refetchDeductionAllowance,
    isFetching: isDeductionAllowanceLoading,
  } = useGetStaffAllowanceByQuery({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: staff_id || 0,
    payment_type: 1,
  });

  const paySlipData = useMemo(() => {
    return {
      user: selectedStaff,
      paymentData: paymentAllowance?.paid || [],
      deductionData: deductionAllowance?.paid || [],
    };
  }, [deductionAllowance?.paid, paymentAllowance?.paid, selectedStaff]);

  const companyStafflist = get_company_staff?.map((staff) => ({
    ...staff,
    label: (
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-helvetica text-xs uppercase">{`${staff?.fullname}`}</span>
          {staff?.empno && "-"}
          <span className="font-helvetica text-black opacity-30 my-auto capitalize text-xs">
            {`${staff?.empno}`}
          </span>
        </div>
        <div>
          <div className="flex flex-wrap flex-co gap-y-1 justify-cente gap-x-3 m">
            {staff?.DESIGNATION_NAME ? (
              <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                {staff?.DESIGNATION_NAME?.toLowerCase()}
              </p>
            ) : null}
          </div>
          <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
            {staff?.DESIGNATION_NAME ? (
              <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                {staff?.DEPARTMENT_NAME?.toLowerCase()}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    ),
    value: staff?.staff_id,
  }));

  const onSubmit = async (values) => {
    const { staff_id, payment_type } = values;
    setViewedPaymentType(payment_type);
    try {
      await mutateAllowance({
        company_id: userData?.data?.COMPANY_ID,
        staff_id,
        payment_type, //payment : 0, deductions: 1
      });
    } catch (err) {
      errorToast(err?.response?.data?.message || err?.message);
    }
  };

  const handlePreviewPayslip = async () => {
    await refetchPaymentAllowance();
    await refetchDeductionAllowance();

    setIsOpenPreviewPayslip(true);
  };
  const onClosePreviewPayslip = () => {
    setIsOpenPreviewPayslip(false);
  };
  return (
    <main>
      <section>
        <PageHeader
          header_text={"Recalculate"}
          breadCrumb_data={[
            { path: "", name: "Allowance" },
            { path: "", name: "Recalculate" },
          ]}
          btnAvailable={false}
        />
      </section>
      <section className="mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 items-end flex-wrap md:flex-nowrap"
        >
          <div className="">
            <h5 className="text-[0.825rem] leading-[1.5] tracking-[2px]">
              Staff Type
            </h5>
            <Controller
              name="staff_type"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="staff_type"
                    size="large"
                    placeholder="Select staff Type"
                    optionFilterProp="label"
                    options={[
                      { label: "Full Time", value: 0 },
                      { label: "Contract", value: 1 },
                    ]}
                    style={{
                      minWidth: "12rem",
                    }}
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      refetch();
                    }}
                    className="w-full"
                  />
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="">
            <h5 className="text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Select Staff
            </h5>
            <Controller
              name="staff_id"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="staff_id"
                    size="large"
                    placeholder="Select staff"
                    optionFilterProp="label"
                    showSearch
                    options={companyStafflist}
                    loading={isLoadingStaff}
                    {...field}
                    onChange={(value, staffData) => {
                      field.onChange(value);
                      setSelectedStaff(staffData);
                    }}
                    labelRender={() => {
                      return (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-helvetica uppercase">
                            {selectedStaff?.fullname}
                          </span>
                        </div>
                      );
                    }}
                    filterOption={(input, option) => {
                      const department_name =
                        option?.DEPARTMENT_NAME?.toLowerCase();
                      const directorate_name =
                        option?.DIRECTORATE_NAME?.toLowerCase();
                      const staffNumber = option?.empno?.toLowerCase();
                      return (
                        department_name?.includes(input.toLowerCase()) ||
                        directorate_name?.includes(input.toLowerCase()) ||
                        staffNumber?.includes(input.toLowerCase())
                      );
                    }}
                    className="w-full md:min-w-[15rem] lg:min-w-[20rem]"
                  />
                </div>
              )}
              rules={{ required: "This fied is required" }}
            />
          </div>
          <div className="">
            <h5 className="text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Select Payment Type
            </h5>
            <Controller
              name="payment_type"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="payment_type"
                    size="large"
                    placeholder="Select Payment type"
                    optionFilterProp="label"
                    options={[
                      { label: "Payment", value: 0 },
                      { label: "Deductions", value: 1 },
                    ]}
                    {...field}
                    className="w-full"
                  />
                </div>
              )}
              rules={{ required: "This fied is required" }}
            />
          </div>
          <div>
            <ConfigProvider theme={{ token: { colorPrimary: "#00bcc2" } }}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isFetchingAllowance}
                className="text-sm font-helvetica"
              >
                Fetch Allowance
              </Button>
            </ConfigProvider>
          </div>
        </form>
      </section>
      <section>
        {get_staff_allowance && (
          <div className="mt-5">
            <ConfigProvider theme={{ token: { colorPrimary: "#00bcc2" } }}>
              <Button
                type="primary"
                onClick={handlePreviewPayslip}
                loading={
                  isDeductionAllowanceLoading || isPaymentAllowanceLoading
                }
              >
                Preview Payslip
              </Button>
            </ConfigProvider>
          </div>
        )}

        {get_staff_allowance && (
          <PayrollDisplay
            payrollData={get_staff_allowance}
            userData={userData}
            viewedPaymentType={viewedPaymentType}
            selectedStaff={selectedStaff}
            payment_type={getValues("payment_type")}
            mutateAllowance={mutateAllowance}
          />
        )}
      </section>

      <ExpandedDrawerWithButton
        withBg={false}
        maxWidth={1000}
        isOpen={isOpenPreviewPayslip}
        onClose={onClosePreviewPayslip}
      >
        {isOpenPreviewPayslip && <PayslipDrawer paySlipData={paySlipData} />}
      </ExpandedDrawerWithButton>
    </main>
  );
};

export default Recalculate;

const PayrollDisplay = ({
  payrollData,
  userData,
  viewedPaymentType,
  selectedStaff,
  payment_type,
  mutateAllowance,
}) => {
  const [editingItem, setEditingItem] = useState({ isOpenDrawer: false });

  const [currentPage, setCurrentPage] = useState({ paid: 1, unpaid: 1 });
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const pages = useMemo(() => {
    setCurrentPage({
      paid: 1,
      unpaid: 1,
    });
    return {
      paid: Math.ceil(payrollData.paid?.length / rowsPerPage) || null, // total divided by row-per-page
      unpaid: Math.ceil(payrollData.unpaid?.length / rowsPerPage) || null, // total divided by row-per-page
    };
  }, [payrollData.paid?.length, payrollData.unpaid?.length, rowsPerPage]);

  const paginatedData = useMemo(() => {
    const paidStart = (currentPage.paid - 1) * rowsPerPage;
    const paidEnd = paidStart + rowsPerPage;
    const unpaidStart = (currentPage.unpaid - 1) * rowsPerPage;
    const unpaidEnd = unpaidStart + rowsPerPage;

    return {
      paid: payrollData.paid.slice(paidStart, paidEnd) || [],
      unpaid: payrollData.unpaid.slice(unpaidStart, unpaidEnd) || [],
    };
  }, [
    currentPage.paid,
    currentPage.unpaid,
    payrollData.paid,
    payrollData.unpaid,
    rowsPerPage,
  ]);

  const dataLength =
    payrollData?.paid.length < payrollData?.unpaid.length
      ? {
          short: payrollData?.paid.length,
          long: payrollData?.unpaid.length,
        }
      : {
          short: payrollData?.unpaid.length,
          long: payrollData?.paid.length,
        };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type, isOpenDrawer: true });
  };
  const handleCloseEdit = (item, type) => {
    setEditingItem({ ...item, type, isOpenDrawer: false });
  };

  const calculateTotal = (items) => {
    return items.reduce(
      (sum, item) => sum + parseFloat(item.amount_to_pay || 0),
      0
    );
  };

  const PayrollItem = ({ item, type, isLast }) => (
    <div
      className={`group relative flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {item.name}
          </h3>
        </div>

        <div className="flex items-center space-x-4 ml-4">
          <div className="text-right">
            <div className="text-[1.15rem] font-semibold text-gray-900 font-helvetica">
              {formatNaira(item.amount_to_pay)}
            </div>
            <div className="text-sm text-gray-400 font-helvetica opacity-85">
              Default: {formatNaira(item.default_amount)}
            </div>
          </div>

          <button
            onClick={() => handleEdit(item, type)}
            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200"
            title="Edit item"
          >
            <Edit3 size={16} />
          </button>
        </div>
      </>
    </div>
  );

  PayrollItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      amount_to_pay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      default_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    type: PropTypes.string,
    isLast: PropTypes.bool,
    view_all_btn: PropTypes.bool,
  };

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage({ paid: 1, unpaid: 1 });
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="flex justify-end">
        <div className="flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="20">10</option>
              <option value="500">20</option>
              <option value="100">50</option>
              <option value={dataLength?.long}>All</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Paid Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative flex flex-col justify-between">
          <div>
            <div className="bg-green-50 px-6 py-4 rounded-t-lg border-b border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <h2 className="text-lg font-semibold text-green-800">
                    {viewedPaymentType ? "Deductions" : "Paid Income"}
                  </h2>
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  {payrollData.paid.length} items
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {paginatedData.paid.map((rowItem, index) => (
                <PayrollItem
                  key={rowItem.id}
                  item={rowItem}
                  type="paid"
                  isLast={index === paginatedData.paid.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="absolut bottom-0 w-full">
            <div className="flex mb-4 justify-end mr-2">
              <Pagination
                total={pages.paid}
                initialPage={1}
                page={currentPage.paid}
                onChange={(page) =>
                  setCurrentPage((prev) => ({ ...prev, paid: page }))
                }
                showControls
              />
            </div>
            <div className="bg-green-50 px-6 py-4 rounded-b-lg border-t border-green-100">
              <div className="flex justify-between items-center">
                <span className="font-medium text-green-800">
                  Total {viewedPaymentType ? "Deductions" : "Incomes"}:
                </span>
                <span className="text-lg font-bold text-green-800">
                  {formatNaira(calculateTotal(payrollData.paid))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Unpaid Items */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative overflow-auto flex flex-col justify-between">
          <div>
            <div className="bg-red-50 px-6 py-4 rounded-t-lg border-b border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="text-red-600" size={20} />
                  <h2 className="text-lg font-semibold text-red-800">
                    Zero {viewedPaymentType ? "Deductions" : "Incomes"}
                  </h2>
                </div>
                <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">
                  {payrollData.unpaid.length} items
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {paginatedData.unpaid?.map((rowItem, index) => (
                <PayrollItem
                  key={index + "-unpaid" + rowItem.id}
                  item={rowItem}
                  type="unpaid"
                  isLast={index === paginatedData.unpaid.length - 1}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="flex mb-4 justify-end mr-2">
              <Pagination
                total={pages.unpaid}
                initialPage={1}
                page={currentPage.unpaid}
                onChange={(page) =>
                  setCurrentPage((prev) => ({ ...prev, unpaid: page }))
                }
                showControls
              />
            </div>
          </div>
        </div>
      </div>

      <ExpandedDrawerWithButton
        isOpen={editingItem.isOpenDrawer}
        onClose={handleCloseEdit}
        maxWidth={500}
      >
        <RecalculateForm
          allowance={editingItem}
          userData={userData}
          closeDrawer={handleCloseEdit}
          selectedStaff={selectedStaff}
          payment_type={payment_type}
          mutateAllowance={mutateAllowance}
        />
      </ExpandedDrawerWithButton>
    </div>
  );
};

const RecalculateForm = ({
  allowance,
  userData,
  closeDrawer,
  selectedStaff,
  payment_type,
  mutateAllowance,
}) => {
  const { mutateAsync: mutateRecalculate, isPending: isRecalculating } =
    useRecalculateStaffAllowance();

  const { handleSubmit, getValues, setValue, reset, watch } = useForm({
    defaultValues: {
      amount_to_pay: Number(allowance?.amount_to_pay),
      default_amount: Number(allowance?.default_amount),
    },
  });

  useEffect(() => {
    reset({
      amount_to_pay: Number(allowance?.default_amount),
      default_amount: Number(allowance?.default_amount),
    });
  }, [allowance?.default_amount, reset]);

  const onSubmit = async (values) => {
    const { amount_to_pay } = values;

    // console.log(allowance);

    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      id: allowance?.id,
      staff_id: selectedStaff?.staff_id,
      amount: amount_to_pay,
    };
    try {
      // console.log(payload);
      const res = await mutateRecalculate(payload);
      successToast(res?.data?.message);
      closeDrawer();
      mutateAllowance({
        company_id: userData?.data?.COMPANY_ID,
        staff_id: selectedStaff?.staff_id,
        payment_type, //payment : 0, deductions: 1
      });
    } catch (err) {
      errorToast(err?.response?.data?.message || err?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Amount to Pay
        </label>
        <Input
          type="number"
          value={watch("amount_to_pay")}
          onChange={(e) => setValue("amount_to_pay", e.target.value)}
          className="w-full px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Default Amount
        </label>
        <Input
          type="number"
          value={getValues("default_amount")}
          className="w-full px-3 py-2"
          readOnly
        />
      </div>

      <div className="flex justify-end">
        <ConfigProvider theme={{ token: { colorPrimary: "#00bcc2" } }}>
          <Button
            type="primary"
            size="large"
            loading={isRecalculating}
            htmlType="submit"
          >
            Recalculate
          </Button>
        </ConfigProvider>
      </div>
    </form>
  );
};

PayrollDisplay.propTypes = {
  payrollData: PropTypes.shape({
    paid: PropTypes.array,
    unpaid: PropTypes.array,
  }),
  userData: PropTypes.object,
  viewedPaymentType: PropTypes.string,
  selectedStaff: PropTypes.object,
  mutateAllowance: PropTypes.func.isRequired,
  payment_type: PropTypes.any.isRequired,
};

RecalculateForm.propTypes = {
  allowance: PropTypes.object,
  userData: PropTypes.object,
  closeDrawer: PropTypes.func,
  selectedStaff: PropTypes.object,
  mutateAllowance: PropTypes.func.isRequired,
  payment_type: PropTypes.any.isRequired,
};
