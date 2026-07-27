/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { Fragment, useMemo, useRef, useState } from "react";
import { Avatar, Button, User } from "@nextui-org/react";
import { Select, Space } from "antd";
import { file_Prefix } from "../../../../API/leave";
import { useGetGuarantor } from "../../../../API/salary-advance";
import { errorToast } from "../../../../utils/toastMsgPop";
import Label from "../../../forms/FormElements/Label";


const AdvanceGuarantor = ({ getValues, setValue, watch, goToNextTab }) => {


  const {data, isLoading} = useGetGuarantor({
    company_id: getValues().company_id,
  });

  const info = watch("guarantor");

  const staff = useMemo(()=>(
    data?.map((current) => {
      return {
        ...current,
        value: current?.STAFF_ID,
        label: `${current.FIRST_NAME} ${current.LAST_NAME}`,
      };
    }) || []
    
  ), [data])


  const handleSelectHandOver = (value) => {
    setValue("guarantor", value)
  };

  const next = () => {
    if (getValues().guarantor == null) {
      errorToast("Guarantor is required");
    } else {
      goToNextTab();
    }
  };

  return (
    <Fragment>
      <div>
        <div className="w-full bg-white p-8 shadow rounded">
          <div>
            <div className="relative my-4">
              <div className="my-4 items-center gap-1 border-b pb-4">
                <Label>Guarantor</Label>
                <div className="w-full relative md:col-span-2">
                  <Select
                    size={"large"}
                    value={getValues().guarantor}
                    placeholder="Select guarantor"
                    onChange={handleSelectHandOver}
                    style={{
                      width: "100%",
                    }}
                    loading={isLoading}
                    optionFilterProp="label"
                    showSearch
                    options={staff}
                    optionRender={(user) => (
                      <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
                        {
                          <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                            {user?.data?.FILE_NAME?.includes("http") ? (
                              <Avatar
                                alt={user?.data?.name}
                                className="flex-shrink-0"
                                size="sm"
                                src={file_Prefix + user?.data?.FILE_NAME}
                              />
                            ) : (
                              <Avatar
                                alt={user?.data?.name}
                                className="flex-shrink-0"
                                size="sm"
                                name={user?.data?.label?.trim()[0]}
                              />
                            )}

                            <div className="flex flex-col">
                              <span className="font-medium uppercase font-helvetica">
                                {user?.data?.label}
                              </span>
                              <span className="text-xs font-medium text-gray-400 uppercase font-helvetica">
                                {user?.data?.DEPARTMENT}
                              </span>
                            </div>
                          </div>
                        }
                      </Space>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* {info?.value && (
              <div className="flex justify-between my-4 items-center py-2 px-3 rounded bg-slate-100">
                <div className="flex items-center gap-5">
                  {info?.FILE_NAME ? (
                    <Avatar
                      alt={info?.name}
                      className="flex-shrink-0"
                      size="md"
                      src={
                        info?.FILE_NAME
                          ? file_Prefix + info?.FILE_NAME
                          : ""
                      }
                    />
                  ) : (
                    <Avatar
                      alt={info?.name}
                      className="flex-shrink-0"
                      size="sm"
                      name={info?.label?.trim()[0]}
                    />
                  )}
                  <div className="">
                    <p className="m-0 font-medium font-helvetica uppercase">
                      {info?.FIRST_NAME} {info?.LAST_NAME}
                    </p>
                    <p className="m-0 text-xs font-helvetica uppercase text-gray-500">
                      {info?.DEPARTMENT}
                    </p>
                  </div>
                </div>
              </div>
            )} */}

            <div className="flex justify-end">
              <Button
                size="sm"
                className="rounded-md font-medium shadow font-helvetica uppercase"
                color="secondary"
                onClick={next}
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdvanceGuarantor;

AdvanceGuarantor.propTypes = {
  setInformation: PropTypes.func,
  information: PropTypes.object,
  goToNextTab: PropTypes.func,
  getValues: PropTypes.func,
  watch: PropTypes.func,
  setValue: PropTypes.func,
};
