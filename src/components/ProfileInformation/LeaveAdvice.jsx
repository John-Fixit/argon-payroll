/* eslint-disable react/display-name */

import { forwardRef } from "react";
import logo from "../../assets/images/ncaa_logo.png";
import PropTypes from "prop-types";
import dgSignature from "./dgm-hr-signature.png";
import { Chip } from "@nextui-org/react";
import { toStringDate } from "../../utils/utitlities";
// import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";

const signature = dgSignature;

// const signature =
// "data:image/png;base64,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";

const LeaveAdvice = forwardRef(({ request_detail }, ref) => {
  const today = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const currentDate = today.toLocaleDateString("en-GB", options);

  console.log(request_detail);

  const isAcademic = request_detail?.LEAVE_TYPE === "Academics";

  return (
    <div>
      <div className="">
        <div className="page-content bg-white page p-10" ref={ref}>
          <div className="wrapper">
            <div className="body">
              <p className="text-center">
                <br />
                <img
                  className="block ml-auto mr-auto"
                  width="120px"
                  src={logo}
                  alt=""
                />
              </p>

              <div className="text-center my-4 flex flex-col gap-2">
                <p>
                  <strong>NIGERIAN CIVIL AVIATION AUTHORITY</strong>
                </p>
                <p>
                  <strong>
                    <em>NNAMDI AZIKIWE INTERNATIONAL AIRPORT, ABUJA</em>
                  </strong>
                </p>
                <p>
                  <strong>
                    Ref. No:
                    {request_detail?.STAFF_NUMBER !== null
                      ? request_detail?.STAFF_NUMBER
                      : "N/A"}
                    &nbsp;
                  </strong>
                </p>
                <p>
                  <strong>{currentDate}</strong>
                </p>
              </div>

              <div className="leading-6 my-4">
                <p>
                  <strong>
                    {request_detail?.FIRST_NAME} {request_detail?.LAST_NAME}
                  </strong>
                </p>
                <p>{request_detail?.DESIGNATION}</p>
                <p>{request_detail?.DIRECTORATE}</p>
                <p>NIGERIAN CIVIL AVIATION AUTHORITY</p>
              </div>

              <p className="text-center my-2">
                <strong>LEAVE ADVICE</strong>
              </p>
              <p className="text-left">
                I am directed to advise you to proceed on your{" "}
                {request_detail?.LEAVE_NAME} Leave
                {!isAcademic ? (
                  <>for the year {request_detail?.CURRENT_YEAR}.</>
                ) : (
                  ". "
                )}
                Details of the approved leave are listed hereunder:
              </p>
              <div className=" my-2">
                {/* <pre>Commencement date: {handleFormatData(request_detail?.START_DATE)}</pre>
                    <pre>End Date: {handleFormatData(request_detail?.END_DATE)}</pre>
                    <pre>Resumption date: {handleFormatData(request_detail?.RESUMPTION_DATE)}</pre> */}
                {isAcademic ? (
                  <>
                    <p>Dates</p>
                    {request_detail?.SELECTED_DATES?.split(",").map((el, i) => (
                      <Chip
                        key={i}
                        color="primary"
                        className="m-1"
                        size="sm"
                        variant="flat"
                      >
                        {toStringDate(el) || ""}
                      </Chip>
                    ))}
                  </>
                ) : (
                  <>
                    <p>Commencement date: {request_detail?.START_DATE}</p>
                    <p>End Date: {request_detail?.END_DATE}</p>
                    <p>Resumption date: {request_detail?.RESUMPTION_DATE}</p>
                  </>
                )}
              </div>

              <ol className="leading-10">
                <li>
                  Please, ensure you complete the resumption of duty form via
                  the portal and forward to HR through your Head of Department
                </li>
                <li>
                  <strong>
                    Also, note that where the resumption of duty certificate is
                    not completed 30 days after the end date of leave, all
                    financial benefits will be suspended.
                  </strong>
                </li>
                <li>
                  On behalf of the Management, I wish you a pleasant vacation.
                </li>
              </ol>
              <div className="flex flex-col gap-4 mt-4">
                <img src={signature} width={150} />
                <p className="">
                  <strong className="font-semibold">
                    <em>Oluseyi Johnson</em>
                  </strong>
                  <br />
                  <strong className="font-semibold">
                    <em>DGM (Human Resources)</em>
                  </strong>
                  <br />
                  <strong className="font-semibold">
                    <em>For: Director, Human Resources & Administration</em>
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default LeaveAdvice;

LeaveAdvice.propTypes = {
  request_detail: PropTypes.object.isRequired,
};
