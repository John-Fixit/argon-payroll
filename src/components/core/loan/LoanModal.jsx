/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, useForm } from "react-hook-form";
import LoanHistoryTable from "./LoanHistory";
import { Button, Input, Slider } from "antd";
import {
  useConfirmLoanOTP,
  useCreateLoan,
  useGetExternalLoan,
  useGetLoanHistory,
  useGetLoanOTP,
} from "../../../API/loan";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Chip, Spinner, useDisclosure } from "@nextui-org/react";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoanConfirmModal from "./LoanConfirmModal";
import propTypes from "prop-types"

// 2406 || userData?.data?.STAFF_ID,
const LoanModal = ({onCloseModal}) => {
  const { userData } = useCurrentUser();


  const [tokenSent, setTokenSent] = useState(false);

  const { data, error } = useGetExternalLoan({
    staff_id: userData?.data?.STAFF_ID,
    company_id: userData?.data?.COMPANY_ID,
  });

  const { data: history, isFetching: isPending } = useGetLoanHistory({
    staff_id: userData?.data?.STAFF_ID,
    company_id: userData?.data?.COMPANY_ID,
  });

  const { mutateAsync: applyLoan, isPending: loading } = useCreateLoan({
    staff_id:  userData?.data?.STAFF_ID,
    company_id: userData?.data?.COMPANY_ID,
  });

  const { mutateAsync: getOtp, isPending: loadingOtp } = useGetLoanOTP();

  const {
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      amount: 0,
      otp: "",
      repayment: 0,
      slideValue: 0,
    },
  });

  const { mutateAsync: confirmLoanOTP, isPending: loadingConfirmOtp } =
    useConfirmLoanOTP();

  const queryClient = useQueryClient();

  const {
    isOpen: isConfirmModalOpen,
    onOpen: openConfirmModal,
    onClose: onConfirmCloseModal,
  } = useDisclosure();

  // console.log(error?.response?.data?.message);
  // ---------------------------------------------------

  const calculateRepayment = () => {
    const amount = getValues("amount");
    const percent = (Number(amount || 0) * 10) / 100;
    const total = Number(amount || 0) + percent;
    // console.log(Number(amount || 0), total);

    setValue("repayment", total);
  };

  useEffect(() => {
    if (data?.result) {
      setValue("amount", data?.result);
      setValue("slideValue", data?.result);
      calculateRepayment();
    }
  }, [data?.result, setValue]);

  const onsubMit = async () => {
    try {
      if (loading) return;

      onConfirmCloseModal();

      const otpValidity = await confirmOtpPin();
      if (!otpValidity) return;

      const val = getValues("amount");
      // console.log(val);

      const json = {
        staff_id:  userData?.data?.STAFF_ID,
        company_id: userData?.data?.COMPANY_ID,
        amount: val,
        qualified_amount: data?.result,
      };

      // console.log(json)

      const res = await applyLoan(json);
      //    console.log(res)

      if (res) {
        toast.success("loan application is successful!",  {duration: 10000 });
        queryClient?.invalidateQueries("loan_history");
        onCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOtpPin = async () => {
    try {
      if (loadingOtp) return;

      const json = {
        staff_id:  userData?.data?.STAFF_ID,
        company_id: userData?.data?.COMPANY_ID,
      };
      const res = await getOtp(json);

      if (res) {
        toast.success("Otp has been sent to your phone and email", {duration: 10000 });
        setTokenSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmOtpPin = async () => {
    try {

      if (loadingConfirmOtp) return;
      const json = {
        staff_id:  userData?.data?.STAFF_ID,
        company_id: userData?.data?.COMPANY_ID,
        otp: getValues("otp"),
      };

      const res = await confirmLoanOTP(json);

      if (res) {
        return true;
      } else {
        toast.error(error?.response?.data?.message || "Otp validation failed. Please try again!",  {duration: 10000 });
        return false;
      }
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Otp validation failed. Please try again",  {duration: 10000 });
      return false;
    }
  };

  const onChange = (value, key) => {
    if (value && !Number(value)) return;

    if (value && Number(value) > data?.result) return;

    if (value.includes("e")) {
      value = value.replace(/e/g, "");
    }
    // console.log(value)
    setValue(key, value);
    trigger(key);

    calculateRepayment();
  };
  
  const onChangeOtp = (value, key)=>{
    setValue(key, value);
    trigger(key);
  }

  const captureSlider = (value) => {
    // console.log(value)
    setValue("amount", value);
    setValue("slideValue", value);
    trigger("amount");
    calculateRepayment();
  };

  return (
    <div className="flex flex-col">
        <h4 className="header_h3 text-2xl mb-3 font-helvetica">Payday Loan</h4>
        <div className="flex flex-col gap-y-5 bg-white px-20 py-10  rounded-lg shadow-lg">
          <div className=" ">
            {error?.response?.data?.message && (
              <div className="my-2">
                <Chip
                  color="warning"
                  className="m-1 px-2 py-2 transition-all duration-300"
                  size="md"
                  variant="flat"
                >
                  {error?.response?.data?.message?.includes(
                    "Payday Loan closed"
                  )
                    ? "Payday Loan closed for the month"
                    : "You are currently not qualify to apply for Payday Loan"}
                </Chip>
              </div>
            )}

            <h5 className="header_h3  text-[0.925rem] leading-[1.5] tracking-[2px] ">
              How much money do you need?
            </h5>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    type="number"
                    aria-label="amount"
                    size="large"
                    placeholder="Enter your Amount"
                    {...field}
                    onChange={(e) => onChange(e?.target.value, "amount")}
                    className="mt-2 py-5 text-lg"
                    status={
                      touchedFields?.amount && errors?.amount ? "error" : ""
                    }
                    max={Number(data?.result) || 100}
                    onKeyDown={(e) => {
                      if (e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.amount && errors?.amount?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />

            <div className=" px-2 rounded-md mt-5 bg-gray-200">
              <Slider
                step={100}
                className=""
                max={Number(data?.result || 0)}
                onChange={captureSlider}
                value={getValues("slideValue")}
                // classNames={

                // }
              />
            </div>

            {tokenSent && (
              <div className="flex flex-col">
                <h5 className="header_h3  text-[0.925rem] leading-[1.5] tracking-[2px] mt-3 ">
                  OTP
                </h5>
                <Controller
                  name="otp"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        type="number"
                        aria-label="otp"
                        placeholder="Enter OTP pin"
                        {...field}
                        onChange={(e) => onChangeOtp(e?.target.value, "otp")}
                        className="mt-2 py-2"
                        status={
                          touchedFields?.otp && errors?.otp ? "error" : ""
                        }
                        // onKeyDown={(e) => {
                        //   if (e.key === "e") {
                        //     e.preventDefault();
                        //   }
                        // }}
                      />
                      <span className="text-red-500">
                        {touchedFields?.otp && errors?.otp?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />

                <div className=" bg-white  border border-dashed border-[#8e57f4] p-2 rounded-md text-gray-700 mt-2 shadow">
                  We have sent you a One Time OTP Pin. Please check your mail or
                  SMS message.
                  <Button disabled={loadingOtp} size="small" className="mx-2" onClick={getOtpPin}>
                    {loadingOtp ? (
                      <Spinner
                        size="sm"
                        classNames={{ circle1: "border-white/80" }}
                      />
                    ):  <span>Resend</span>}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center  w-full">
            <div className="bg-[#e7e9ec] flex items-center flex-col justify-center  w-full p-10 rounded gap-4">
              {/* w-[300px] */}
              <h5 className="header_h3 text-[0.825rem] leading-[1.5] tracking-[2px]">
                You will Pay
              </h5>
              <h5 className="header_h3 text-[2rem] leading-[1.5] tracking-[2px]">
                ₦
                {getValues("repayment")?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </h5>
            </div>
          </div>

          {!tokenSent ? (
            <button
              disabled={loadingOtp || !getValues("amount") || !data?.result}
              className="header_btnStyle  bg-[#8d50ff] disabled:bg-[#8d50ff]/70 rounded text-white font-semibold py-[10px] leading-[19.5px]  my-1 md:my-0 px-[16px] uppercase flex items-center justify-center gap-2"
              onClick={getOtpPin}
            >
              {loadingOtp && (
                <Spinner
                  size="sm"
                  classNames={{ circle1: "border-white/80" }}
                />
              )}

              {loadingOtp ? "Initiating..." : "Get OTP"}
            </button>
          ) : (
            <button
              disabled={(loading || loadingConfirmOtp) || !getValues("amount") || !getValues("otp") || !data?.result}
              className="header_btnStyle  bg-[#8d50ff] disabled:bg-[#8d50ff]/70 rounded text-white font-semibold py-[10px] leading-[19.5px]  my-1 md:my-0 px-[16px] uppercase flex items-center justify-center gap-2"
              onClick={openConfirmModal}
            >
              {loading || loadingConfirmOtp && (
                <Spinner
                  size="sm"
                  classNames={{ circle1: "border-white/80" }}
                />
              )}

              {loading || loadingConfirmOtp ? "Processing..." : "Apply For Loan"}
            </button>
          )}
        </div>


      {/* <div className="flex p-2  justify-end">
        <button
          className="header_btnStyle bg-[#8d50ff] rounded text-white font-semibold py-[10px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
          onClick={()=>setShowHistory(!showHistory)}
        >
          <BsEye/>
          View History
        </button>
      </div> */}
      <LoanHistoryTable tableData={history} isPending={isPending} />


      <LoanConfirmModal
        isOpen={isConfirmModalOpen}
        handleOk={onsubMit}
        // handleOk={confirmOtpPin}
        handleCancel={onConfirmCloseModal}
        amount={getValues("amount")}
        repayment={getValues("repayment")}
        loading={loading}
        // duration={"2025-03-03"}
      />
    </div>
  );
};


LoanModal.propTypes = {
  onCloseModal: propTypes.func.isRequired
}
export default LoanModal;
