import clsx from "clsx";
import PropTypes from "prop-types";
import { formatNaira } from "../../../../utils/utitlities";
import { useCallback } from "react";
import moment from "moment";

const SalaryVariationAdvice = ({ componentRef, variationDetail }) => {
  const allowances = variationDetail?.data?.details;
  const variationSummary = variationDetail?.data?.summary;

  const getApproverDetail = useCallback(
    (approvalKeyToFind) => {
      const findApprover = variationDetail?.approvers?.find(
        (el) => el?.DESIGNATION === approvalKeyToFind
      );
      return findApprover;
    },
    [variationDetail?.approvers]
  );

  const initiatorDetail = getApproverDetail("INITIATOR");
  const hr1Detail = getApproverDetail("HR APPROVAL I");
  const hr2Detail = getApproverDetail("HR APPROVAL II");

  // eslint-disable-next-line react/prop-types
  const DownloadableView = ({ downloadable, viewRef }) => {
    return (
      <main className={clsx(downloadable ? "hidden" : "")}>
        <main
          className="flex flex-col bg-[#FFF] font-serif px-10 py-6 mb-3"
          ref={viewRef}
        >
          <div className="flex flex-col gap-2 items-center justify-between mb-4">
            <div className="flex">
              <img
                src="/assets/images/NCAA.png"
                className="w-[5.5rem] h-[5.5rem]"
                alt="NCAA Logo"
              />
            </div>
            <div className="text-black  flex items-center flex-col gap-0 justify-center">
              <div className="text-[1.5rem] font-extrabold font-Judson">
                NIGERIAN CIVIL AVIATION AUTHORITY
              </div>
              <div className="text-[1.1rem] font-[600] font-Judson">
                Corporate Headquarters, Abuja
              </div>

              <div className="font-semibold font-Judson text-[0.9rem]">
                DIRECTORATE OF HUMAN RESOURCES AND ADMINISTRATION
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div
              className={clsx(
                "font-bold border-b border-black pt-3 font-Judson text-center text-xs uppercase",
                downloadable ? "pb-2" : ""
              )}
            >
              {variationSummary?.variation_name} VARIATION ADVICE FOR STAFF
              TOTAL PERSONNEL EMOLUMENT
            </div>
          </div>

          <div className="mt-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y- col-span-3">
                <div className="flex items-baseline lg:min-w-1/2 md:min-w-3/4 w-full">
                  <h3 className="font-semibold text-[0.8rem] font-Judson">
                    NAME OF OFFICER
                  </h3>
                  <div
                    className={clsx(
                      "border-b-1 border-dashed border-black flex-1 ml-2 uppercase font-Judson font-semibold flex gap-4",
                      downloadable ? "pb-1" : ""
                    )}
                  >
                    {variationSummary?.first_name}{" "}
                    {" " + variationSummary?.last_name}
                    {" " + variationSummary?.other_names}
                    <p>{variationSummary?.STAFF_NUMBER}</p>
                  </div>
                </div>
                <div>
                  <div
                    className={clsx(
                      "inline-flex items-baseline w-auto min-w-[200px]"
                    )}
                  >
                    <h3 className="font-semibold font-Judson text-[0.8rem]">
                      DIRECTORATE
                    </h3>
                    <div
                      className={clsx(
                        "border-b-1 border-dashed border-black ml-2 min-w-72 font-Judson font-semibold",
                        downloadable ? "pb-1" : ""
                      )}
                    >
                      {variationSummary?.directorate_name}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={clsx("inline-flex items-baseline w-auto")}>
                    <h3 className="font-semibold font-Judson text-[0.8rem]">
                      CURR. DESIGNATION
                    </h3>
                    <div
                      className={clsx(
                        "border-b-1 border-dashed border-black ml-2 font-Judson font-semibold min-w-96",
                        downloadable ? "pb-1" : ""
                      )}
                    >
                      {variationSummary?.designation}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "inline-flex",
                      downloadable ? "items-center" : "items-baseline"
                    )}
                  >
                    <h3 className="font-semibold font-Judson text-[0.8rem]">
                      DEPARTMENT
                    </h3>
                    <div
                      className={clsx(
                        "border-b-1 border-dashed border-black ml-2 flex-1 font-semibold font-Judson min-w-96",
                        downloadable ? "pb-1" : ""
                      )}
                    >
                      {variationSummary?.department_name}
                    </div>
                  </div>

                  <div className={clsx("inline-flex items-baseline")}>
                    <h3 className="font-semibold font-Judson text-[0.8rem]">
                      NEW DESIGNATION
                    </h3>
                    <div
                      className={clsx(
                        "border-b-1 border-dashed border-black flex-1 ml-2 font-semibold font-Judson min-w-96",
                        downloadable ? "pb-1" : ""
                      )}
                    >
                      {variationSummary?.next_designation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <h3 className="font-semibold font-Judson text-[0.8rem]">
                CURRENT GRADE LEVEL/STEP{" "}
                <span className="font-extralight">
                  ={" "}
                  {(variationSummary?.current_grade &&
                    `Grade ${variationSummary?.current_grade}`) +
                    (variationSummary?.current_step &&
                      ` / Step ${variationSummary?.current_step}`)}
                </span>
              </h3>
              <h3 className="font-semibold font-Judson text-[0.8rem]">
                NEW GRADE LEVEL/ STEP
                <span className="font-extralight">
                  ={" "}
                  {(variationSummary?.new_grade &&
                    `Grade ${variationSummary?.new_grade}`) +
                    (variationSummary?.new_step &&
                      ` / Step ${variationSummary?.new_step}`)}
                </span>
              </h3>
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto border border-black">
            <table className="min-w-full divide-y-1 divide-black bg-white text-sm border-collapse text-left">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="text-xs px-2 font-semibold text-black border-r-1 border-black text-center min-w-52"></th>
                  <th className="text-xs px-2 py-2 font-semibold text-black border-r-1 border-black text-center font-serif">
                    Previous Annual Variation
                  </th>
                  <th className="text-xs px-2 py-2 font-semibold text-black border-r-1 border-black text-center font-serif">
                    Current Annual Variation
                  </th>
                  <th className="text-xs px-2 py-2 font-semibold text-black border-r-1 border-black text-center font-serif">
                    Annual Variation Difference
                  </th>
                  <th className="text-xs px-2 py-2 font-semibold text-black border-r-1 border-black text-center font-serif">
                    Commencement Date
                  </th>
                  <th className="text-xs px-2 py-2 font-semibold text-black border-r-1 border-black text-center font-serif">
                    Date of stoppage
                  </th>
                  <th className="text-xs px-2 py-2 font-semibold text-black border-black text-center font-serif">
                    Remarks
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y-1 divide-black">
                {allowances?.map((item, index) => {
                  const annualPrevious = Number(item?.past_payment * 12 || 0);
                  const annualNew = Number(item?.new_payment * 12 || 0);
                  const annualDifference = annualNew - annualPrevious;

                  return (
                    <tr key={index}>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "border-r"
                        )}
                      >
                        {item?.name}
                      </td>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "border-r-1"
                        )}
                      >
                        {formatNaira(Number(annualPrevious))}
                      </td>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "border-r-1"
                        )}
                      >
                        {formatNaira(Number(annualNew))}
                      </td>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "border-r-1"
                        )}
                      >
                        {formatNaira(Number(annualDifference))}
                      </td>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "border-r-1"
                        )}
                      >
                        {variationSummary?.commence_date}
                      </td>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "border-r-1 text-center"
                        )}
                      >
                        {""}
                      </td>
                      <td
                        className={clsx(
                          "px-2 py-1 text-black border-black font-semibold text-[0.69rem] font-serif",
                          "text-center"
                        )}
                      >
                        {variationSummary?.remark}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 text-[0.785rem] font-light">
            {/* Prepared By section */}
            {/* <div className="flex flex-wrap items-center mb-3 leading-5 font-Judson">
              <span className={"font-Judson"}>Prepared by:</span>
              <span
                className={clsx(
                  "border-b border-black border-dashed min-w-32 mx-1 font-semibold font-Judson",
                  downloadable && "py-1",
                  initiatorDetail?.APPROVERS?.FIRST_NAME ||
                    initiatorDetail?.APPROVERS?.FIRST_NAME
                    ? ""
                    : "pb-5"
                )}
              >
                {initiatorDetail?.APPROVERS?.FIRST_NAME}{" "}
                {initiatorDetail?.APPROVERS?.LAST_NAME}
              </span>
              <span className={"font-Judson"}>Designation:</span>
              <span
                className={clsx(
                  "border-b border-black border-dashed min-w-28 mx-1 font-semibold font-Judson",
                  downloadable && "py-1",
                  !initiatorDetail?.APPROVERS?.RANK && "pb-5"
                )}
              >
                {initiatorDetail?.APPROVERS?.RANK}
              </span>
              <span className={"font-Judson"}>Sign:</span>
              <span
                className={clsx(
                  "border-b border-black border-dashed min-w-20 mx-1 font-semibold font-Judson",
                  downloadable && "py-1",
                  !hr2Detail?.APPROVERS?.SIGNATURE_FILE && "pb-6"
                )}
              >
                {initiatorDetail?.APPROVERS?.SIGNATURE_FILE && (
                  <img
                    src={initiatorDetail?.APPROVERS?.SIGNATURE_FILE}
                    alt="signature"
                    height={80}
                    width={80}
                  />
                )}
              </span>
              <span className={"font-Judson"}>Date:</span>
              <span
                className={clsx(
                  "border-b border-black border-dashed min-w-24 mx-1 font-semibold font-Judson",
                  downloadable && "py-1",
                  !initiatorDetail?.TIME_TREATED && "pb-5"
                )}
              >
                {initiatorDetail?.TIME_TREATED &&
                  moment(initiatorDetail?.TIME_TREATED).format("DD/MM/YYYY")}
              </span>
              <span className={"font-Judson"}>Check and</span>
            </div> */}

            <div className="mb-3 leading-5 font-Judson">
              {/* First row: Prepared by and Designation */}
              <div className="flex flex-wrap items-end mb-2">
                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">Prepared by:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {initiatorDetail?.APPROVERS?.FIRST_NAME}{" "}
                      {initiatorDetail?.APPROVERS?.LAST_NAME}
                    </span>
                    <div className="border-b border-black border-dashed min-w-32 mt-1"></div>
                  </div>
                </div>

                <div className="flex items-end">
                  <span className="font-Judson mr-1">Designation:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {initiatorDetail?.APPROVERS?.RANK}
                    </span>
                    <div className="border-b border-black border-dashed min-w-40 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Second row: Sign and Date */}
              <div className="flex flex-wrap items-end mb-2">
                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">Sign:</span>
                  <div className="flex flex-col items-center">
                    <div className="h-8 flex items-end justify-center px-2">
                      {initiatorDetail?.APPROVERS?.SIGNATURE_FILE && (
                        <img
                          src={initiatorDetail?.APPROVERS?.SIGNATURE_FILE}
                          alt="signature"
                          className="max-h-6 w-auto object-contain"
                        />
                      )}
                    </div>
                    <div className="border-b border-black border-dashed min-w-24 mt-1"></div>
                  </div>
                </div>

                <div className="flex items-end">
                  <span className="font-Judson mr-1">Date:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {initiatorDetail?.TIME_TREATED &&
                        moment(initiatorDetail?.TIME_TREATED).format(
                          "DD/MM/YYYY"
                        )}
                    </span>
                    <div className="border-b border-black border-dashed min-w-28 mt-1"></div>
                  </div>
                </div>
                {/* Third row: Check and */}
                <div className="ml-2">
                  <span className="font-Judson">Check and</span>
                </div>
              </div>
            </div>

            {/* Found OK section */}

            <div className="mb-3 leading-5 font-Judson">
              {/* First row: Found OK by and Designation */}
              <div className="flex flex-wrap items-end mb-2">
                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">Found OK by:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {hr1Detail?.APPROVERS?.FIRST_NAME}{" "}
                      {hr1Detail?.APPROVERS?.LAST_NAME}
                    </span>
                    <div className="border-b border-black border-dashed min-w-32 mt-1"></div>
                  </div>
                </div>

                <div className="flex items-end">
                  <span className="font-Judson mr-1">Designation:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {hr1Detail?.APPROVERS?.RANK}
                    </span>
                    <div className="border-b border-black border-dashed min-w-40 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Second row: Sign and Date */}
              <div className="flex flex-wrap items-end mb-2">
                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">Sign:</span>
                  <div className="flex flex-col items-center">
                    <div className="h-8 flex items-end justify-center px-2">
                      {hr1Detail?.APPROVERS?.SIGNATURE_FILE && (
                        <img
                          src={hr1Detail?.APPROVERS?.SIGNATURE_FILE}
                          alt="signature"
                          className="max-h-6 w-auto object-contain"
                        />
                      )}
                    </div>
                    <div className="border-b border-black border-dashed min-w-24 mt-1"></div>
                  </div>
                </div>

                <div className="flex items-end">
                  <span className="font-Judson mr-1">Date:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {hr1Detail?.TIME_TREATED &&
                        moment(hr1Detail?.TIME_TREATED).format("DD/MM/YYYY")}
                    </span>
                    <div className="border-b border-black border-dashed min-w-28 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Third row: Three Copies note */}
              <div>
                <span className="font-Judson">
                  Three (3) Copies Audit, Accounts, P/F
                </span>
              </div>
            </div>

            {/* Approved By section */}
            <div className="mb-3 leading-5 font-Judson">
              {/* First row: APPROVED BY and Designation */}
              <div className="flex flex-wrap items-end mb-2">
                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">APPROVED BY:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {hr2Detail?.APPROVERS?.FIRST_NAME}{" "}
                      {hr2Detail?.APPROVERS?.LAST_NAME}
                    </span>
                    <div className="border-b border-black border-dashed min-w-32 mt-1"></div>
                  </div>
                </div>

                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">Designation:</span>
                  <div className="flex flex-col">
                    <span className="font-semibold font-Judson text-center px-2">
                      {hr2Detail?.APPROVERS?.RANK}
                    </span>
                    <div className="border-b border-black border-dashed min-w-40 mt-1"></div>
                  </div>
                </div>
                <div className="flex items-end mr-6">
                  <span className="font-Judson mr-1">Sign:</span>
                  <div className="flex flex-col items-center">
                    <div className="h-8 flex items-end justify-center px-2">
                      {hr2Detail?.APPROVERS?.SIGNATURE_FILE && (
                        <img
                          src={hr2Detail?.APPROVERS?.SIGNATURE_FILE}
                          alt="signature"
                          className="max-h-6 w-auto object-contain"
                        />
                      )}
                    </div>
                    <div className="border-b border-black border-dashed min-w-24 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Third row: For General Manager note */}
              <div>
                <span className="font-Judson">
                  For: General Manager (Human Resources)
                </span>
              </div>
            </div>
          </div>
        </main>
      </main>
    );
  };

  return (
    <>
      <DownloadableView downloadable={true} viewRef={componentRef} />
      <DownloadableView />
    </>
  );
};

export default SalaryVariationAdvice;

SalaryVariationAdvice.propTypes = {
  isLoading: PropTypes.bool,
  componentRef: PropTypes.any,
  variationDetail: PropTypes.any,
};
