import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ConfigProvider, Input, Modal } from "antd";
import { errorToast } from "../../../utils/toastMsgPop";
import { Spinner } from "@nextui-org/react";
import { useChangePsw } from "../../../API/profile";
import Label from "../../forms/FormElements/Label";
import useCurrentUser from "../../../hooks/useCurrentUser";

const ResetPasswordSetByAdmin = ({ closeDrawer }) => {
  const mutation = useChangePsw("staff_reset_password");

  const navigate = useNavigate();

  const { userData } = useCurrentUser();
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const {
    register,
    handleSubmit,
    setValue,   
    formState: { errors },    
    trigger,
    reset,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onsubmit = (data) => {
    const json = {
      staff_id: staff_id,
      company_id: company_id,
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    };

    mutation.mutate(json, {
      onError: (error) => {
        const err = error?.response?.data?.message ?? error?.message;

        errorToast(err);
      },
      onSuccess: (data) => {
        const res = data?.data;

        reset();

        closeDrawer();

        Modal.success({
          content: res?.message,
          okButtonProps: {
            className: "bg-[#00bcc2] rounded text-white font-helvetica py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
          },
          onOk: () => {
            navigate("/");
          },
        });

      },
    });
  };

  // Watch the value of the "password" field
  const new_password = watch("new_password");

  const handleChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <>
      <main className="w-full max-w-lg mx-auto">
        <h2 className="text-[1rem] font-medium font-helvetica uppercase text-start text-gray-700">
          Change Password
        </h2>
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <Label>Password By Admin</Label>
            <ConfigProvider
              theme={
                {
                  // components: {
                  //     Input: {
                  //         hoverBorderColor: "#733534",
                  //         activeBorderColor: "#733534",
                  //         activeShadow: "0",
                  //     }
                  // }
                }
              }
            >
              <Input.Password
                name="old_password"
                value={getValues("old_password")}
                type="old_password"
                placeholder="Enter password given by admin"
                size={"large"}
                className={`text-[16px] ${errors.old_password ? "error" : ""}`}
                status={errors.old_password ? "error" : ""}
                {...register("old_password", {
                  required: "old password is required",
                })}
                onChange={(e) => handleChange(e.target.value, "old_password")}
              />
              <small style={{ fontSize: "13px" }} className="text-red-500">
                {errors.old_password && errors.old_password.message}
              </small>
            </ConfigProvider>
          </div>
          <div className="mb-3">
            <Label>New Password</Label>
            <Input.Password
              name="new_password"
              value={getValues("new_password")}
              type="new_password"
              placeholder="Enter your New password"
              size={"large"}
              className={`text-[16px] ${errors.new_password ? "error" : ""}`}
              status={errors.new_password ? "error" : ""}
              {...register("new_password", {
                required: "New password is required",
              })}
              onChange={(e) => handleChange(e.target.value, "new_password")}
            />
            <small style={{ fontSize: "13px" }} className="text-red-500">
              {errors.new_password && errors.new_password.message}
            </small>
          </div>
          <div className="mb-3">
            <Label>Confirm Password</Label>
            <Input.Password
              name="confirm_password"
              value={getValues("confirm_password")}
              type="confirm_password"
              placeholder="Confirm password"
              size={"large"}
              className={`text-[16px] ${
                errors.confirm_password ? "error" : ""
              }`}
              status={errors.confirm_password ? "error" : ""}
              {...register("confirm_password", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === new_password || "Passwords do not match",
              })}
              onChange={(e) => handleChange(e.target.value, "confirm_password")}
            />
            <small style={{ fontSize: "13px" }} className="text-red-500">
              {errors.confirm_password && errors.confirm_password.message}
            </small>
          </div>
          <div className="mt-10 mb-3 flex justify-end">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase flex items-center"
              type="submit"
            >
              {mutation?.isPending ? (
                <Spinner color="default" size="sm" />
              ) : null}
              Change Password
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default ResetPasswordSetByAdmin;

ResetPasswordSetByAdmin.propTypes = {
  closeDrawer: PropTypes.func,
};
