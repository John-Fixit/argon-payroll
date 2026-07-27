import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Input, Modal, Select } from "antd";
import { errorToast } from "../../../utils/toastMsgPop";
import { Spinner, User } from "@nextui-org/react";
import { useChangePsw } from "../../../API/profile";
import Label from "../../forms/FormElements/Label";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { filePrefix } from "../../../utils/filePrefix";
import { useGetAllStaff } from "../../../API/memo";
import { FaUser } from "react-icons/fa";

const AdminResetPassword = ({ closeDrawer }) => {
  const mutation = useChangePsw("admin_reset_staff_password");

  const { userData } = useCurrentUser();

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const { data: getStaffs, isLoading } = useGetAllStaff(company_id);

  const staffs = getStaffs?.map((item) => {
    return {
      ...item,
      value: item?.STAFF_ID,
      label: (
        <User
          avatarProps={{
            icon: <FaUser size={20} className="" />,
            radius: "full",
            src: item?.FILE_NAME ? filePrefix + item?.FILE_NAME : "",
            className:
              "w-8 h-8 my-2 object-cover rounded-full border-default-200 border",
          }}
          name={`${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""}`}
          classNames={{
            description: "w-48 truncat",
            name: "w-48 font-helvetica text-xs uppercase",
          }}
          css={{
            ".nextui-user-icon svg": {
              color: "red", // Set the color of the default icon
            },
          }}
          description={
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              {item?.DESIGNATION ? (
                <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                  {item?.DESIGNATION?.toLowerCase()}
                  <span>-</span>
                </p>
              ) : null}
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                {item?.STAFF_NUMBER}
              </p>
            </div>
          }
        />
      ),
      searchValue: `${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""} ${
        item?.STAFF_ID
      }`,
    };
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
    getValues,
    control,
  } = useForm({});

  const onsubmit = (data) => {
    const json = {
      staff_id: staff_id,
      company_id: company_id,
      password: data.password,
      concerned_staff_id: data?.concerned_staff_id,
    };

    // console.log(json)

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
            className:
              "bg-[#00bcc2] rounded text-white font-helvetica py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase",
          },
        });
      },
    });
  };

  const handleChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <>
      <main className="w-full max-w-lg mx-auto">
        <h2 className="text-[1rem] font-medium font-helvetica uppercase text-start text-gray-700">
          Reset Staff Password
        </h2>
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <Label>Staff</Label>
            <Controller
              name="concerned_staff_id"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="concerned_staff_id"
                    size="large"
                    showSearch
                    placeholder="Select Staff"
                    optionFilterProp="label"
                    loading={isLoading}
                    options={staffs}
                    status={errors?.concerned_staff_id ? "error" : ""}
                    {...field}
                    className="w-full"
                    onChange={(value) =>
                      handleChange(value, "concerned_staff_id")
                    }
                    filterOption={(input, option) => {
                      const searchValue = option?.searchValue?.toLowerCase();
                      const staffNumber = option?.STAFF_NUMBER?.toLowerCase();
                      return (
                        searchValue?.includes(input.toLowerCase()) ||
                        staffNumber?.includes(input.toLowerCase())
                      );
                    }}
                  />
                  <span className="text-red-500">
                    {errors?.concerned_staff_id?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Staff Selection is required" }}
            />
          </div>

          <div className="mb-3">
            <Label>Password</Label>
            <Input.Password
              name="password"
              value={getValues("password")}
              type="password"
              placeholder="Enter password"
              size={"large"}
              className={`text-[16px] ${errors.password ? "error" : ""}`}
              status={errors.password ? "error" : ""}
              {...register("password", {
                required: "Password is required",
              })}
              onChange={(e) => handleChange(e.target.value, "password")}
            />
            <small style={{ fontSize: "13px" }} className="text-red-500">
              {errors.password && errors.password.message}
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

export default AdminResetPassword;

AdminResetPassword.propTypes = {
  closeDrawer: PropTypes.func,
};
