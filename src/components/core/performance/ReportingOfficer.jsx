import { Avatar, Button, Card, CardBody, cn } from "@nextui-org/react";
import { Select, Space, Tooltip } from "antd";
import {
  useGetCounterOfficer,
  useGetReportingOfficer,
} from "../../../API/performance";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { file_Prefix } from "../../../API/leave";
import PropTypes from "prop-types";

const ReportingOfficer = ({
  control,
  saveAsDraft,
  isDraft,
  isPending,
  onNext,
}) => {
  const { userData } = useCurrentUser();

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const { data: reportingOfficers, isLoading: reportOfficerLoading } =
    useGetReportingOfficer({
      company_id,
      staff_id,
    });

  const { data: counterOfficers, isLoading: counterOfficerLoading } =
    useGetCounterOfficer({
      company_id,
      staff_id,
    });

  const reportingOfficerList = useMemo(() => {
    return reportingOfficers?.map((officer) => ({
      ...officer,
      label: `${officer?.FIRST_NAME?.trim()} ${officer?.LAST_NAME?.trim()}`,
      value: officer?.STAFF_ID,
    }));
  }, [reportingOfficers]);

  const counterOfficerList = useMemo(() => {
    return counterOfficers?.map((officer) => ({
      ...officer,
      label: `${officer?.FIRST_NAME?.trim()} ${officer?.LAST_NAME?.trim()}`,
      value: officer?.STAFF_ID,
    }));
  }, [counterOfficers]);

  return (
    <Card className="shadow-md my-4">
      <CardBody className="p-4 w-full gap-3">
        <div className="p-2 flex flex-col gap-4">
          <div>
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px]">
              Reporting Officer
            </h5>
            <Controller
              name="report_officer"
              control={control}
              // rules={{ required: "Reporting Officer is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    placeholder="Select Reporting Officer"
                    showSearch
                    optionFilterProp="label"
                    status={error ? "error" : ""}
                    loading={reportOfficerLoading}
                    // options={reportingOfficerList}
                    options={reportingOfficerList?.map((user) => ({
                      value: user?.value, // Staff unique identifier
                      label: user?.label, // Staff name
                      disabled: user?.ON_LEAVE, // Disable if ON_LEAVE is true
                      // title: user?.ON_LEAVE ? "Staff on leave" : undefined, // Tooltip for disabled options
                      ...user, // Spread the rest of the user's properties
                    }))}
                    size="large"
                    className="w-full"
                    optionRender={(option) => (
                      <>
                        <Tooltip
                          title={
                            option?.data?.ON_LEAVE ? (
                              <div className="flex flex-col items-start">
                                <span className="mb-2">
                                  Staff on Leave, contact staff to return
                                </span>
                              </div>
                            ) : undefined
                          }
                          placement="top"
                        >
                          <Space
                            className={cn(
                              "cursor-pointer w-full px-2 rounded-xl flex justify-between",
                              option?.data?.ON_LEAVE
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            )}
                          >
                            <div
                              className={cn(
                                `flex gap-2 items-center px-2 py-1`
                              )}
                            >
                              {option?.data?.FILE_NAME ? (
                                <Avatar
                                  alt={option?.data?.name}
                                  className="flex-shrink-0"
                                  size="sm"
                                  src={file_Prefix + option?.data?.FILE_NAME}
                                />
                              ) : (
                                <Avatar
                                  alt={option?.data?.name}
                                  className="flex-shrink-0"
                                  size="sm"
                                  name={option?.data?.label?.trim()[0]}
                                />
                              )}

                              <div className="flex flex-col">
                                <span className="font-medium uppercase font-helvetica">
                                  {option?.data?.label}
                                </span>
                                <p className="text-sm">
                                  {option?.data?.STAFF_NUMBER} -{" "}
                                  <small>
                                    Grade {option?.data?.GRADE_LEVEL}
                                  </small>
                                </p>
                              </div>
                            </div>
                            {option?.data?.ON_LEAVE ? (
                              <div className="flex items-center gap-x-1">
                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                <p className="text-default-400 opacity-70 text-xs font-helvetica">
                                  ON LEAVE
                                </p>
                              </div>
                            ) : null}
                          </Space>
                        </Tooltip>
                      </>
                    )}
                  />
                  {error && (
                    <p className="text-red-500 text-[0.825rem]">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px]">
              Countersigning Officer
            </h5>
            <Controller
              name="counter_officer"
              control={control}
              // rules={{ required: "Countersigning Officer is required" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    placeholder="Select Countersigning Officer"
                    showSearch
                    optionFilterProp="label"
                    status={error ? "error" : ""}
                    loading={counterOfficerLoading}
                    options={counterOfficerList?.map((user) => ({
                      value: user?.value, // Staff unique identifier
                      label: user?.label, // Staff name
                      disabled: user?.ON_LEAVE, // Disable if ON_LEAVE is true
                      // title: user?.ON_LEAVE ? "Staff on leave" : undefined, // Tooltip for disabled options
                      ...user, // Spread the rest of the user's properties
                    }))}
                    size="large"
                    className="w-full"
                    optionRender={(option) => (
                      <>
                        <>
                          <Tooltip
                            title={
                              option?.data?.ON_LEAVE ? (
                                <div className="flex flex-col items-start">
                                  <span className="mb-2">
                                    Staff on Leave, contact staff to return
                                  </span>
                                </div>
                              ) : undefined
                            }
                            placement="top"
                          >
                            <Space
                              className={cn(
                                "cursor-pointer w-full px-2 rounded-xl flex justify-between",
                                option?.data?.ON_LEAVE
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              )}
                            >
                              <div
                                className={cn(
                                  `flex gap-2 items-center px-2 py-1`
                                )}
                              >
                                {option?.data?.FILE_NAME ? (
                                  <Avatar
                                    alt={option?.data?.name}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={file_Prefix + option?.data?.FILE_NAME}
                                  />
                                ) : (
                                  <Avatar
                                    alt={option?.data?.name}
                                    className="flex-shrink-0"
                                    size="sm"
                                    name={option?.data?.label?.trim()[0]}
                                  />
                                )}

                                <div className="flex flex-col">
                                  <span className="font-medium uppercase font-helvetica">
                                    {option?.data?.label}
                                  </span>
                                  <p className="text-sm">
                                    {option?.data?.STAFF_NUMBER} -{" "}
                                    <small>
                                      Grade {option?.data?.GRADE_LEVEL}
                                    </small>
                                  </p>
                                </div>
                              </div>
                              {option?.data?.ON_LEAVE ? (
                                <div className="flex items-center gap-x-1">
                                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                  <p className="text-default-400 opacity-70 text-xs font-helvetica">
                                    ON LEAVE
                                  </p>
                                </div>
                              ) : null}
                            </Space>
                          </Tooltip>
                        </>
                      </>
                    )}
                  />
                  {error && (
                    <p className="text-red-500 text-[0.825rem]">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex justify-between gap-3">
            <Button
              size="sm"
              className="my-4 bg-[#00bcc2] text-white rounded"
              onClick={saveAsDraft}
              isLoading={isDraft && isPending}
              disabled={isPending}
            >
              Submit as draft
            </Button>
            <Button
              size="sm"
              color="success"
              className="my-4  text-white rounded"
              type="submit"
              isLoading={!isDraft && isPending}
              disabled={isPending}
            >
              Submit
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReportingOfficer;
ReportingOfficer.propTypes = {
  control: PropTypes.any,
  formState: PropTypes.any,
  saveAsDraft: PropTypes.func,
  isDraft: PropTypes.bool,
  isPending: PropTypes.bool,
  onNext: PropTypes.func,
};
