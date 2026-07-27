/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, DatePicker, Input, Select } from "antd";
import PropTypes from "prop-types";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../../../utils/toastMsgPop";
import { formatNumberWithComma } from "../../../../../utils/utitlities";


const Staff13thMonthDetail = ({handleClose, staffOverviewDetailData}) => {
  const { userData } = useCurrentUser();

  const handleFinalSubmit = async () => {
      try {
        
        // const res = await suspendStaff(json);
        // successToast(res?.data?.message);
        // reset()
        // handleClose();
      } catch (error) {
        const errMsg = error?.response?.data?.message || error?.message;
        errorToast(errMsg);
      }
    }

  
    const totals = staffOverviewDetailData?.reduce((total, item) => {
      const newPayment = parseFloat(item.amount_to_pay || 0);
      return total + newPayment;
    }, 0);

    

  return (
    <>
      <div className="bg-white shadow-md p-5 rounded border flex justify-center flex-col gap-4">

        <div className="pb-2">
          <span className="font-bold text-xl font-Helvetica ">Staff 13th Month Payment Details</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden font-helvetica">
                    <h2 className="text-xl font-semibold text-gray-800 p-6 pb-4 border-b">
                      Breakdown
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                               Name
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-helvetica">
                              Amount(₦) to Pay
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 font-helvetica">
                          {staffOverviewDetailData?.map((item, index) => {
                            const newPayment = parseFloat(item.amount_to_pay || 0);
                            return (
                              <tr
                                key={index}
                                className={
                                  index % 2 === 0
                                    ? "bg-white font-helvetica"
                                    : "bg-gray-50 font-helvetica"
                                }
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900  font-helvetica">
                                  {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 font-helvetica">
                                  {formatNumberWithComma(newPayment)}
                                </td>
                              </tr>
                            );
                          })}
                          {/* Total row */}
                          <tr className="bg-gray-50 font-semibold font-helvetica">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-helvetica">
                              TOTAL
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-helvetica">
                              {formatNumberWithComma(totals)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>




         <div className=" justify-end py-5 hidden">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00bcc2",
            },
          }}
        >
          <Button
            type="primary"
            // htmlType="submit"
            // onClick={handleFinalSubmit}
            // loading={isSuspending}
          >
            Submit
          </Button>
        </ConfigProvider>
      </div>
      </div>
     
    </>
  );
};

export default Staff13thMonthDetail;

Staff13thMonthDetail.propTypes = {
    handleClose: PropTypes.func.isRequired,
    staffOverviewDetailData: PropTypes.array,
};
