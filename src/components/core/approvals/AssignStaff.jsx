/* eslint-disable no-unused-vars */
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Select, Space } from "antd";
import { errorToast } from "../../../utils/toastMsgPop";
import { Avatar, Spinner, User } from "@nextui-org/react";
import Label from "../../forms/FormElements/Label";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetCanAssignStaffs, useReAssignApprovalReq } from "../../../API/api_urls/my_approvals";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { filePrefix } from "../../../utils/filePrefix";

const AssignStaff = ({ closeDrawer, package_id, request_id }) => {

  const mutation = useReAssignApprovalReq();

  const { userData } = useCurrentUser();
  const {mutateAsync:getAssignStaff} = useGetCanAssignStaffs()



  const [staffs, setStaffs] = useState([])
  const [isLoading, setIsLoading] = useState(false)




  const {
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
    control,
  } = useForm({});




  useEffect(() => {

    const getReassignStaff = async ()=>{
  
     const json =  {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        package_id: package_id
      }
  
      setIsLoading(true)

      try {
        const res = await getAssignStaff(json)
  
        if(res){
          const stf = res?.data?.data
            ?.map((item) => {
              return {
                ...item,
                value: item?.STAFF_ID + ' ' + item?.LEVEL,
                label: <User
                avatarProps={{
                  icon: (
                    <FaUser size={20} className=""/>
                  ),
                  radius: "full",
                  src: item?.FILE_NAME
                    ? filePrefix + item?.FILE_NAME
                    : "",
                  className:
                    "w-8 h-8 object-cover my-2 rounded-full border-default-200 border",
                }}
                name={`${item?.LAST_NAME || ""} ${
                  item?.FIRST_NAME || ""
                }`}
                classNames={{
                  description: "w-48 truncat",
                  name: "w-48 font-helvetica text-xs uppercase",
                }}
                css={{
                  '.nextui-user-icon svg': {
                    color: 'gray', // Set the color of the default icon
                  },
                }}
                description={
                  <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
                    {
                      item?.LEVEL?(
                    <p className="font-helvetica text-black opacity-50 capitalize flex gap-x-2 my-auto">
                      ({item?.LEVEL?.toLowerCase() })
                    </p>
                      ):
                      null
                    }
                    
                  </div>
                }
              />
              };
            });
          setStaffs(stf)
        }
        
      } catch (error) {
        console.log(error)
      }finally {
        setIsLoading(false)
      }
    }
  
    getReassignStaff()


    return ()=>{
      setIsLoading(false)
    }
  
  }, [getAssignStaff, userData, package_id])



















  const onsubmit = (data) => {

    const json = {
    "request_id": request_id,
    "approver_id": Number(data?.concerned_staff_id?.split(' ')[0])
    };

    mutation.mutate(json, {
      onError: (error) => {
        const err = error?.response?.data?.message ?? error?.message;
        errorToast(err);
      },
      onSuccess: (data) => {
        reset();
        toast.success("You successfully re-assign the request", { duration: 5000 });
        closeDrawer();
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
          Select Staff
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
                    // optionRender={(staff) => (
                    //   <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
                    //     {
                    //       <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                    //         {staff?.FILE_NAME?.includes("http") ? (
                    //           <Avatar
                    //             alt={staff?.label}
                    //             className="flex-shrink-0"
                    //             size="sm"
                    //             src={staff?.FILE_NAME}
                    //           />
                    //         ) : (
                    //           <Avatar
                    //             alt={staff?.label}
                    //             className="flex-shrink-0"
                    //             size="sm"
                    //             name={staff?.label?.trim()[0]}
                    //           />
                    //         )}

                    //         <div className="flex flex-col">
                    //           <span className="text-xs font-medium">
                    //             {staff?.label}
                    //           </span>
                    //         </div>
                    //       </div>
                    //     }
                    //   </Space>
                     
                    // )}
                    status={errors?.concerned_staff_id ? "error" : ""}
                    {...field}
                    className="w-full"
                    onChange={(value) =>
                      handleChange(value, "concerned_staff_id")
                    }
                  />
                  <span className="text-red-500">
                    {errors?.concerned_staff_id?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Staff Selection is required" }}
            />
          </div>

         

          <div className="mt-10 mb-3 flex justify-end">
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[7px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase flex items-center"
              type="submit"
            >
              {mutation?.isPending ? (
                <Spinner color="default" size="sm" />
              ) : null}
              Re-Assign
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AssignStaff;

AssignStaff.propTypes = {
  closeDrawer: PropTypes.func,
  package_id: PropTypes.any,
  request_id: PropTypes.any,
};
